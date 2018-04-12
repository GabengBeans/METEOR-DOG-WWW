<template>
    <div>
        <search :data="searchConfig" :storeStatus="status"></search>
        <TableComponent></TableComponent>
        <Page :storeStatus="status" :currentPage="$store.state.app.cash_refund_page_info.currentPage" :totalPage="$store.state.app.cash_refund_page_info.totalPage"></Page>
    </div>
</template>
<script>
import config from "../config";
import search from "@/views/public-components/search";
import TableComponent from "./cash_refund_table";
import Page from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "cashRefund",
      searchConfig: config.cashRefund
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
@import "../../../styles/public.less";
</style>
