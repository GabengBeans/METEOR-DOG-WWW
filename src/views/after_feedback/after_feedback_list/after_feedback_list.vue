<template>
  <div>
    <br><br>
    <search :data="searchConfig" :storeStatus="status"></search>
    <br><br>
    <TableComponent :columns="columns" :data="$store.state.app.after_feedback_search_result"></TableComponent>
    <br>
    <Page :storeStatus="status" :currentPage="$store.state.app.after_feedback_page_info.currentPage" :totalPage="$store.state.app.after_feedback_page_info.totalPage"></Page>
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
      status: "afterFeedBackListSearch",
      searchConfig: config.afterFeedBackListSearch,
      columns: config.afterFeedBackListTableColumns
    };
  },
  components: {
    search,
    TableComponent,
    Page
  },
  created() {
    this.$store.commit("GET_AFTER_FEEDBACK_INFO", { data: {}, pageNo: this.$store.state.app.after_feedback_public_page });
  }
};
</script>
<style>

</style>
