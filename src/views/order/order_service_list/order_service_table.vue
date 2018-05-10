<template>
  <div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.order_service_search_result">
    </Table>
    <Modal v-model="shwoDrawBack" @on-ok="handleOk" @on-cancel="handleCancel">
      <div style="font-size:20px;text-align:center">
        <b>确认退款？</b>
      </div>
    </Modal>
  </div>

</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  name: "user_table",

  data() {
    return {
      orderId: Number,
      shwoDrawBack: false,
      columns: [
        {
          title: "订单号",
          key: "orderNo",
          width:160
        },
        {
          title: "服务标题",
          key: "title",
          ellipsis:"false"
        },
        {
          title: "服务者",
          key: "servant",
          ellipsis:"false"
        },
        {
          title: "服务价格",
          key: "rawPrice"
        },
        {
          title: "下单时间",
          key: "createTime",
          width:150
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
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/order-service-detail/" + params.row.id
                      );
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
                    disabled:
                      params.row.orderStatus == "申请退款" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/order-service-drawback/" + params.row.id
                      );
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
                    disabled:
                      params.row.orderStatus == "退款失败" ? false : true
                  },
                  on: {
                    click: () => {
                      this.shwoDrawBack = true;
                      this.orderId = params.row.id;
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
  methods: {
    handleOk() {
      let data = {
        orderId: this.orderId,
        orderStatus: 6
      };
      Util.ajax({
        method: "post",
        url: baseUri.order_audit_url,
        data: Util.formData(data)
      })
        .then(response => {
          //console.log(response);
          if (response.data.success) {
            this.$Message.success("退款成功");
            let obj = this.$store.state.app.order_service_search_result;
            for (let i = 0; i < obj.length; i++) {
              if (obj[i].id == this.orderId) {
                obj[i].orderStatus = "退款成功";
              }
            }
          } else {
            this.$Message.error("退款失败，请联系管理员");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.shwoDrawBack = false;
    }
  }
};
</script>
