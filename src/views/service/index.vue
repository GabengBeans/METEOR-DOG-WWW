<template>
    <div>
        <br><br>
        <search :data="searchConfig" :storeStatus="status"></search>
        <br><br>
        <requestTable></requestTable>
        <br>
        <requestPage :storeStatus="status" :currentPage="$store.state.app.service_page_info.currentPage" :totalPage="$store.state.app.service_page_info.totalPage"></requestPage>
    </div>
</template>
<script>
import config from "./config"
import search from '@/views/public-components/search'
import requestTable from './table.vue'
import requestPage from "@/views/public-components/changePage"
export default {
    data(){
        return {
            status:"service",
            searchConfig:config.serviceSearch
        }
    },
  components:{
      search,
      requestTable,
      requestPage
  },
   created(){
       //console.log(this.$store.state.app.service_search_info)
      this.$store.commit("GET_SERVICE_INFO",{data:this.$store.state.app.service_search_info,pageNo:this.$store.state.app.service_public_page})
  }
}
</script>
<style>

</style>
