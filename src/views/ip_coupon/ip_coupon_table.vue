<template>
  <div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.ip_coupon_query_search_result">
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
      showAbilityModal:true,
      columns: [
        {
          title: "红包名称",
          key: "tagName",
          ellipsis: "false"
        },
        {
          title: "创建时间",
          key: "createTime",
          width:150,
        },
        {
          title: "创建者昵称",
          key: "userNickName",
          ellipsis: "false"
        },
        {
          title: "手机号",
          key: "userPhone"
        },
        {
          title: "红包金额/元",
          key: "saleDecrease"
        },
        {
          title: "使用门槛/元",
          key: "saleEvery"
        },
        {
          title: "每人限领个数",
          key: "userLimit"
        },
        {
          title: "红包状态",
          key: "couponStatus"
        },
        {
          title: "红包个数",
          key: "total"
        },
        {
          title: "已领取个数",
          key: "aaa"
        },
        {
          title: "已使用个数",
          key: "bbb"
        },
        {
          title: "操作",
          key: "phone",
          width:220,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // let data = {
                      //   userId: params.row.id,
                      //   status: 0
                      // };
                      // Util.ajax({
                      //   method: "post",
                      //   url: baseUri.user_forbidden_user_url,
                      //   data: Util.formData(data)
                      // })
                      //   .then(response => {
                      //     //console.log(params.row.status)
                      //     params.row.status = "禁用";
                      //     this.$Message.success("禁用成功");
                      //     //this.user_query_response = response
                      //   })
                      //   .catch(error => {
                      //     this.$Message.error("请求超时");
                      //   });
                      this.$router.push("/ip_coupon_detail/"+params.row.tagId);
                    }
                  }
                },
                "领取和使用详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: params.row.status == "正常" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let data = {
                         userId: params.row.id,
                          status: 1
                      }
                      Util.ajax({
                        method: "post",
                        url: baseUri.user_forbidden_user_url,
                        timeout: 3000,
                        data: Util.formData(data)
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
                "强制结束"
              )
            ]);
          }
        }
      ]
    };
  },
  methods:{
    updataUserAbility(){

    }
  }
};
</script>
