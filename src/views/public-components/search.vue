<template>
  <div id='user_search' class="search">
    <Row :gutter='16'>
      <Form label-position="right" :label-width="75">
        <Col :xs='13' :sm='13' :md='8' :lg='5' v-for="item in data" :key="item.key" v-if="!item.desc" style="height:57px;">
        <FormItem style="min-width:100px" :label="item.tagName">
          <Select v-model="item.value" v-if="item.tag" style="width:150px">
            <Option v-for="item in item.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
          </Select>
          <DatePicker v-else-if="item.data" v-model="item.value" type="date" placeholder="请选择日期"></DatePicker>
          <Input clearable v-model="item.value" v-else />
        </FormItem>
        </Col>
      </Form>
      <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click.native='search'>搜索</Button>
    </Row>
    <Row :gutter='16'>
      <Form label-position="right" :label-width="75">
        <Col :xs='13' :sm='13' :md='8' :lg='5' v-for="item in data" :key="item.key" v-if="item.desc">
        <FormItem style="min-width:100px" :label="item.tagName" >
          <Input clearable v-model="item.value" v-if="item.desc" style="width:67vw" />
        </FormItem>
        </Col>
      </Form>
    </Row>
  </div>
</template>
<script>
export default {
  name: "user_search",
  props: ["data", "storeStatus", "searchData"],
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
          this.$store.commit("GET_CASH_FLOW_INFO", { data: obj, pageNo: 1 });
          break;
        case "cashRefund":
          this.$store.commit("GET_CASH_REFUND_INFO", { data: obj, pageNo: 1 });
          break;
        case "cashWithDraw":
          this.$store.commit("GET_CASH_WITHDRAW_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "afterMerchantEnter":
          this.$store.commit("GET_MERCHANT_ENTER_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "advertNewBits":
          this.$store.commit("GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "afterFeedBackListSearch":
          this.$store.commit("GET_AFTER_FEEDBACK_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "statisticsTransactionSearch":
          this.$store.commit("GET_ORDER_STATISTICS_SEARCH_INFO", { time: obj });
          break;
        case "systemSettingSearch":
          this.$store.commit("GET_SYSTEM_SETTINGS_SEARCH_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "user":
          this.$store.commit("GET_USER_INFO", { data: obj, pageNo: 1 });
          break;
        case "request":
          this.$store.commit("GET_REQUEST_INFO", { data: obj, pageNo: 1 });
          break;
        case "service":
          this.$store.commit("GET_SERVICE_INFO", { data: obj, pageNo: 1 });
          break;
        case "orderService":
          this.$store.commit("GET_ORDER_SERVICE_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "orderDemand":
          this.$store.commit("GET_ORDER_DEMAND_INFO", { data: obj, pageNo: 1 });
          break;
        case "lockedUser":
          this.$store.commit("GET_SEARCH_ADIMIN_USER_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "lockedRole":
          this.$store.commit("GET_SEARCH_ADIMIN_ROLE_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "afterMerchantEnter":
          this.$store.commit("GET_MERCHANT_ENTER_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "afterMerchantEnterQuery":
          this.$store.commit("GET_BUSINESS_ENTER_FOR_PAGE_INFO", {
            data: obj,
            pageNo: 1
          });
          break;
        case "querySessionRecord":
          this.$store.commit("GET_SEARCH_CHATLOG_FOR_PAGE", {
            data: obj,
            pageNo: 1
          });
          break;
        case "ipCoupon":
          this.$store.commit("GET_IP_COUPON_QUERY_LIST", {
            data: obj,
            pageNo: 1
          });
          break;
        case "ipCouponDetail":
          let objs = Object.assign({ couponId: this.searchData }, obj);
          this.$store.commit("GET_IP_COUPON_DETAIL_QUERY_LIST", {
            data: objs,
            pageNo: 1
          });
          break;
        case "userAbility":
          this.$store.commit("GET_USER_ABILITY_LIST", {
            data: obj,
            pageNo: 1
          });
          break;
      }
    }
  }
};
</script>
<style>
@import "../../styles/public.less";
</style>
