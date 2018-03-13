<template>
  <div id='user_table'>
      <Table style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.expand_charge_search_result">
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
          title: "订单号",
          key: "balanceOrderNo"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "代理人姓名",
          key: "extendUsername"
        },
        {
          title: "交易日期",
          key: "accountDay"
        },
        {
          title: "交易笔数",
          key: "tradeCount"
        },
        {
          title: "交易金额(元)",
          key: "tradeAmount"
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
          title: "结算佣金(元)",
          key: "balanceAmount"
        },
        {
          title: "结算状态",
          key: "balanceStatus"
        },
        {
          title: "结算时间",
          key: "balanceTime"
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
                        this.$router.push("/expand-charge-detail/"+params.row.id)
                    }
                  }
                },
                "查看"
              ),
               h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled:params.row.balanceStatus == "已结算" ? true : false                    
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      
                    }
                  }
                },
                "已结算"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled:params.row.balanceStatus == "待结算" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        
                    }
                  }
                },
                "未结算"
              ),
            ]);
          }
        }
      ]
    };
  }
};
</script>
