<template>
  <div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.recommend_ip_search_result">
    </Table>
    <Modal v-model="showEditRecommendIp" width="800">
      <p slot="header" style="color:#f60;text-align:center">
        <span>编辑推荐IP</span>
      </p>
      <div>
        <Form label-position="right" :label-width="80">
          <FormItem label="服务ID">
            <p>{{serviceId}}</p>
          </FormItem>
          <FormItem label="序号">
            <Input clearable v-model="adSort" style="min-width:100px;width:200px" />
          </FormItem>
          <FormItem label="标题">
            <Input clearable v-model="serviceName" style="min-width:100px;width:200px" />
          </FormItem>
          <FormItem label="推广图片">
            <div>
              <uploadSingleImg :imgUrl="imgObj1" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj2" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj3" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj4" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj5" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj6" :upload="true" :change="true" :detail="true"></uploadSingleImg>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="success" @click="saveEditRecommendIp">保存</Button>
        <Button type="error" style="margin-left:3vw" @click="showEditRecommendIp=false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import uploadSingleImg from "@/views/public-components/upload_single_img";
export default {
  name: "user_table",

  data() {
    return {
      showEditRecommendIp: false,
      id:"",
      serviceId: "",
      adSort: "",
      serviceName: "",
      imgObj1: {
        imgUrl: ""
      },
      imgObj2: {
        imgUrl: ""
      },
      imgObj3: {
        imgUrl: ""
      },
      imgObj4: {
        imgUrl: ""
      },
      imgObj5: {
        imgUrl: ""
      },
      imgObj6: {
        imgUrl: ""
      },

      columns: [
        {
          title: "序号",
          key: "adSort",
          width: 160
        },
        {
          title: "服务ID",
          key: "serviceId"
        },
        {
          title: "标题",
          key: "name",
          ellipsis: "false"
        },
        {
          title: "状态",
          key: "display"
        },
        {
          title: "操作",
          key: "phone",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                      let data = {
                        id: params.row.id
                      };
                      util
                        .ajax({
                          method: "post",
                          url: base_uri.search_recommend_for_page_url,
                          params: {
                            pageNo: 1,
                            pageSize: 1
                          },
                          data: data
                        })
                        .then(res => {
                          if (res.data.success) {
                            this.showEditRecommendIp = true;
                            let obj = res.data.data.items[0];
                            this.serviceId = obj.serviceId;
                            this.id = obj.id
                            this.adSort = obj.adSort;
                            this.serviceName = obj.name;
                            this.imgObj1.imgUrl = obj.imgUrl1;
                            this.imgObj2.imgUrl = obj.imgUrl2;
                            this.imgObj3.imgUrl = obj.imgUrl3;
                            this.imgObj4.imgUrl = obj.imgUrl4;
                            this.imgObj5.imgUrl = obj.imgUrl5;
                            this.imgObj6.imgUrl = obj.imgUrl6;
                          } else {
                            this.$Message.error("信息获取失败");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  attrs: {
                    id: "recommend_ip_btn" + params.row._rowKey
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let oBtn = document.getElementById(
                        "recommend_ip_btn" + params.row._rowKey
                      );
                      let oSpan = oBtn.getElementsByTagName("span")[0];
                      let displayData = params.row.display == "已上线" ? 0 : 1;
                      util
                        .ajax({
                          method: "post",
                          url: base_uri.up_recommend_url,
                          data: {
                            id: params.row.id,
                            name: params.row.name,
                            display: displayData
                          }
                        })
                        .then(res => {
                          if (res.data.success) {
                            params.row.display =
                              params.row.display == "已上线"
                                ? "已下线"
                                : "已上线";
                            this.$Message.success(oSpan.innerHTML + "成功！");
                          } else {
                            this.$Message.error(oSpan, innerHTML + "失败");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }
                },
                params.row.display == "已上线" ? "下线" : "上线"
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
                      util
                        .ajax({
                          method: "post",
                          url: base_uri.up_recommend_url,
                          data: {
                            id: params.row.id,
                            name: params.row.name,
                            status: 0
                          }
                        })
                        .then(res => {
                          if (res.data.success) {
                            this.$store.commit("GET_RECOMMEND_FOR_PAGE_INFO", {
                              data: this.$store.state.app
                                .recommend_ip_search_info,
                              pageNo: this.$store.state.app
                                .recommend_ip_public_page
                            });
                            this.$Message.success("移除成功！");
                          } else {
                            this.$Message.error("移除失败");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
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
    saveEditRecommendIp() {
      // if (
      //   !this.imgObj1.imgUrl ||
      //   !this.imgObj2.imgUrl ||
      //   !this.imgObj3.imgUrl ||
      //   !this.imgObj4.imgUrl ||
      //   !this.imgObj5.imgUrl ||
      //   !this.imgObj6.imgUrl
      // ) {
      //   this.$Message.error("至少上传6张图片");
      //   return;
      // }
      this.$Message.loading({
        duration: 0,
        content: "保存中..."
      });
      util
        .ajax({
          method: "post",
          url: base_uri.up_recommend_url,
          data: {
            id:this.id,
            adSort: this.adSort,
            name: this.serviceName,
            imgUrl1: this.imgObj1.imgUrl,
            imgUrl2: this.imgObj2.imgUrl,
            imgUrl3: this.imgObj3.imgUrl,
            imgUrl4: this.imgObj4.imgUrl,
            imgUrl5: this.imgObj5.imgUrl,
            imgUrl6: this.imgObj6.imgUrl
          }
        })
        .then(res => {
          if (res.data.success) {
            this.showEditRecommendIp =false
            this.$Message.destroy();
            this.$Message.success("保存成功！");
          } else {
            this.$Message.destroy();
            this.$Message.error("保存失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    uploadSingleImg
  }
};
</script>
