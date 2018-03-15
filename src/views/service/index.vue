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
       //console.log(this.$store.state.app.service_search_info)
      this.$store.commit("GET_SERVICE_INFO",{data:this.$store.state.app.service_search_info,pageNo:this.$store.state.app.service_public_page})
  }
}
</script>
<style>

</style>
