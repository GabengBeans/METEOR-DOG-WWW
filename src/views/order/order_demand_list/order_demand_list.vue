<template>
    <div>
        <br><br>
        <search></search>
        <br><br>
        <!-- <requestTable></requestTable>
        <br>
        <requestPage></requestPage> -->
    </div>
</template>
<script>
import search from './order_demand_search.vue'
// import requestTable from './table.vue'
// import requestPage from "./request_change_page.vue"
export default {
  components:{
      search,
    //   requestTable,
    //   requestPage
  },
   created(){
      this.$store.commit("GET_REQUEST_INFO",{data:this.$store.state.app.request_search_info,pageNo:1})
  }
}
</script>
<style>

</style>
