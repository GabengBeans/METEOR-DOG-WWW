<template>
    <div>
        <gift-reconding-search :data="search" :storeStatus="mark"></gift-reconding-search>
        <gift-reconding-table></gift-reconding-table>
        <gift-reconding-change-page
        :storeStatus ="mark"
        :currentPage="$store.state.app.gift_recording_page_info.currentPage"
        :totalPage ="$store.state.app.gift_recording_page_info.totalPage"
        ></gift-reconding-change-page>
    </div>
</template>
<script>
import giftRecondingSearch from "@/views/public-components/search";
import giftRecondingTable from "./meteor_diamond_gift_recording_table.vue";
import giftRecondingChangePage from "@/views/public-components/changePage";
import config from "../config";
export default {
  data() {
    return {
      search: config.searchConfig,
      mark: "giftRecording"
    };
  },
  components: {
    giftRecondingSearch,
    giftRecondingTable,
    giftRecondingChangePage
  },
  created() {
    this.$store.commit("GET_GIFT_RECORDING_LIST", {
      data: this.$store.state.app.gift_recording_search_info,
      pageNo: this.$store.state.app.gift_recording_public_page
    });
  }
};
</script>
<style>
@import '../../../styles/public.less'
</style>
