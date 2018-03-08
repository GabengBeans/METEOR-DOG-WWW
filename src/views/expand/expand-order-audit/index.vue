<template>
  <div class="expand-order-audit">
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
      this.$store.commit("GET_BROKERAGE_ORDER_INFO",{data:this.$store.state.app.brokerage_order_search_info,pageNo:1})
    }
  }
</script>
<style lang="less">
  @import "../../../styles/public.less";
</style>


