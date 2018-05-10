<template>
  <div>
      <ipSearch></ipSearch>
      <ipTable></ipTable>
      <ipChangePage :storeStatus="status" :currentPage="$store.state.app.recommend_ip_page_info.currentPage" 
      :totalPage="$store.state.app.recommend_ip_page_info.totalPage"></ipChangePage>
  </div>
</template> 
<script>
import ipSearch from "./recommend_ip_set_search"
import ipTable from "./recommend_ip_set_table"
import ipChangePage from "@/views/public-components/changePage"
export default {
  data(){
    return {
      status:"recommendIpSetSearch"
    }
  },
  components:{
      ipSearch,
      ipTable,
      ipChangePage
  },
  created(){
    this.$store.commit("GET_RECOMMEND_FOR_PAGE_INFO",{
      data:this.$store.state.app.recommend_ip_search_info,
      pageNo:this.$store.state.app.recommend_ip_public_page
    })
  }
}
</script>
<style>
@import "../../../styles/public.less";
</style>
