<template>
  <div>
    <Search :data="searchConfig" :storeStatus="status"></Search>
    <AdminUserTable></AdminUserTable>
    <AdminUserPage :storeStatus="status" :currentPage="$store.state.app.admin_user_page_info.currentPage" :totalPage="$store.state.app.admin_user_page_info.totalPage"></AdminUserPage>
  </div>
</template>
<script>
import config from "../config"
import Search from "@/views/public-components/search"
import AdminUserTable from "./locked_user_table"
import AdminUserPage from "@/views/public-components/changePage"
export default {
  data(){
        return {
            status:"lockedUser",
            searchConfig:config.lockedUserSearch,
        }
    },
  created() {
    this.$store.commit("GET_SEARCH_ADIMIN_USER_INFO",{data:this.$store.state.app.admin_user_search_info,pageNo:this.$store.state.app.admin_user_public_page})
  },
  components:{
    Search,
    AdminUserTable,
    AdminUserPage
  },
  methods:{
    addAdminUser(){
      // Util.ajax({
      //   method:"post",
      //   u
      // })
    }
  }
};
</script>
<style>

</style>
