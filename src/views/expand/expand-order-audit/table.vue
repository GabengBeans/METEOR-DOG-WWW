<template>
  <div id='user_table'>
      <Table style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.brokerage_order_search_result">
      </Table>
  </div>
   
</template>

<script>
import Util from '@/libs/util'
import baseUri from '@/libs/base_uri'
import Cookies from "js-cookie"
export default {
  name: "user_table",

  data() {
    return {
      columns: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "代理人",
          key: "extendUsername"
        },
        {
          title: "交易日",
          key: "accountDay"
        },
        {
          title: "交易订单号",
          key: "orderNo"
        },
        {
          title: "服务者",
          key: "providerName"
        },
        {
          title: "平台服务费(元)",
          key: "platformServiceCharge"
        },
        {
          title: "佣金返点",
          key: "reate"
        },
        {
          title: "佣金(元)",
          key: "brokerage"
        },
        {
          title: "审核状态",
          key: "businessStatus"
        },
        {
          title: "审核时间",
          key: "auditTime"
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
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        this.$router.push("/expand-order-audit-detail/"+params.row.id)
                    }
                  }
                },
                "查看"
              ),
              
            ]);
          }
        }
      ]
    };
  }
};
</script>
