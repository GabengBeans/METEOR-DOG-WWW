<template>
    <div>
        <searchAuditService :data ="data" :storeStatus="status"></searchAuditService>
        <auditServiceTable 
        :columns="columns"
        :data="$store.state.app.audit_all_search_result"
        ></auditServiceTable>
        <auditServiceChangPage
        :storeStatus="status"
        :currentPage="$store.state.app.audit_service_page_info.currentPage" 
        :totalPage="$store.state.app.audit_service_page_info.totalPage">
        ></auditServiceChangPage>
    </div>
</template>
<script>
import config from "../config"
import searchAuditService from "@/views/public-components/search"
import auditServiceTable from "@/views/public-components/table"
import auditServiceChangPage from "@/views/public-components/changePage"
export default {
    data(){
        return {
            data:config.searchAuditService,
            columns:config.auditServiceTableColumns,
            status:"audit_service"
        }
    },
    components:{
        searchAuditService,
        auditServiceTable,
        auditServiceChangPage
    },
  created() {
    this.$store.commit("GET_AUDIT_ALL_INFO", {
      data: this.$store.state.app.audit_service_search_info,
      pageNo: this.$store.state.app.audit_service_public_page,
      name:"service"
    });
  }
}
</script>
<style>

</style>
