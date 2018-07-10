<template>
  <div class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.model_ip_search_result">
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
          <FormItem label="序号">
            <Input clearable v-model="auditObj.sort" style="width:60%;min-width:200px" />
            <span style="color:blue;margin-left:15px">序号越小位置越靠前</span>
          </FormItem>
          <FormItem label="用户ID">
            <Input clearable v-model="auditObj.serviceId" style="width:60%;min-width:200px" />
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
      businessName: "",
      tempBusinessId: "",
      imgArray: [],
      auditObj: {
        id: "",
        adType: "1",
        sort: "",
        serviceId: "",
        imgUrl: "",
        adName: "IP昵称",
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
            this.$store.commit("GET_MODEL_IP_LIST", {
              data: this.$store.state.app.model_ip_search_info,
              pageNo: this.$store.state.app.model_ip_public_page
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
    saveAduitAd() {
      this.$Message.success({
        content: "请求中...",
        duration: 0
      });

      if (!this.auditObj.serviceId) {
        this.$Message.error("请填写用户ID");
        return;
      }
      if (!Number(this.auditObj.serviceId)) {
        this.$Message.error("请正确填写用户ID");
        return;
      }
      if (this.auditObj.serviceId != this.tempBusinessId) {
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
      }else{
        this.requestAudit();
      }
    },
    requestAudit() {
      let params = {
        adItemId: 4,
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
            this.$store.commit("GET_MODEL_IP_LIST", {
              data: this.$store.state.app.model_ip_search_info,
              pageNo: this.$store.state.app.model_ip_public_page
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

  components: {
    uplaodImg,
    uploadSingleImg
  },
  created() {}
};
</script>
