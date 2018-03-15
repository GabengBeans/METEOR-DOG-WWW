<template>
    <div>
        <br><br>
        <search></search>
        <br><br>
        <OrderDemandTable></OrderDemandTable>
        <br>
        <OrderDemandChangePage></OrderDemandChangePage>
    </div>
</template>
<script>
import search from './order_demand_search.vue'
import OrderDemandTable from './order_demand_table.vue'
import OrderDemandChangePage from "./order_demand_change_page.vue"
export default {
  components:{
      search,
      OrderDemandTable,
      OrderDemandChangePage
  },
   created(){
       //console.log("初始化")
      this.$store.commit("GET_ORDER_DEMAND_INFO",{data:this.$store.state.app.order_demand_search_info,pageNo:this.$store.state.app.order_demand_public_page})
  }
}
</script>
<style>

</style>
