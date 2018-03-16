<template>
  <div id='user_table'>
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="cashFlowTableColumns" :data="$store.state.app.cash_flow_search_result" >
    </Table>
  </div>

</template>
<script>
import expandRow from "./table_expand";
export default {
  name: "user_table",
  data() {
    return {
      cashFlowTableColumns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "ID",
          key: "id"
        },
        {
          title: "用户名",
          key: "fromUserName"
        },
        {
          title: "手机号",
          key: "phone"
        },
        // {
        //   title: "支付ID",
        //   key: "chargeId"
        // },
        {
          title: "支付状态",
          key: "chargeStatus"
        },
        {
          title: "服务ID",
          key: "serviceId"
        },
        {
          title: "订单编码",
          key: "orderId"
        },
        {
          title: "交易类型",
          key: "tradeType"
        },
        {
          title: "交易金额",
          key: "amount"
        },
        {
          title: "收入支出",
          key: "isIncoming"
        },
        {
          title: "支付方式",
          key: "paymentType"
        },
        {
          title: "支出方",
          key: "fromUserName"
        },
        {
          title: "接收方",
          key: "toUserName"
        },
        // {
        //     title: "系统订单号",
        //     key: "orderNo"
        // },
        // {
        //     title: "交易时间",
        //     key: "createTime"
        // },
        {
          title: "数据状态",
          key: "status"
        }
      ]
    };
  }
};
</script>
