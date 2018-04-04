<template>
    <div>
        <search :data="searchConfig" :storeStatus="status"></search>
        <TableComponent :data="$store.state.app.merchant_enter_search_result"></TableComponent>
        <Page :storeStatus="status" :currentPage="$store.state.app.merchant_enter_page_info.currentPage" :totalPage="$store.state.app.merchant_enter_page_info.totalPage"></Page>
    </div>
</template>
<script>
import config from "./config";
import search from "@/views/public-components/search";
import TableComponent from "./after_merchant_enter_table";
import Page from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "afterMerchantEnter",
      searchConfig: config.afterMerchantEnter,
      //columns: config.afterMerchantEnterCloumns
    };
  },
  components: {
    search,
    TableComponent,
    Page
  },
  created() {
    this.$store.commit("GET_MERCHANT_ENTER_INFO", {
      data: this.$store.state.app.merchant_enter_search_info,
      pageNo: this.$store.state.app.merchant_enter_public_page
    });
  }
};
</script>
<style>

</style>
