<template>
  <div id='user_table'>
      <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.user_search_result">
      </Table>
  </div>

</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import Cookies from "js-cookie";
export default {
  name: "user_table",

  data() {
    return {
      columns: [
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "昵称",
          key: "nickname",
          ellipsis:"false"
        },
        {
          title: "真实姓名",
          key: "realname"
        },
        {
          title: "流星值",
          key: "meteorScore"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "余额",
          key: "amount"
        },
        {
          title: "代理人邀请码",
          key: "agentInviterCode"
        },
        {
          title: "操作",
          key: "phone",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //           this.$router.push("/user-role/"+params.row.id)
              //       //   this.a.state.public_search_id = params.row.id;
              //       //   router.push("/user_query/revise");
              //       }
              //     }
              //   },
              //   "修改"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: params.row.status == "禁用" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      Util.ajax({
                        method: "post",
                        url: baseUri.user_forbidden_user_url,
                        headers: {
                          token: Cookies.get("token"),
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          userId: params.row.id,
                          status: 0
                        },
                        timeout: 3000,
                        transformRequest: [
                          function(data) {
                            let ret = "";
                            for (let it in data) {
                              ret +=
                                encodeURIComponent(it) +
                                "=" +
                                encodeURIComponent(data[it]) +
                                "&";
                            }
                            return ret;
                          }
                        ]
                      })
                        .then(response => {
                          //console.log(params.row.status)
                          params.row.status = "禁用";
                          this.$Message.success("禁用成功");
                          //this.user_query_response = response
                        })
                        .catch(error => {
                          this.$Message.error("请求超时");
                        });
                    }
                  }
                },
                "禁用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: params.row.status == "正常" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      Util.ajax({
                        method: "post",
                        url: baseUri.user_forbidden_user_url,
                        headers: {
                          token: Cookies.get("token"),
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        timeout: 3000,
                        data: {
                          userId: params.row.id,
                          status: 1
                        },
                        transformRequest: [
                          function(data) {
                            let ret = "";
                            for (let it in data) {
                              ret +=
                                encodeURIComponent(it) +
                                "=" +
                                encodeURIComponent(data[it]) +
                                "&";
                            }
                            return ret;
                          }
                        ]
                      })
                        .then(response => {
                          params.row.status = "正常";
                          this.$Message.success("启用成功");
                        })
                        .catch(error => {
                          this.$Message.error("请求超时");
                        });
                    }
                  }
                },
                "启用"
              ),
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
                      this.$router.push("/user-edit/" + params.row.id);
                    }
                  }
                },
                "编辑"
              ),
              // ]
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/user-detail/" + params.row.id);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>
