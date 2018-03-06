<template>
    <div>
        <br><br>
        <search :data="searchConfig" :storeStatus="status"  ></search>
        <br><br>
        <TableComponent :columns="columns" :data="$store.state.app.cash_flow_search_result"></TableComponent>
        <br>
        <Page :storeStatus="status" :currentPage="$store.state.app.cash_flow_page_info.currentPage" :totalPage="$store.state.app.cash_flow_page_info.totalPage"></Page>
    </div>
</template>
<script>
import config from '../config'
import search from '@/views/public-components/search'
import TableComponent from './cash_flow_table'
import Page from "@/views/public-components/changePage"
export default {
    data(){
        return {
            status:"cashFlow",
            searchConfig:config.cashFlow,
            columns : config.cashFlowTableColumns,
        }
    },
  components:{
      search,
      TableComponent,
      Page
  },
   created(){
      //console.log(this.$store.state.app.cash_flow_search_info)
      this.$store.commit("GET_CASH_FLOW_INFO",{data:this.$store.state.app.cash_flow_search_info,pageNo:1})
  }
}
</script>
<style>

</style>
