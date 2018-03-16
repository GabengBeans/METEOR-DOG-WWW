<template>
    <div>
        <br><br>
        <search :storeStatus="status" :data="searchConfig"></search>
        <br><br>
        <TableComponent :columns="columns" :data="$store.state.app.cash_withdraw_search_result"></TableComponent>
        <br>
        <Page :storeStatus="status" :currentPage="$store.state.app.cash_withdraw_page_info.currentPage" :totalPage="$store.state.app.cash_withdraw_page_info.totalPage"></Page>
    </div>
</template>
<script>
import config from "../config";
import search from "@/views/public-components/search";
import TableComponent from "./cash_withdraw_table";
import Page from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "cashWithDraw",
      searchConfig: config.cashWithDraw,
      columns: config.cashWithDrawTableColumns
    };
  },
  components: {
    search,
    TableComponent,
    Page
  },
  created() {
    this.$store.commit("GET_CASH_WITHDRAW_INFO", {
      data: this.$store.state.app.cash_withdraw_search_info,
      pageNo: this.$store.state.app.cash_withdraw_public_page
    });
  }
};
</script>
<style>

</style>
