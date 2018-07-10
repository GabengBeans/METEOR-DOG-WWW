<template>
    <div>
        <div class="button">
            <Button type="success" @click="showAdCreateModal = true">新增广告</Button>
        </div>
        <activities-table></activities-table>
        <activities-page :storeStatus="status" :currentPage="$store.state.app.activities_ad_page_info.currentPage" :totalPage="$store.state.app.activities_ad_page_info.totalPage"></activities-page>

        <Modal v-model="showAdCreateModal" width="600">
            <p slot="header" style="text-align:center">
                <span>新增广告</span>
            </p>
            <div>
                <Form :label-width="80" label-position="right">
                    <FormItem label="广告类型">
                        <Select style="width:200px" transfer v-model="createObj.adType">
                            <Option v-for="item in adTypeArr" :key="item.id" :value="item.id">{{item.advertTypeName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="序号">
                        <Input clearable v-model="createObj.sort" style="width:60%;min-width:200px" />
                        <span style="color:blue;margin-left:15px">序号越小位置越靠前</span>
                    </FormItem>
                    <FormItem v-if="createObj.adType!=5" :label="labelStr">
                        <Input clearable v-model="createObj.serviceId" style="width:60%;min-width:200px" />
                        <Button v-if="createObj.adType==2 || createObj.adType==3" type="info" style="margin-left:15px" @click="getServiceDetail(createObj.adType,createObj.serviceId)">{{createObj.adType==2?"服务详情":"需求详情"}}</Button>
                    </FormItem>
                    <FormItem label="展示图片">
                        <upload-single-img :imgUrl="createObj" :upload="true" :detial="true"></upload-single-img>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="display:flex;justify-content:space-around">
                <Button type="success" size="large" @click="saveCreateAd">保存</Button>
                <Button type="error" size="large" @click="showAdCreateModal = false">取消</Button>
            </div>
        </Modal>
        <Modal v-model="showServiceDetail" width="800" :mask-closable="false" :closable="false" style="z-index:999">
            <p slot="header" style="color:#f60;text-align:center">
                <span>详情</span>
            </p>
            <div>
                <Form label-position="right" :label-width="80">
                    <FormItem label="标题">
                        <span>{{businessName}}</span>
                    </FormItem>
                    <FormItem label="图片">
                        <div>
                            <uplaod-img v-if="imgArray.length>0" :imgList="imgArray" :detail="true"></uplaod-img>
                        </div>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" @click="closeDetail">关闭</Button>
            </div>
        </Modal>
    </div>

</template>
<script>
import activitiesTable from "./activities_ad_table.vue";
import activitiesPage from "@/views/public-components/changePage";
import uploadSingleImg from "@/views/public-components/upload_single_img";
import util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import uplaodImg from "@/views/public-components/upload_img";
export default {
  data() {
    return {
      status: "activitiesAd",
      buttonName: "新增广告",
      showAdCreateModal: false,
      showServiceDetail: false,
      businessName: "",
      imgArray: [],
      createObj: {
        adType: "",
        sort: "",
        serviceId: "",
        imgUrl: "",
        adName: "",
        adDescribe: ""
      },
      adTypeArr: []
    };
  },
  methods: {
    init() {
      this.createObj.adType = this.adTypeArr[0].id;
      this.createObj.sort = "";
      this.createObj.serviceId = "";
      this.createObj.imgUrl = "";
      this.createObj.adName = "";
      this.createObj.adDescribe = "";
      this.businessName = "";
    },
    showCreate() {
      this.showAdCreateModal = true;
    },
    getServiceDetail(type, serviceId) {
      if (!serviceId || !Number(serviceId) || serviceId.indexof('.')!='-1') {
        if (type == 2) {
          this.$Message.error("请正确填写服务ID");
        } else {
          this.$Message.error("请正确填写需求ID");
        }
        return;
      }
      let url =
        type == 2 ? baseUri.service_detail_url : baseUri.demand_detail_url;
      let params =
        type == 2 ? { serviceId: serviceId } : { demandId: serviceId };
      util
        .ajax({
          method: "get",
          url: url,
          params: params
        })
        .then(resp => {
          if (resp.data.success) {
            this.businessName = "";
            const obj = resp.data.data;
            this.businessName = obj.title;
            for (let i = 0; i < obj.mediaList.length; i++) {
              if (obj.mediaList[i].mediaType == 1) {
                this.imgArray.push(obj.mediaList[i].mediaUrl);
              }
            }
            this.showServiceDetail = true;
          } else {
            this.$Message.error("没有这个ID");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeDetail() {
      this.showServiceDetail = false;
      this.imgArray = [];
    },
    saveCreateAd() {
      if (!this.createObj.imgUrl) {
        this.$Message.error("请添加展示图片");
        return;
      }
      if (
        !this.createObj.sort ||
        this.createObj.sort.indexOf(".") != "-1" ||
        !Number(this.createObj.sort)
      ) {
        this.$Message.error("请填写正确的序号");
        return;
      }
      if (this.createObj.adType == 2 || this.createObj.adType == 3) {
        if (!this.createObj.serviceId ||!Number(this.createObj.serviceId) || this.createObj.serviceId.indexOf('.')!='-1'){
          if (this.createObj.adType == 2) {
            this.$Message.error("请填写正确的服务ID");
          } else {
            this.$Message.error("请填写正确的需求ID");
          }
          return;
        }
        this.$Message.success({
          content: "请求中...",
          duration: 0
        });
        if (!this.businessName) {
          //如果不存在
          let url =
            this.createObj.adType == 2
              ? baseUri.service_detail_url
              : baseUri.demand_detail_url;
          let params =
            this.createObj.adType == 2
              ? { serviceId: this.createObj.serviceId }
              : { demandId: this.createObj.serviceId };
          util
            .ajax({
              method: "get",
              url: url,
              params: params
            })
            .then(resp => {
              if (resp.data.success) {
                const obj = resp.data.data;
                this.businessName = obj.title;
                this.requestCreate();
              } else {
                this.$Message.destroy();
                this.$Message.error("没有这个ID");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.requestCreate();
        }
      } else if (this.createObj.adType == 1) {
        if (!!this.createObj.serviceId || this.createObj.serviceId.indexOf(".") != "-1" || !Number(this.createObj.serviceId)) {
          this.$Message.error("请正确填写用户ID");
          return;
        }
        util
          .ajax({
            method: "get",
            url: baseUri.user_detail_url,
            params: {
              userId: this.createObj.serviceId
            }
          })
          .then(resp => {
            if (resp.data.success) {
              this.businessName = resp.data.data.nickname;
              this.requestCreate();
            } else {
              this.$Message.destroy();
              this.$Message.error("用户不存在");
              console.log(resp.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.createObj.adType == 6) {
        this.businessName = this.createObj.serviceId;
        this.createObj.serviceId = "";
        this.requestCreate();
      } else if (this.createObj.adType == 5) {
        this.createObj.serviceId = "";
        this.businessName = "";
        this.requestCreate();
      } else {
        this.requestCreate();
      }
    },
    requestCreate() {
      let tempArr = [
        "",
        "IP昵称",
        "服务标题",
        "需求标题",
        "动态标题",
        "跳转到IP红包领取页面",
        "H5链接"
      ];
      this.createObj.adName = tempArr[this.createObj.adType];
      let params = {
        adItemId: 2,
        adTypeId: this.createObj.adType,
        imgUrl: this.createObj.imgUrl,
        adSort: this.createObj.sort,
        businessId: this.createObj.serviceId,
        adName: this.createObj.adName,
        adDescribe: this.businessName
      };
      util
        .ajax({
          method: "post",
          url: baseUri.add_advert_url,
          params: params
        })
        .then(resp => {
          if (resp.data.success) {
            this.$store.commit("GET_ACTIVITIES_AD_LIST", {
              data: this.$store.state.app.activities_ad_search_info,
              pageNo: this.$store.state.app.activities_ad_public_page
            });
            this.$Message.destroy();
            this.$Message.success("新增成功");
            this.init();
            this.showAdCreateModal = false;
          } else {
            this.$Message.destroy();
            this.$Message.error(resp.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    labelStr() {
      let strArr = [
        "",
        "用户ID",
        "服务ID",
        "需求ID",
        "动态ID",
        "红包ID",
        "H5地址链接"
      ];
      return strArr[this.createObj.adType];
    }
  },
  components: {
    activitiesTable,
    activitiesPage,
    uploadSingleImg,
    uplaodImg
  },
  created() {
    this.$store.commit("GET_ACTIVITIES_AD_LIST", {
      data: this.$store.state.app.activities_ad_search_info,
      pageNo: this.$store.state.app.activities_ad_public_page
    });
    util
      .ajax({
        method: "post",
        url: baseUri.query_advert_type_and_item_url
      })
      .then(resp => {
        if (resp.data.success) {
          this.adTypeArr = resp.data.data.advertTypeList;
          this.adTypeArr.map((item, index) => {
            if (item.id == 4) {
              this.adTypeArr.splice(index, 1);
            }
          });
          this.createObj.adType = this.adTypeArr[0].id;
        } else {
          this.$Message.error(resp.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>
//GET_ACTIVITIES_AD_LIST