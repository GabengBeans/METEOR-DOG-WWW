<template>
    <div>
        <Search :data="searchConfig" :storeStatus="status"></Search>
        <SessionTable></SessionTable>
        <SessionPage :storeStatus="status" 
        :currentPage="$store.state.app.query_session_page_info.currentPage" 
        :totalPage="$store.state.app.query_session_page_info.totalPage"
        ></SessionPage>
    </div>
</template>
<script>
import config from "../config";
import Search from "@/views/public-components/search";
import SessionTable from "./query_session_record_table";
import SessionPage from "@/views/public-components/changePage"
export default {
  data() {
    return {
      status: "querySessionRecord",
      searchConfig: config.querySessionRecordSearch
    };
  },
  components: {
    Search,
    SessionTable,
    SessionPage
  },
  created() {
    this.$store.commit("GET_SEARCH_CHATLOG_FOR_PAGE", {
      data: this.$store.state.app.query_session_search_info,
      pageNo: this.$store.state.app.query_session_public_page
    });
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>
