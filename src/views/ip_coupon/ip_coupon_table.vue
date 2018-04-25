<template>
  <div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.ip_coupon_query_search_result">
    </Table>
    <Modal v-model="showCoercionModal" width="360">
      <p slot="header" style="color:red;text-align:center">
        <span>强制结束</span>
      </p>
      <div style="text-align:center;font-size:18px">
        <p>强制结束后该红包不能领取且无法恢复，已领取的红包可正常使用</p>

      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" @click="showCoercionModal=false">取消</Button>
        <Button type="success" @click="CoercionCoupon">确定</Button>
      </div>
    </Modal>
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
      showCoercionModal: false,
      CoercionCouponObj: "",
      columns: [
        {
          title: "红包名称",
          key: "title",
          ellipsis: "false",
          width: 150
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 150
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
          key: "receiveCount"
        },
        {
          title: "已使用个数",
          key: "useCount"
        },
        {
          title: "操作",
          key: "phone",
          width: 220,
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
                      this.$router.push("/ip_coupon_detail/" + params.row.id);
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
                    disabled:
                      params.row.couponStatus == "用户禁用" ||
                      params.row.couponStatus == "平台禁用" ||
                      params.row.couponStatus == "已结束" ||
                      params.row.couponStatus == "已过期" ||
                      params.row.couponStatus == "已删除"
                        ? true
                        : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showCoercionModal = true;
                      this.CoercionCouponObj = params.row;
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
  methods: {
    CoercionCoupon() {
      Util.ajax({
        method: "post",
        url: baseUri.update_coupon_status,
        params: {
          couponId: this.CoercionCouponObj.id,
          status: 0
        }
      })
        .then(res => {
          if (res.data.success && res.data.code == "100") {
            this.CoercionCouponObj.couponStatus="平台禁用"
            this.showCoercionModal = false
            this.$Message.success("强制结束成功");
          } else {
            this.$Message.error("强制结束失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
