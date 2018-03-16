<template>
    <div>
        <br><br>
        <search :data="searchConfig" :storeStatus="status"></search>
        <br><br>
        <OrderDemandTable></OrderDemandTable>
        <br>
        <OrderDemandChangePage :storeStatus="status" :currentPage="$store.state.app.order_demand_page_info.currentPage" :totalPage="$store.state.app.order_demand_page_info.totalPage"></OrderDemandChangePage>
    </div>
</template>
<script>
import config from "../config";
import search from "@/views/public-components/search";
import OrderDemandTable from "./order_demand_table.vue";
import OrderDemandChangePage from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "orderDemand",
      searchConfig: config.orderDemandSerach
    };
  },
  components: {
    search,
    OrderDemandTable,
    OrderDemandChangePage
  },
  created() {
    //console.log("初始化")
    this.$store.commit("GET_ORDER_DEMAND_INFO", {
      data: this.$store.state.app.order_demand_search_info,
      pageNo: this.$store.state.app.order_demand_public_page
    });
  }
};
</script>
<style>

</style>
