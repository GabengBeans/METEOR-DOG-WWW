<template>
    <div>
        <Search></Search>
        <div class="AuditOperationDiv">
            <span class="AuditOperationSpan"><span>总审核条数：</span><span>{{$store.state.app.audit_operation.auditCount}}</span></span>
            <span class="AuditOperationSpan"><span>通过条数：</span><span>{{$store.state.app.audit_operation.passCount}}</span></span>
            <span class="AuditOperationSpan"><span>未通过条数：</span><span>{{$store.state.app.audit_operation.notPassCount}}</span></span>
            <span class="AuditOperationSpan"><span>下架条数：</span><span>{{$store.state.app.audit_operation.underCarriagerCount}}</span></span>
            <span class="AuditOperationSpan"><span>用户数：</span><span>{{$store.state.app.audit_operation.userCount}}</span></span>
            <span class="AuditOperationSpan"><span>服务/需求数：</span><span>{{$store.state.app.audit_operation.serviceOrDemandCount}}</span></span>
        </div>
        <Table :columns="columns" :data="$store.state.app.audit_operation_search_result"></Table>
        <AuditOPerationPage :storeStatus="status" :currentPage="$store.state.app.audit_operation_page_info.currentPage" :totalPage="$store.state.app.audit_operation_page_info.totalPage"></AuditOPerationPage>
    </div>
</template>
<script>
import config from "../config";
import Search from "./audit_operation_search";
import Table from "@/views/public-components/table";
import AuditOPerationPage from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "audit_operation",
      columns: config.auditOPerationTableColumns
    };
  },
  components: {
    Search,
    Table,
    AuditOPerationPage
  },
  created() {
    this.$store.commit("GET_AUDIT_OPERATION_INFO", { data: {}, pageNo: 1 });
  }
};
</script>
<style>
@import "../../../styles/public.less";
.AuditOperationDiv{
    text-align: center;
    background: #ffffff;
    padding:5px;
}
.AuditOperationSpan{
    margin-right: 10vw;
}
</style>
