<template>
    <div>
        <search :data="searchConfig" :storeStatus="status"></search>
        <requestTable></requestTable>
        <requestPage :storeStatus="status" :currentPage="$store.state.app.request_page_info.currentPage" :totalPage="$store.state.app.request_page_info.totalPage"></requestPage>
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
            status:"request",
            searchConfig:config.requestSearch
        }
    },
  components:{
      search,
      requestTable,
      requestPage
  },
   created(){
      this.$store.commit("GET_REQUEST_INFO",{data:this.$store.state.app.request_search_info,pageNo:this.$store.state.app.request_public_page})
  }
}
</script>
<style>
@import "../../styles/public.less";
</style>
