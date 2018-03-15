<template>
    <div>
        <br><br>
        <search></search>
        <br><br>
        <requestTable></requestTable>
        <br>
        <requestPage></requestPage>
    </div>
</template>
<script>
import search from './search.vue'
import requestTable from './table.vue'
import requestPage from "./request_change_page.vue"
export default {
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

</style>
