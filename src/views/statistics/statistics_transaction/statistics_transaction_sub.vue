<template>
    <div class="infor_card">
        <Card>
            <div style="text-align:center;font-size:20px">
                总订单统计
                <div>
                    {{data.timeSlot}}
                </div>
            </div>
            <br>
            <Row>
                <Col :md="24" :lg="24">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <infor-card id-name="user_created_count" :end-val="data.totalOrderQuantity || 0" iconType="ios-copy" color="#2d8cf0" intro-text="总订单数量"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <infor-card id-name="visit_count" :end-val="data.totalTurnover ||0" iconType="social-yen" color="#64d572" :iconSize="50" intro-text="成交额"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <infor-card id-name="collection_count" :end-val="data.totalcustomerPrice||0" iconType="android-contact" color="#ffd572" intro-text="客单价"></infor-card>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Card>
        <br>
        <Card >
            <div style="text-align:center;font-size:20px">
                已完成订单统计
                <div>
                    {{data.timeSlot}}
                </div>
            </div>
            <br>
            <Row>
                <Col :md="24" :lg="24">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px',maringRight:'2vw'}">
                    <infor-card id-name="user_created_count1" :end-val="data.completedOrderQuantity || 0" iconType="ios-paper" color="#2d8cf0" intro-text="已完成订单数量"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <infor-card id-name="visit_count2" :end-val="data.completedTurnover ||0" iconType="social-yen" color="#64d572" :iconSize="50" intro-text="销售额"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <infor-card id-name="collection_count3" :end-val="data.completedCustomerPrice||0" iconType="android-contact" color="#ffd572" intro-text="客单价"></infor-card>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Card>
         <br>
        <Card >
            <div style="text-align:center;font-size:20px">
                退款订单统计
                <div>
                    {{data.timeSlot}}
                </div>
            </div>
            <br>
            <Row>
                <Col :md="24" :lg="24">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px',maringRight:'2vw'}">
                    <infor-card id-name="user_created_count4" :end-val="data.cancelOrderQuantity || 0" iconType="ios-paper-outline" color="#2d8cf0" intro-text="取消订单数量"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <infor-card id-name="visit_count5" :end-val="data.cancelTurnover ||0" iconType="social-yen" color="#64d572" :iconSize="50" intro-text="取消订单金额"></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                    <infor-card id-name="collection_count6" :end-val="data.cancelCustomerPrice||0" iconType="android-contact" color="#ffd572" intro-text="客单价"></infor-card>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import inforCard from "@/views/public-components/infor_card";
export default {
  name: "infor_card",
  computed: {
    data:function() {
      let obj = {
        timeSlot:this.$store.state.app.order_statistics_search_result.timeSlot,
        totalOrderQuantity:this.$store.state.app.order_statistics_search_result.totalOrderQuantity,
        totalTurnover:this.$store.state.app.order_statistics_search_result.totalTurnover/100,
        totalcustomerPrice:this.$store.state.app.order_statistics_search_result.totalcustomerPrice/100,
        completedOrderQuantity:this.$store.state.app.order_statistics_search_result.completedOrderQuantity,
        completedTurnover:this.$store.state.app.order_statistics_search_result.completedTurnover/100,
        completedCustomerPrice:this.$store.state.app.order_statistics_search_result.completedCustomerPrice/100,
        cancelOrderQuantity:this.$store.state.app.order_statistics_search_result.cancelOrderQuantity,
        cancelTurnover:this.$store.state.app.order_statistics_search_result.cancelTurnover/100,
        cancelCustomerPrice:this.$store.state.app.order_statistics_search_result.cancelCustomerPrice/100
      };
      return obj;
    }
  },
  components: {
    inforCard
  }
};
</script>

<style>

</style>
