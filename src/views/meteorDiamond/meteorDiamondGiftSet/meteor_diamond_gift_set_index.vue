<template>
    <div>
        <statistics-table></statistics-table>
        <statistics-change-page
        :storeStatus ="mark"
        :currentPage="$store.state.app.gift_set_page_info.currentPage"
        :totalPage ="$store.state.app.gift_set_page_info.totalPage"
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
      mark: "giftSet"
    };
  },
  components: {
    statisticsTable,
    statisticsChangePage
  },
  created() {
     this.$store.commit("GET_GIFT_SET_LIST", {
      pageNo: this.$store.state.app.gift_set_public_page
    });
  }
};
</script>
<style>
@import '../../../styles/public.less'
</style>
