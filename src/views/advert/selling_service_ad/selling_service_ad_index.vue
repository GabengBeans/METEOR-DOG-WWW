<template>
    <div>
        <div class="button">
            <Button type="success" @click="showAdCreateModal = true">新增广告</Button>
        </div>
        <quality-table></quality-table>
        <quality-page :storeStatus="status" :currentPage="$store.state.app.selling_service_page_info.currentPage" :totalPage="$store.state.app.selling_service_page_info.totalPage"></quality-page>

        <Modal v-model="showAdCreateModal" width="600">
            <p slot="header" style="text-align:center">
                <span>新增广告</span>
            </p>
            <div>
                <Form :label-width="80" label-position="right">
                    <FormItem label="序号">
                        <Input clearable v-model="createObj.sort" style="width:60%;min-width:200px" />
                        <span style="color:blue;margin-left:15px">序号越小位置越靠前</span>
                    </FormItem>
                    <FormItem label="服务ID">
                        <Input clearable v-model="createObj.serviceId" style="width:60%;min-width:200px" />
                        <Button type="info" style="margin-left:15px" @click="getServiceDetail(createObj.adType,createObj.serviceId)">服务详情</Button>
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
import qualityTable from "./selling_service_ad_table.vue";
import qualityPage from "@/views/public-components/changePage";
import uploadSingleImg from "@/views/public-components/upload_single_img";
import util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import uplaodImg from "@/views/public-components/upload_img";
export default {
  data() {
    return {
      status: "sellingServiceAd",
      buttonName: "新增广告",
      showAdCreateModal: false,
      showServiceDetail: false,
      businessName: "",
      imgArray: [],
      createObj: {
        adType: "2",
        sort: "",
        serviceId: "",
        imgUrl: "",
        adName: "服务标题",
        adDescribe: ""
      }
    };
  },
  methods: {
    init() {
      this.createObj.sort = "";
      this.createObj.serviceId = "";
      this.createObj.imgUrl = "";
      this.createObj.adDescribe = "";
      this.businessName = "";
    },
    showCreate() {
      this.showAdCreateModal = true;
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
      if (
        !this.createObj.serviceId ||
        this.createObj.serviceId.indexOf(".") != "-1" ||
        !Number(this.createObj.serviceId)
      ) {
        this.$Message.error("请正确填写服务ID");
        return;
      }
      this.$Message.success({
        content: "请求中...",
        duration: 0
      });
      util
        .ajax({
          method: "get",
          url: baseUri.service_detail_url,
          params: {
            serviceId: this.createObj.serviceId
          }
        })
        .then(resp => {
          if (resp.data.success) {
            const obj = resp.data.data;
            this.businessName = obj.title;
            this.requestCreate();
          } else {
            this.$Message.destroy();
            this.$Message.error("没有这个ID");
            console.log(resp.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    requestCreate() {
      let params = {
        adItemId: 5,
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
            this.$store.commit("GET_SELLING_SERVICE_LIST", {
              data: this.$store.state.app.selling_service_search_info,
              pageNo: this.$store.state.app.selling_service_public_page
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
    },
    getServiceDetail(type, serviceId) {
      if (
        !this.createObj.serviceId ||
        this.createObj.serviceId.indexOf(".") != "-1" ||
        !Number(this.createObj.serviceId)
      ) {
        this.$Message.error("请正确填写服务ID");
        return;
      }
      util
        .ajax({
          method: "get",
          url: baseUri.service_detail_url,
          params: {
            serviceId: serviceId
          }
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
    }
  },

  components: {
    qualityTable,
    qualityPage,
    uploadSingleImg,
    uplaodImg
  },
  created() {
    this.$store.commit("GET_SELLING_SERVICE_LIST", {
      data: this.$store.state.app.selling_service_search_info,
      pageNo: this.$store.state.app.selling_service_public_page
    });
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>
