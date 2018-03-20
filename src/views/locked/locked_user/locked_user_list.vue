<template>
  <div>
    <br><br>
    <Search :data="searchConfig" :storeStatus="status"></Search>
    <Button type="success" style="margin-left:16px" @click ="showAddAdmin=true">添加管理员</Button>
    <br><br>
    <AdminUserTable></AdminUserTable>
    <br>
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
            showAddAdmin:false
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

  }
};
</script>
<style>

</style>
