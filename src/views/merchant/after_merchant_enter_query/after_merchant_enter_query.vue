<template>
  <div>
    <Search :data="search" :storeStatus="status"></Search>
    <MerchantTable></MerchantTable>
    <Page :storeStatus="status" 
    :currentPage="$store.state.app.merchant_bussiness_enter_page_info.currentPage" 
    :totalPage="$store.state.app.merchant_bussiness_enter_page_info.totalPage"></Page>
  </div>
</template>
<script>
import config from "../config";
import Search from "@/views/public-components/search";
import MerchantTable from "./after_merchant_enter_query_table";
import Page from "@/views/public-components/changePage"
export default {
  data() {
    return {
      status:"afterMerchantEnterQuery",
      search: config.afterMerchantEnterQuerySearch
    };
  },
  components: {
    Search,
    MerchantTable,
    Page
  },
  created() {
    this.$store.commit("GET_BUSINESS_ENTER_FOR_PAGE_INFO", {
      data: this.$store.state.app.merchant_bussiness_enter_search_info,
      pageNo: this.$store.state.app.merchant_bussiness_enter_public_page  
    });
  }
};
</script>
<style>

</style>
