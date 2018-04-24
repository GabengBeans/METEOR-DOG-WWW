<template>
  <div>
    <CouponSearch :data="searchConfig" :storeStatus="status"></CouponSearch>
    <CouponTable></CouponTable>
    <CouponPage
    :storeStatus="status" 
    :currentPage="$store.state.app.ip_coupon_query_page_info.currentPage" 
    :totalPage="$store.state.app.ip_coupon_query_page_info.totalPage"
    ></CouponPage>
  </div>
</template>
<script>
import config from "./config";
import CouponSearch from "@/views/public-components/search";
import CouponTable from "./ip_coupon_table";
import CouponPage from "@/views/public-components/changePage"
export default {
  data() {
    return {
      status: "ipCoupon",
      searchConfig: config.ipCouponSearch
    };
  },
  components: {
    CouponSearch,
    CouponTable,
    CouponPage
  },
  created() {
    this.$store.commit("GET_IP_COUPON_QUERY_LIST", {
      data: this.$store.state.app.ip_coupon_query_search_info,
      pageNo: this.$store.state.app.ip_coupon_query_public_page
    });
  }
};
</script>
<style>
@import "../../styles/public.less";
</style>
