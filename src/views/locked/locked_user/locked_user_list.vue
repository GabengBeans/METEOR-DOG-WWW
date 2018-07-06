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
import Util from "@/libs/util"
import base_uri from "@/libs/base_uri"
import AdminUserTable from "./locked_user_table"
import AdminUserPage from "@/views/public-components/changePage"
export default {
  data(){
        return {
            status:"lockedUser",
            searchConfig:{}
        }
    },
  created() {
    this.$store.commit("GET_SEARCH_ADIMIN_USER_INFO",{data:this.$store.state.app.admin_user_search_info,pageNo:this.$store.state.app.admin_user_public_page})
    Util.ajax({
      method:"post",
      url:base_uri.search_admin_role_info,
      params:{
        pageNo:1,
        pageSize:999,
      },
      data:{}
    }).then(res=>{
      if(res.data.success)
      {
        let obj = res.data.data.items
        let items = {}
        for(let x= 0;x<obj.length;x++)
        {
          if(obj[x].status==1 && obj[x].id!=1)
          {
            items["op"+obj[x].id] = {
              num:obj[x].id,
              value:obj[x].roleName
            }
          }
        }
        Object.assign(config.lockedUserSearch.roleId.tag,items)
        this.searchConfig = config.lockedUserSearch
      }
    })
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
