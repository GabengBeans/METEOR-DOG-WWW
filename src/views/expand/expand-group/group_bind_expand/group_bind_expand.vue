<template>
  <div class="expand-group">
      <search class="search"></search>
      <requestTable class="table"></requestTable>
      <requestPage class="pager"></requestPage>
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
      //console.log(this.$store.state.app.group_bind_search_info)
      this.$store.commit("GET_GROUP_BIND_INFO",{data:this.$store.state.app.group_bind_search_info,pageNo:1})
    }
  }
</script>
<style lang="less">
  @import "../../../../styles/public.less";
</style>