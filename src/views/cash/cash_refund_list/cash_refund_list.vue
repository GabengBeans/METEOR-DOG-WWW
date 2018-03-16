<template>
    <div>
        <br><br>
        <search :data="searchConfig" :storeStatus="status"></search>
        <br><br>
        <TableComponent :columns="columns" :data="$store.state.app.cash_refund_search_result"></TableComponent>
        <br>
        <Page :storeStatus="status" :currentPage="$store.state.app.cash_refund_page_info.currentPage" :totalPage="$store.state.app.cash_refund_page_info.totalPage"></Page>
    </div>
</template>
<script>
import config from "../config";
import search from "@/views/public-components/search";
import TableComponent from "@/views/public-components/table";
import Page from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "cashRefund",
      searchConfig: config.cashRefund,
      columns: config.cashRefundColumns
    };
  },
  components: {
    search,
    TableComponent,
    Page
  },
  created() {
    this.$store.commit("GET_CASH_REFUND_INFO", {
      data: this.$store.state.app.cash_refund_search_info,
      pageNo: this.$store.state.app.cash_refund_public_page
    });
  }
};
</script>
<style>

</style>
