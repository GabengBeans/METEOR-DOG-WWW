<template>
    <div>
        <statistics-table></statistics-table>
        <statistics-change-page
        :storeStatus ="mark"
        :currentPage="$store.state.app.statistics_page_info.currentPage"
        :totalPage ="$store.state.app.statistics_page_info.totalPage"
        ></statistics-change-page>
    </div>
</template>
<script>
import statisticsTable from "./meteor_diamond_gift_set_table.vue";
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
</style>
