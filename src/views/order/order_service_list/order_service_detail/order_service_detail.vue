<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee" v-if="show">
      <Card :bordered="false">
        <br>
        <div class="title-center">
          服务订单详情
        </div>
        <br><br>
        <div class="user_detail_div">
          <label class="from_label">订单编号:</label>
          <b>{{data.orderNo}}</b>

        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">服务者:</label>
          <b>{{data.servant}}</b>

        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">服务标题:</label>
          <b>{{data.title}}</b>

        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">下单者:</label>
          <b>{{data.userName}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">下单时间:</label>
          <b>{{data.updateTime}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">订单数量:</label>
          <b>{{data.quantity}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">订单金额:</label>
          <b>{{data.actualAmount}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">流星钻交易额:</label>
          <b>{{data.meteorDiamondAmount+'克拉'}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">支付明细:</label>
          <b>{{data.message}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">订单状态:</label>
          <b>{{data.orderStatus}}</b>
        </div>
        <br>

      </Card>
    </div>
  </div>
</template>
<script>
import Util from "@/libs/util";
//import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      data: {},
      show: false
    };
  },
  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    Util.ajax
      .get(baseUri.order_detail_url, {
        params: {
          orderId: this.$route.params.id
        }
      })
      .then(response => {
        if (response.data.success) {
          //console.log(response);
          let obj = response.data.data;
          let orderStatus = [
            "全部",
            "待支付",
            "待服务",
            "已完成",
            "已取消",
            "申请退款",
            "退款成功",
            "退款失败",
            "已过期",
            "已付款"
          ];
          for (let x in obj) {
            if (x == "updateTime") {
              this.data.updateTime = Util.formatDate(
                new Date(obj[x]),
                "yyyy-MM-dd hh:mm:ss"
              );
            } else if (x == "actualAmount") {
              this.data.actualAmount = parseInt(obj[x]) / 100 + "元";
            } else if (x == "orderStatus") {
              this.data.orderStatus = orderStatus[obj[x]];
            } else {
              this.data[x] = obj[x];
            }
          }
          this.show = true;
          this.$Message.destroy();
        } else {
          this.$Message.destroy()
          this.$Message.error("读取失败");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
@import "../../../../styles/public.less";
</style>
