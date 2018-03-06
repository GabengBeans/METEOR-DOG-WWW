<template>
    <div>
        <br><br>
        <search :data="searchConfig" :storeStatus="status"  ></search>
        <br><br>
        <TableComponent :columns="columns" :data="$store.state.app.cash_flow_search_result"></TableComponent>
        <!-- 
        <br>
        <OrderDemandChangePage></OrderDemandChangePage> -->
    </div>
</template>
<script>
import config from '../config'
import search from '@/views/public-components/search'
import TableComponent from '@/views/public-components/table'
// import OrderDemandChangePage from "./order_demand_change_page.vue"
export default {
    data(){
        return {
            status:"cashFlow",
            searchConfig:config.cashFlow,
            columns : config.cashFlowTableColumns,
            //tableData:$store.state.app.cash_flow_search_result
        }
    },
  components:{
      search,
      TableComponent
    //   OrderDemandTable,
    //   OrderDemandChangePage
  },
   created(){
      //console.log(config)
      console.log(this.$store._mutations.GET_CASH_FLOW_INFO)
      this.$store.commit("GET_CASH_FLOW_INFO",{data:this.$store.state.app.cash_flow_serch_info,pageNo:1})
  }
}
</script>
<style>

</style>
