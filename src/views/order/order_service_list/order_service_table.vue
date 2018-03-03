<template>
<div id='user_table'>
    <Table style="min-width:800px;margin:0 16px;" 
    border stripe :columns="columns" :data="$store.state.app.order_service_search_result">
    </Table>
</div>
   
</template>
<script>
export default {
  name: "user_table",

  data() {
    return {
      columns: [
        {
          title: "订单号",
          key: "orderNo"
        },
        {
          title: "服务标题",
          key: "title"
        },
        {
          title: "服务者",
          key: "servant"
        },
        {
          title: "服务价格",
          key: "rawPrice"
        },
        {
          title: "下单时间",
          key: "createTime"
        },
        {
          title: "状态",
          key: "orderStatus"
        },
        {
          title: "下单者",
          key: "userName"
        },
        {
          title: "手机号",
          key: "phone"
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
                        this.$router.push("/order-service-detail/"+params.row.id)
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
                    disabled:params.row.orderStatus =="申请退款"?false:true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/demand-review/"+params.row.id) 
                    }
                  }
                },
                "审核退款"
              ),
              // ]
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled:params.row.orderStatus =="退款失败"?false:true
                  },
                  on: {
                    click: () => {
                      this.$router.push("/demand-edit/"+params.row.id) 
                    }
                  }
                },
                "退款"
              )
            ]);
          }
        }
      ]
    };
  },
};
</script>
