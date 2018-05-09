<template>
  <div>
      <ipSearch></ipSearch>
      <ipTable></ipTable>
      <ipChangePage></ipChangePage>
  </div>
</template>
<script>
import ipSearch from "./recommend_ip_set_search"
import ipTable from "./recommend_ip_set_table"
import ipChangePage from "@/views/public-components/changePage"
export default {
  components:{
      ipSearch,
      ipTable,
      ipChangePage
  }
}
</script>
<style>
@import "../../../styles/public.less";
</style>
