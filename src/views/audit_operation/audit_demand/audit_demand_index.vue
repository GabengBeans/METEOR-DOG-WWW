<template>
    <div>
        <searchAuditDemand :data ="data" :storeStatus="status"></searchAuditDemand>
        <auditDemandTable :columns="columns"
        :data="$store.state.app.audit_all_search_result"
        ></auditDemandTable>
        <auditDemandChangPage
        :storeStatus="status"
        :currentPage="$store.state.app.audit_demand_page_info.currentPage" 
        :totalPage="$store.state.app.audit_demand_page_info.totalPage"
        ></auditDemandChangPage>
    </div>
</template>
<script>
import config from "../config"
import searchAuditDemand from "@/views/public-components/search"
import auditDemandTable from "@/views/public-components/table"
import auditDemandChangPage from "@/views/public-components/changePage"
export default {
    data(){
        return {
            data:config.searchAuditDemand,
            columns:config.auditDemandTableColumns,
            status:"audit_demand"
        }
    },
    components:{
        searchAuditDemand,
        auditDemandTable,
        auditDemandChangPage
    },
  created() {
    this.$store.commit("GET_AUDIT_ALL_INFO", {
      data: this.$store.state.app.audit_demand_search_info,
      pageNo: this.$store.state.app.audit_demand_public_page,
      name:"demand"
    });
  }
}
</script>
<style>

</style>
