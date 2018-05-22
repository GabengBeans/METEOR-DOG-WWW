<template>
    <div>
        <searchAuditUser :data="data" :storeStatus="status"></searchAuditUser>
        <auditUserTable 
        :columns="columns" 
        :data="$store.state.app.audit_all_search_result">
        </auditUserTable>
        <auditUserChangPage 
        :storeStatus="status"
        :currentPage="$store.state.app.audit_user_page_info.currentPage" 
        :totalPage="$store.state.app.audit_user_page_info.totalPage">
        </auditUserChangPage>
    </div>
</template>
<script>
import config from "../config";
import searchAuditUser from "@/views/public-components/search";
import auditUserTable from "@/views/public-components/table";
import auditUserChangPage from "@/views/public-components/changePage";
export default {
  data() {
    return {
      data: config.searchAuditUser,
      columns: config.auditUserTableColumns,
      status:"audit_user"
    };
  },
  components: {
    searchAuditUser,
    auditUserTable,
    auditUserChangPage
  },
  created() {
    this.$store.commit("GET_AUDIT_ALL_INFO", {
      data: this.$store.state.app.audit_user_search_info,
      pageNo: this.$store.state.app.audit_user_public_page,
      name:"user"
    });
  }
};
</script>
<style>
</style>
