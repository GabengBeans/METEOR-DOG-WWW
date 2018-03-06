<template>
    <div>
        <br><br>
        <search :data="searchConfig"></search>
        <br><br>
        <TableComponent :columns="columns" :data="tableData"></TableComponent>
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
            searchConfig:config.cashRefund,
            columns : config.cashFlowTableColumns,
            tableData:[]
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
       //console.log("初始化")
      //this.$store.commit("GET_ORDER_DEMAND_INFO",{data:this.$store.state.app.order_demand_search_info,pageNo:1})
  }
}
</script>
<style>

</style>
