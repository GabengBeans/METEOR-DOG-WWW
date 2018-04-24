<template>
  <div id='page' class="pager">
    <Page style='float:right;  margin-right:10px' :current="currentPage" :total="totalPage" show-elevator @on-change='switch_page'>
    </Page>
  </div>
</template>
<script>
export default {
  name: "page",
  props: ["storeStatus", "currentPage", "totalPage"],
  methods: {
    switch_page: function(index) {
      //console.log(this.storeStatus);
      switch (this.storeStatus) {
        case "cashFlow":
          //console.log(index)
          this.$store.commit("GET_CASH_FLOW_INFO", {
            data: this.$store.state.app.cash_flow_search_info,
            pageNo: index
          });
          break;
        case "cashRefund":
          //console.log(index)
          this.$store.commit("GET_CASH_REFUND_INFO", {
            data: this.$store.state.app.cash_refund_search_info,
            pageNo: index
          });
          break;
        case "cashWithDraw":
          //console.log(index)
          this.$store.commit("GET_CASH_WITHDRAW_INFO", {
            data: this.$store.state.app.cash_withdraw_search_info,
            pageNo: index
          });
          break;
        case "afterMerchantEnter":
          //console.log(index)
          this.$store.commit("GET_MERCHANT_ENTER_INFO", {
            data: this.$store.state.app.merchant_enter_search_info,
            pageNo: index
          });
          break;
        case "advertNewList":
          //console.log(index)
          this.$store.commit("GET_ADVERT_NEW_INFO", {
            data: this.$store.state.app.advert_new_search_info,
            pageNo: index
          });
          break;
        case "advertNewBits":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO", {
            data: this.$store.state.app.advert_position_search_info,
            pageNo: index
          });
          break;
        case "afterFeedBackListSearch":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_AFTER_FEEDBACK_INFO", {
            data: this.$store.state.app.after_feedback_search_info,
            pageNo: index
          });
          break;
        case "systemSettingSearch":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_SYSTEM_SETTINGS_SEARCH_INFO", {
            data: this.$store.state.app.system_settings_search_info,
            pageNo: index
          });
          break;
        case "appList":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_APP_SEARCH_INFO", { pageNo: index });
          break;
        case "user":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_USER_INFO", {
            data: this.$store.state.app.user_search_info,
            pageNo: index
          });
          break;
        case "request":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_REQUEST_INFO", {
            data: this.$store.state.app.request_search_info,
            pageNo: index
          });
          break;
        case "service":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_SERVICE_INFO", {
            data: this.$store.state.app.service_search_info,
            pageNo: index
          });
          break;
        case "orderService":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_ORDER_SERVICE_INFO", {
            data: this.$store.state.app.order_service_search_info,
            pageNo: index
          });
          break;
        case "orderDemand":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_ORDER_DEMAND_INFO", {
            data: this.$store.state.app.order_demand_search_info,
            pageNo: index
          });
          break;
        case "lockedUser":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_SEARCH_ADIMIN_USER_INFO", {
            data: this.$store.state.app.admin_user_search_info,
            pageNo: index
          });
          break;
        case "lockedRole":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_SEARCH_ADIMIN_ROLE_INFO", {
            data: this.$store.state.app.admin_role_search_info,
            pageNo: index
          });
          break;
        case "audit_operation":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_AUDIT_OPERATION_INFO", {
            data: this.$store.state.app.audit_operation_search_info,
            pageNo: index
          });
          break;
        case "afterMerchantEnterQuery":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_BUSINESS_ENTER_FOR_PAGE_INFO", {
            data: this.$store.state.app.merchant_bussiness_enter_search_info,
            pageNo: index
          });
          break;
        case "querySessionRecord":
          //this.$store.state.app.merchant_enter_search_info = obj
          this.$store.commit("GET_SEARCH_CHATLOG_FOR_PAGE", {
            data: this.$store.state.app.query_session_search_info,
            pageNo: index
          });
          break;
        case "ipCoupon":
          this.$store.commit("GET_IP_COUPON_QUERY_LIST", {
            data: this.$store.state.app.ip_coupon_query_search_info,
            pageNo: index
          });
          break;
      }
    }
  }
};
</script>