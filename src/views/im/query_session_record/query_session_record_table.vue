<template>
    <div class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="this.$store.state.app.query_session_search_result">
        </Table>
        <Modal v-model="showSession" width="600">
            <p slot="header" style="color:#f60;text-align:center">
                <span>会话记录</span>
            </p>
            <div style="font-size:14px;height:60vh;overflow-y:auto">
                <div v-for="item in sessionDetail" :key="item.id">
                    <div v-if="item.fromUser==user" style="margin-bottom:10px">
                        <template v-if="item.msgType=='txt'">
                            <div>
                                <span>{{item.fromUsernickname || "未获取到"}}</span>
                                <span style="margin-left:5px">{{item.sendTime}}</span>
                            </div>
                            <div style="width:450px;">
                                <div style="display:inline-block;
                        padding:4px;
                        border-radius:5px;
                        background:#D1E9E9
                        ">
                                    <p style="color:black;">{{item.msgBody}}</p>
                                </div>
                            </div>
                        </template>
                        <!-- <template v-else>
                            <div>
                                <span>{{item.fromUsernickname || "未获取到"}}</span>
                                <span style="margin-left:5px">{{item.sendTime}}</span>
                            </div>
                            <div style="display:inline-block;
                        padding:4px;
                        border-radius:5px;
                        background:#D1E9E9
                        ">
                                    <p style="color:black;">暂不支持图片</p>
                                </div>
                        </template> -->
                    </div>
                    <div v-else style="margin-bottom:10px">
                        <template v-if="item.msgType=='txt'">
                            <div style="display:flex;justify-content:flex-end;">
                                <span>{{item.fromUsernickname}}</span>
                                <span style="margin-left:5px">{{item.sendTime}}</span>
                            </div>
                            <div style="display:flex;justify-content:flex-end;">
                                <div style="display:flex;justify-content:flex-end;width:450px;">
                                    <div style="display:inline-block;
                        padding:4px;
                        border-radius:5px;
                        background:#CCFF80;
                        ">
                                        <p style="color:black;">{{item.msgBody}}</p>
                                    </div>

                                </div>
                            </div>
                        </template>
                        <!-- <template v-else>
                            <div style="display:flex;justify-content:flex-end;">
                                <span>{{item.fromUsernickname}}</span>
                                <span style="margin-left:5px">{{item.sendTime}}</span>
                            </div>
                            <div style="display:flex;justify-content:flex-end;">
                                <div style="display:flex;justify-content:flex-end;width:450px;">
                                    <div style="display:inline-block;
                        padding:4px;
                        border-radius:5px;
                        background:#CCFF80;
                        ">
                                        <p style="color:black;">暂不支持图片</p>
                                    </div>
                                </div>
                            </div>
                        </template> -->
                    </div>
                </div>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
import Util from "@/libs/util";
import base_uri from "@/libs/base_uri";
export default {
  data() {
    return {
      sessionDetail: [],
      user: "",
      showSession: false,
      columns: [
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "用户手机号",
          key: "fromUser"
        },
        {
          title: "用户昵称",
          key: "fromUsernickname"
        },
        {
          title: "会话人手机号",
          key: "toUser"
        },
        {
          title: "会话人昵称",
          key: "toUsernickname"
        },
        {
          title: "会话日期",
          key: "sendTime"
        },
        {
          title: "操作",
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
                  on: {
                    click: () => {
                      this.showSession = true;
                      Util.ajax({
                        method: "get",
                        url: base_uri.query_session_detail,
                        params: {
                          chatLogId: params.row.id
                        }
                      }).then(res => {
                        if (res.data.success) {
                          this.sessionDetail = res.data.data;
                          this.user = res.data.data[0].fromUser;
                        }
                      });
                    }
                  }
                },
                "查看会话记录"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>
<style>
.call {
}
</style>

