<template>
    <div>
        <br><br>
        <search :data="data"></search>
        <br><br>
        <!-- <OrderDemandTable></OrderDemandTable>
        <br>
        <OrderDemandChangePage></OrderDemandChangePage> -->
    </div>
</template>
<script>
import config from '../config'
import search from '@/views/public-components/search'
// import OrderDemandTable from './order_demand_table.vue'
// import OrderDemandChangePage from "./order_demand_change_page.vue"
export default {
    data(){
        return {
            data:config.cashFlow
        }
    },
  components:{
      search,
    //   OrderDemandTable,
    //   OrderDemandChangePage
  },
   created(){
       console.log(config)
       //console.log("初始化")
      //this.$store.commit("GET_ORDER_DEMAND_INFO",{data:this.$store.state.app.order_demand_search_info,pageNo:1})
  }
}
</script>
<style>

</style>
