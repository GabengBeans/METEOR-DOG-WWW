<template>
  <div class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.banner_ad_search_result">
    </Table>
    <Modal v-model="showDeleteModal" width="500" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span></span>
      </p>
      <div style="text-align:center;font-size:20px">
        确认移除?
      </div>
      <div slot="footer" style="display:flex;justify-content:space-around">
        <Button type="error" @click="showDeleteModal = false">取消</Button>
        <Button type="success" @click="deleteAd">确认</Button>
      </div>
    </Modal>

    <Modal v-model="showAdAuditModal" width="600">
      <p slot="header" style="text-align:center">
        <span>修改广告</span>
      </p>
      <div>
        <Form :label-width="80" label-position="right">
          <FormItem label="广告类型">
            <Select style="width:200px" transfer v-model="auditObj.adType">
              <Option v-for="item in adTypeArr" :key="item.id" :value="item.id">{{item.advertTypeName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="序号">
            <Input clearable v-model="auditObj.sort" style="width:60%;min-width:200px" />
            <span style="color:blue;margin-left:15px">序号越小位置越靠前</span>
          </FormItem>
          <FormItem v-if="auditObj.adType!=5" :label="labelStr">
            <Input clearable v-model="auditObj.serviceId" style="width:60%;min-width:200px" />
            <Button v-if="auditObj.adType==2 || auditObj.adType==3" type="info" style="margin-left:15px" @click="getServiceDetail(auditObj.adType,auditObj.serviceId)">{{auditObj.adType==2?"服务详情":"需求详情"}}</Button>
          </FormItem>
          <FormItem label="展示图片">
            <upload-single-img :imgUrl="auditObj" :upload="true" :detial="true"></upload-single-img>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="display:flex;justify-content:space-around">
        <Button type="success" size="large" @click="saveAduitAd">保存</Button>
        <Button type="error" size="large" @click="showAdAuditModal = false">取消</Button>
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
import util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import uplaodImg from "@/views/public-components/upload_img";
import uploadSingleImg from "@/views/public-components/upload_single_img";
export default {
  data() {
    return {
      showDeleteModal: false,
      deleteAdId: "",
      aliyun: baseUri.oss_url,
      showAdAuditModal: false,
      showServiceDetail: false,
      businessName: "",
      tempBusinessId: "",
      imgArray: [],
      auditObj: {
        id: "",
        adType: "",
        sort: "",
        serviceId: "",
        imgUrl: "",
        adName: "",
        adDescribe: ""
      },
      adTypeArr: [],
      columns: [
        {
          title: "序号",
          key: "adSort",
          width: 100,
          align: "center"
        },
        {
          title: "类型",
          key: "MyAdTypeId",
          width: 100,
          align: "center"
        },
        {
          title: "详细",
          render: (h, params) => {
            return h("div", [
              h("p", params.row.adName),
              h("br"),
              h("p", { style: { fontWeight: "800" } }, params.row.adDescribe)
            ]);
          }
        },
        {
          title: "展示图片",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  padding: "10px",
                  fontSize: 0
                }
              },
              [
                h("img", {
                  attrs: {
                    src: this.aliyun + params.row.imgUrl
                  },
                  style: {
                    width: "100%",
                    height: "120px"
                  },
                  on: {
                    click: () => {}
                  }
                })
              ]
            );
          }
        },
        {
          title: "状态",
          key: "MyUseStatus",
          width: 100
        },
        {
          title: "操作",
          key: "phone",
          align: "center",
          render: (h, params) => {
            return h("div", {}, [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.auditObj.id = params.row.id;
                      this.auditObj.adType = params.row.adTypeId;
                      this.auditObj.sort = params.row.adSort;
                      this.auditObj.serviceId = params.row.businessId;
                      this.tempBusinessId = params.row.businessId;
                      this.auditObj.imgUrl = params.row.imgUrl;
                      this.showAdAuditModal = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: params.row.MyUseStatus == "上线" ? "error" : "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let parmasObj = {
                        advertInfoId: params.row.id,
                        useStatus: params.row.MyUseStatus == "上线" ? 2 : 1
                      };
                      util
                        .ajax({
                          method: "get",
                          url: baseUri.advert_online_downline_url,
                          params: parmasObj
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$Message.success("操作成功");
                            params.row.MyUseStatus =
                              parmasObj.useStatus == 1 ? "上线" : "下线";
                          } else {
                            this.$Message.error("操作失败");
                          }
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
                  }
                },
                params.row.MyUseStatus == "上线" ? "下线" : "上线"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteAdId = params.row.id;
                      this.showDeleteModal = true;
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    deleteAd() {
      let paramsObj = {
        advertInfoId: this.deleteAdId
      };
      util
        .ajax({
          method: "post",
          url: baseUri.delete_advert_url,
          params: paramsObj
        })
        .then(resp => {
          if (resp.data.success) {
            this.$store.commit("GET_BANNER_AD_LIST", {
              data: this.$store.state.app.banner_ad_search_info,
              pageNo: this.$store.state.app.banner_ad_public_page
            });
            this.showDeleteModal = false;
            this.$Message.success("移除成功");
          } else {
            this.$Message.error("移除失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getServiceDetail(type, serviceId) {
      if (!serviceId) {
        this.$Message.error("请填写服务ID");
        return;
      }
      if (!Number(serviceId)) {
        this.$Message.error("请正确填写服务ID");
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
    saveAduitAd() {
      this.$Message.success({
        content: "请求中...",
        duration: 0
      });
      if (this.auditObj.adType == 2 || this.auditObj.adType == 3) {
        if (!this.auditObj.serviceId) {
          this.$Message.error("请填写服务ID");
          return;
        }
        if (!Number(this.auditObj.serviceId)) {
          this.$Message.error("请正确填写服务ID");
          return;
        }
        if (
          !this.businessName ||
          this.auditObj.serviceId != this.tempBusinessId
        ) {
          //如果不存在
          let url =
            this.auditObj.adType == 2
              ? baseUri.service_detail_url
              : baseUri.demand_detail_url;
          let params =
            this.auditObj.adType == 2
              ? { serviceId: this.auditObj.serviceId }
              : { demandId: this.auditObj.serviceId };
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
                this.requestAudit();
              } else {
                 this.$Message.destroy()
                this.$Message.error("没有这个ID");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.requestAudit();
        }
      } else if (this.auditObj.adType == 1) {
        util
          .ajax({
            method: "get",
            url: baseUri.user_detail_url,
            params: {
              userId: this.auditObj.serviceId
            }
          })
          .then(resp => {
            if (resp.data.success) {
              this.businessName = resp.data.data.nickname;
              this.requestAudit();
            } else {
               this.$Message.destroy()
              this.$Message.error("用户不存在")
              console.log(resp.data.msg)
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.auditObj.adType == 6) {
        this.businessName = this.auditObj.serviceId;
        this.auditObj.serviceId = "";
        this.requestAudit();
      } else if (this.auditObj.adType == 5) {
        this.auditObj.serviceId = "";
        this.businessName = "";
        this.requestAudit();
      } else {
        this.requestAudit();
      }
    },
    requestAudit() {
      let tempArr = [
        "",
        "IP昵称",
        "服务标题",
        "需求标题",
        "动态标题",
        "跳转到IP红包领取页面",
        "H5链接"
      ];
      this.auditObj.adName = tempArr[this.auditObj.adType];
      let params = {
        adItemId: 1,
        id: this.auditObj.id,
        adTypeId: this.auditObj.adType,
        imgUrl: this.auditObj.imgUrl,
        adSort: this.auditObj.sort,
        businessId: this.auditObj.serviceId,
        adName: this.auditObj.adName,
        adDescribe: this.businessName
      };
      util
        .ajax({
          method: "post",
          url: baseUri.edit_advert_url,
          params: params
        })
        .then(resp => {
          if (resp.data.success) {
            this.$store.commit("GET_BANNER_AD_LIST", {
              data: this.$store.state.app.banner_ad_search_info,
              pageNo: this.$store.state.app.banner_ad_public_page
            });
            this.$Message.destroy();
            this.$Message.success("编辑成功");
            this.showAdAuditModal = false;
          } else {
            this.$Message.destroy();
            this.$Message.error(resp.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, //
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
      return strArr[this.auditObj.adType];
    }
  },
  components: {
    uplaodImg,
    uploadSingleImg
  },
  created() {
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
