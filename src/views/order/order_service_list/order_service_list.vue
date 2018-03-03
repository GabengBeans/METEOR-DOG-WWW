<template>
    <div>
        <br><br>
        <search></search>
        <br><br>
        <OrderServiceTable></OrderServiceTable>
        <br>
        <OrderServiceChangePage></OrderServiceChangePage>
    </div>
</template>
<script>
import search from './order_service_search.vue'
import OrderServiceTable from './order_service_table.vue'
import OrderServiceChangePage from "./order_service_change_page.vue"
export default {
  components:{
      search,
      OrderServiceTable,
      OrderServiceChangePage
  },
   created(){
      this.$store.commit("GET_ORDER_SERVICE_INFO",{data:this.$store.state.app.order_service_search_info,pageNo:1})
  }
}
</script>
<style>

</style>
