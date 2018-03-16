<template>
    <div>
        <br><br>
        <search :data="searchConfig" :storeStatus="status"></search>
        <br><br>
        <OrderServiceTable></OrderServiceTable>
        <br>
        <OrderServiceChangePage :storeStatus="status" :currentPage="$store.state.app.order_service_page_info.currentPage" :totalPage="$store.state.app.order_service_page_info.totalPage"></OrderServiceChangePage>
    </div>
</template>
<script>
import config from "../config"
import search from "@/views/public-components/search";
import OrderServiceTable from "./order_service_table.vue";
import OrderServiceChangePage from "@/views/public-components/changePage";
export default {
  data(){
    return {
      status:"orderService",
      searchConfig:config.orderServiceSerach
    }
  },
  components: {
    search,
    OrderServiceTable,
    OrderServiceChangePage
  },
  created() {
    //console.log(config)
    this.$store.commit("GET_ORDER_SERVICE_INFO", {
      data: this.$store.state.app.order_service_search_info,
      pageNo: this.$store.state.app.order_service_public_page
    });
  }
};
</script>
<style>

</style>
