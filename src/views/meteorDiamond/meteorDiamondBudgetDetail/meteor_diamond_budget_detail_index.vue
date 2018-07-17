<template>
    <div>
        <budget-detail-search :data="search" :storeStatus="mark"></budget-detail-search>
        <budget-detail-table
        :columns="columns"
        :data="$store.state.app.budget_detail_search_result"
        ></budget-detail-table>
        <budget-deatil-change-page
        :storeStatus ="mark"
        :currentPage="$store.state.app.budget_detail_page_info.currentPage"
        :totalPage ="$store.state.app.budget_detail_page_info.totalPage"
        ></budget-deatil-change-page>
    </div>
</template>
<script>
import budgetDetailSearch from "@/views/public-components/search";
import budgetDetailTable from "@/views/public-components/table";
import budgetDeatilChangePage from "@/views/public-components/changePage";
import config from "../config";
export default {
  data() {
    return {
        search:config.budgetDetailSearch,
        mark:"budgetDetail",
        columns:config.budgetDetailTableColumns

    };
  },
  components: {
    budgetDetailSearch,
    budgetDetailTable,
    budgetDeatilChangePage
  },
  created() {
    this.$store.commit("GET_BUDGET_DETAIL_LIST", {
      data: {userId:this.$route.query.userId},
      pageNo: this.$store.state.app.budget_detail_public_page
    });
  }
};
</script>
<style>
</style>
