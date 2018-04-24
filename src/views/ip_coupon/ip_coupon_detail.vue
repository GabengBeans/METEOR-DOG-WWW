<template>
  <div>
    <CouponDetailSearch :data="searchConfig" :storeStatus="status"></CouponDetailSearch>
    <CouponDetailTable :columns="columns"></CouponDetailTable>
    <CouponDetailPage
    :storeStatus="status" 
    :currentPage="$store.state.app.ip_coupon_query_page_info.currentPage" 
    :totalPage="$store.state.app.ip_coupon_query_page_info.totalPage"
    ></CouponDetailPage>
  </div>
</template>
<script>
import config from "./config";
import CouponDetailSearch from "@/views/public-components/search";
import CouponDetailTable from "@/views/public-components/table";
import CouponDetailPage from "@/views/public-components/changePage"
export default {
  data() {
    return {
      status: "ipCouponDetail",
      searchConfig: config.ipCouponDetailSearch,
      columns:config.ipCouponDetailColumns
    };
  },
  components: {
    CouponDetailSearch,
    CouponDetailTable,
    CouponDetailPage
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
