<template>
    <div>
        <statistics-search :data="search" :storeStatus="mark"></statistics-search>
        <statistics-table></statistics-table>
        <statistics-change-page
        :storeStatus ="mark"
        :currentPage="$store.state.app.statistics_page_info.currentPage"
        :totalPage ="$store.state.app.statistics_page_info.totalPage"
        ></statistics-change-page>
    </div>
</template>
<script>
import statisticsSearch from "@/views/public-components/search";
import statisticsTable from "./meteor_diamond_statistics_table.vue";
import statisticsChangePage from "@/views/public-components/changePage";
import config from "../config";
export default {
  data() {
    return {
      search: config.statisticsSearch,
      mark: "statistics"
    };
  },
  components: {
    statisticsSearch,
    statisticsTable,
    statisticsChangePage
  },
  created() {
    this.$store.commit("GET_STATISTICS_LIST", {
      data: this.$store.state.app.statistics_search_info,
      pageNo: this.$store.state.app.statistics_public_page
    });
  }
};
</script>
<style>
@import '../../../styles/public.less'
</style>
