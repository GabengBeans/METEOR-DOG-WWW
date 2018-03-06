<template>
    <div>
        <br><br>
        <search :data="searchConfig" :storeStatus="status"></search>
        <br><br>
        <TableComponent :columns="columns" :data="$store.state.app.merchant_enter_search_result"></TableComponent>
        <br>
        <Page :storeStatus="status" :currentPage="$store.state.app.merchant_enter_page_info.currentPage" :totalPage="$store.state.app.merchant_enter_page_info.totalPage"></Page>
    </div>
</template>
<script>
import config from "./config";
import search from "@/views/public-components/search";
import TableComponent from "@/views/public-components/table";
import Page from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "afterMerchantEnter",
      searchConfig: config.afterMerchantEnter,
      columns: config.afterMerchantEnterCloumns
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
      pageNo: 1
    });
  }
};
</script>
<style>

</style>
