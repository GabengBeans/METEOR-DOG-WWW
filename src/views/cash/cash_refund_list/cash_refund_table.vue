<template>
    <div class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.cash_refund_search_result">
        </Table>
        <!-- <Modal v-model="showRefund" width="360">
            <p slot="header" style="color:#f60;text-align:center">
            </p>
            <div style="text-align:center;font-size:16px">
                <b>确认退还保障金？</b>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="success" size="large" @click="handleOk">确定</Button>
            </div>
        </Modal> -->
    </div>
</template>
<script>
import Util from "@/libs/util"
import base_uri from "@/libs/base_uri"
export default {
  data() {
    return {
    //   accountId: "",
    //   showRefund: false,
      columns: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "ping++chargeId",
          key: "chargeId"
        },
        {
          title: "用户名",
          key: "nickname"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "保障金",
          key: "bondAmount"
        },
        {
          title: "操作时间",
          key: "createTime"
        },
        {
          title: "申请状态",
          key: "bondStatus"
        },
        // {
        //   title: "操作",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small",
        //             disabled: params.row.bondStatus == "申请中" ? false : true
        //           },
        //           on: {
        //             click: () => {
        //               this.accountId = params.row.id;
        //               this.showRefund = true;
        //             }
        //           }
        //         },
        //         "审核退款"
        //       )
        //     ]);
        //   }
        // }
      ]
    };
  },
  methods: {
    // handleOk() {
    //   Util.ajax({
    //     method: "post",
    //     url: base_uri.query_session_detail,
    //     params: {
    //       chatLogId: this.accountId,
    //       bondStatus:
    //     }
    //   })
    //     .then(res => {
    //       if (res.data.success) {
    //         this.$store.commit("GET_CASH_REFUND_INFO", {
    //           data: this.$store.state.app.cash_refund_search_info,
    //           pageNo: this.$store.state.app.cash_refund_public_page
    //         });
    //         this.$Message.success("审核成功！");
    //       } else {
    //         this.$Message.error("审核失败！");
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    }
};
</script>

