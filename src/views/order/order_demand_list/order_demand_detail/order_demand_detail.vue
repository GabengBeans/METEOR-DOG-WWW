<template>
    <div v-if="show">
        <div id="user_edit" style="background:#eee" v-if="show">
            <Card :bordered="false" style="height:85vh;overflow:auto;">
                <br>
                <div style="color:blue;font-size:22px;text-align:center">
                    需求订单详情
                </div>
                <br><br>
                <div class="user_detail_div">
                    <label class="from_label">订单编号:</label>
                    <b>{{data.orderNo}}</b>

                </div>
                <br>
                <div class="user_detail_div">
                    <label class="from_label">需求者:</label>
                    <b>{{data.userName}}</b>

                </div>
                <br>
                <div class="user_detail_div">
                    <label class="from_label">需求标题:</label>
                    <b>{{data.title}}</b>

                </div>
                <br>
                <div class="user_detail_div">
                    <label class="from_label">下单者:</label>
                    <b>{{data.servant}}</b>
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
    Util.ajax({
      method: "get",
      url: baseUri.order_detail_url,
      params: {
        orderId: this.$route.params.id
      }
    }).then(response => {
      if (response.data.success) {
        console.log(response);
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
      }else{
          this.$Message.error("读取失败")
      }
    }).catch((error)=>{
        console.log(error)
    })
  }
};
</script>
<style>
.user_detail_div {
  border-bottom: 1px solid rgb(219, 207, 207);
}
.from_label {
  margin-left: 3vw;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  display: inline-block;
  min-width: 75px;
  min-height: 16px;
}
</style>
