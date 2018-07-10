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
      switch (this.storeStatus) {
        case "cashFlow":
          this.$store.commit("GET_CASH_FLOW_INFO", {
            data: this.$store.state.app.cash_flow_search_info,
            pageNo: index
          });
          break;
        case "cashRefund":
          this.$store.commit("GET_CASH_REFUND_INFO", {
            data: this.$store.state.app.cash_refund_search_info,
            pageNo: index
          });
          break;
        case "cashWithDraw":
          this.$store.commit("GET_CASH_WITHDRAW_INFO", {
            data: this.$store.state.app.cash_withdraw_search_info,
            pageNo: index
          });
          break;
        case "afterMerchantEnter":
          this.$store.commit("GET_MERCHANT_ENTER_INFO", {
            data: this.$store.state.app.merchant_enter_search_info,
            pageNo: index
          });
          break;
        case "advertNewList":
          this.$store.commit("GET_ADVERT_NEW_INFO", {
            data: this.$store.state.app.advert_new_search_info,
            pageNo: index
          });
          break;
        case "advertNewBits":
          this.$store.commit("GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO", {
            data: this.$store.state.app.advert_position_search_info,
            pageNo: index
          });
          break;
        case "afterFeedBackListSearch":
          this.$store.commit("GET_AFTER_FEEDBACK_INFO", {
            data: this.$store.state.app.after_feedback_search_info,
            pageNo: index
          });
          break;
        case "systemSettingSearch":
          this.$store.commit("GET_SYSTEM_SETTINGS_SEARCH_INFO", {
            data: this.$store.state.app.system_settings_search_info,
            pageNo: index
          });
          break;
        case "appList":
          this.$store.commit("GET_APP_SEARCH_INFO", { pageNo: index });
          break;
        case "user":
          this.$store.commit("GET_USER_INFO", {
            data: this.$store.state.app.user_search_info,
            pageNo: index
          });
          break;
        case "request":
          this.$store.commit("GET_REQUEST_INFO", {
            data: this.$store.state.app.request_search_info,
            pageNo: index
          });
          break;
        case "service":
          this.$store.commit("GET_SERVICE_INFO", {
            data: this.$store.state.app.service_search_info,
            pageNo: index
          });
          break;
        case "orderService":
          this.$store.commit("GET_ORDER_SERVICE_INFO", {
            data: this.$store.state.app.order_service_search_info,
            pageNo: index
          });
          break;
        case "orderDemand":
          this.$store.commit("GET_ORDER_DEMAND_INFO", {
            data: this.$store.state.app.order_demand_search_info,
            pageNo: index
          });
          break;
        case "lockedUser":
          this.$store.commit("GET_SEARCH_ADIMIN_USER_INFO", {
            data: this.$store.state.app.admin_user_search_info,
            pageNo: index
          });
          break;
        case "lockedRole":
          this.$store.commit("GET_SEARCH_ADIMIN_ROLE_INFO", {
            data: this.$store.state.app.admin_role_search_info,
            pageNo: index
          });
          break;
        case "audit_operation":
          this.$store.commit("GET_AUDIT_OPERATION_INFO", {
            data: this.$store.state.app.audit_operation_search_info,
            pageNo: index
          });
          break;
        case "afterMerchantEnterQuery":
          this.$store.commit("GET_BUSINESS_ENTER_FOR_PAGE_INFO", {
            data: this.$store.state.app.merchant_bussiness_enter_search_info,
            pageNo: index
          });
          break;
        case "querySessionRecord":
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
        case "ipCouponDetail":
          this.$store.commit("GET_IP_COUPON_DETAIL_QUERY_LIST", {
            data: this.$store.state.app.ip_coupon_detail_query_search_info,
            pageNo: index
          });
          break;
        case "userAbility":
          this.$store.commit("GET_USER_ABILITY_LIST", {
            data: this.$store.state.app.user_ability_search_info,
            pageNo: index
          });
          break;
        case "recommendIpSetSearch":
          this.$store.commit("GET_RECOMMEND_FOR_PAGE_INFO", {
            data: this.$store.state.app.recommend_ip_search_info,
            pageNo: index
          });
          break;
        case "audit_user":
          this.$store.commit("GET_AUDIT_ALL_INFO", {
            data: this.$store.state.app.audit_user_search_info,
            pageNo: index,
            name: "user"
          });
          break;
        case "audit_service":
          this.$store.commit("GET_AUDIT_ALL_INFO", {
            data: this.$store.state.app.audit_service_search_info,
            pageNo: index,
            name: "service"
          });
          break;
        case "audit_demand":
          this.$store.commit("GET_AUDIT_ALL_INFO", {
            data: this.$store.state.app.audit_demand_search_info,
            pageNo: index,
            name: "demand"
          });
          break;
        case "audit_order":
          this.$store.commit("GET_AUDIT_ALL_INFO", {
            data: this.$store.state.app.audit_order_search_info,
            pageNo: index,
            name: "order"
          });
          break;
        case "dynamic":
          this.$store.commit("GET_DYNAMIC_LIST",{
            data:this.$store.state.app.dynamic_search_info,
            pageNo:index
          })
          break;

        case "bannerAd":
          this.$store.commit("GET_BANNER_AD_LIST",{
            data:this.$store.state.app.banner_ad_search_info,
            pageNo:index
          })
          break;

        case "bannerAd":
          this.$store.commit("GET_ACTIVITIES_AD_LIST",{
            data:this.$store.state.app.activities_ad_search_info,
            pageNo:index
          })
          break;

        case "qualityAd":
          this.$store.commit("GET_QUALITY_IP_LIST",{
            data:this.$store.state.app.quality_ip_search_info,
            pageNo:index
          })
          break;

        case "modelAd":
          this.$store.commit("GET_MODEL_IP_LIST",{
            data:this.$store.state.app.model_ip_search_info,
            pageNo:index
          })
          break;
      }
    }
  }
};
</script>
