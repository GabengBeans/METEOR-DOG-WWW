<template>
  <div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.user_search_result">
    </Table>
    <!-- <Modal v-model="showAbilityModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <span>权限</span>
        </p>
        <div style="text-align:center;height:20vh">
            <CheckboxGroup v-model="disabledGroup">
                <Checkbox label="IP红包创建权限"></Checkbox>
            </CheckboxGroup>
        </div>
        <div slot="footer" style="text-align:center">
          <Button type="success" @click="updataUserAbility" >保存</Button>
            <Button type="error" @click="showAbilityModal=false" >取消</Button>
        </div>
    </Modal> -->
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
          title: "用户ID",
          key: "id",
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "昵称",
          key: "nickname",
          ellipsis: "false"
        },
        {
          title: "真实姓名",
          key: "realname",
          ellipsis: "false"
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
          title: "注册时间",
          key: "createTime",
          width:150
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
                    type: "error",
                    size: "small",
                    disabled: params.row.status == "禁用" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let data = {
                        userId: params.row.id,
                        status: 0
                      };
                      Util.ajax({
                        method: "post",
                        url: baseUri.user_forbidden_user_url,
                        data: Util.formData(data)
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
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/user-detail/" + params.row.id);
                    }
                  }
                },
                "详情"
              ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "success",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
                      
              //       }
              //     }
              //   },
              //   "权限"
              // )
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
