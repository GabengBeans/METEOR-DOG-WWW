<template>
  <div id='user_search'>
    <Row :gutter='16'>
      <Form label-position="right" :label-width="60">
        <Col :xs='13' :sm='13' :md='8' :lg='5' v-for="item in data" :key="item.key">
        <FormItem style="min-width:100px" :label="item.tagName">
          <Select v-model="item.value" v-if="item.tag">
            <Option v-for="item in item.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
          </Select>
          <DatePicker v-else-if="item.data" v-model="item.value" type="date" placeholder="请选择日期"></DatePicker>
          <Input clearable v-model="item.value" v-else />
        </FormItem>
        </Col>
      </Form>
      <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click.native='search'>搜索</Button>
    </Row>
  </div>
</template>
<script>
export default {
  name: "user_search",
  props: ["data", "storeStatus"],
  methods: {
    search: function() {
      let obj = {};
      for (let x in this.data) {
        if (this.data[x].value != "") {
          obj[x] = this.data[x].value;
        }
      }
      //console.log(obj)
      switch (this.storeStatus) {
        case "cashFlow":
          //this.$store.state.app.cash_flow_search_info = obj
          this.$store.commit("GET_CASH_FLOW_INFO", { data: obj, pageNo: 1 });
          break;
        case "cashRefund":
          //console.log(obj)
          //this.$store.state.app.cash_refund_search_info = obj
          this.$store.commit("GET_CASH_REFUND_INFO", { data: obj, pageNo: 1 });
          break;
        case "cashWithDraw":
          //this.$store.state.app.cash_withdraw_search_info = obj
          this.$store.commit("GET_CASH_WITHDRAW_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "afterMerchantEnter":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_MERCHANT_ENTER_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "advertNewBits":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "afterFeedBackListSearch":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_AFTER_FEEDBACK_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "statisticsTransactionSearch":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_ORDER_STATISTICS_SEARCH_INFO", { time: obj });
          break;
        case "systemSettingSearch":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_SYSTEM_SETTINGS_SEARCH_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "user":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_USER_INFO", { data: obj, pageNo: 1 });
          break;
        case "request":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_REQUEST_INFO", { data: obj, pageNo: 1 });
          break;
        case "service":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_SERVICE_INFO", { data: obj, pageNo: 1 });
          break;
        case "orderService":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_ORDER_SERVICE_INFO", { data: obj, pageNo: 1 });
          break;
        case "orderDemand":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_ORDER_DEMAND_INFO", { data: obj, pageNo: 1 });
          break;
      }
    }
  }
};
</script>
<style>

</style>
