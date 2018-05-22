<template>
    <div>
        <searchAuditOrder :data ="data" :storeStatus="status"></searchAuditOrder>
        <auditOrderTable 
        :columns="columns"
        :data="$store.state.app.audit_all_search_result"
        ></auditOrderTable>
        <auditOrderChangPage
        :storeStatus="status"
        :currentPage="$store.state.app.audit_order_page_info.currentPage" 
        :totalPage="$store.state.app.audit_order_page_info.totalPage">
        ></auditOrderChangPage>
    </div>
</template>
<script>
import config from "../config"
import searchAuditOrder from "@/views/public-components/search"
import auditOrderTable from "@/views/public-components/table"
import auditOrderChangPage from "@/views/public-components/changePage"
export default {
    data(){
        return {
            data:config.searchAuditOrder,
            columns:config.auditOrderTableColumns,
            status:"audit_order"
        }
    },
    components:{
        searchAuditOrder,
        auditOrderTable,
        auditOrderChangPage
    },
  created() {
    this.$store.commit("GET_AUDIT_ALL_INFO", {
      data: this.$store.state.app.audit_order_search_info,
      pageNo: this.$store.state.app.audit_order_public_page,
      name:"order"
    });
  }
}
</script>
<style>

</style>
