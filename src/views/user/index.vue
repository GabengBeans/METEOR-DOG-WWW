<template>
    <div>
        <br><br>
        <search></search>
        <br><br>
        <userTable></userTable>
        <br>
        <user-page></user-page>
    </div>
</template>
<script>
import search from './search.vue'
import userTable from './table.vue'
import userPage from "./user_change_page.vue"
import Cookies from "js-cookie"
export default {
  components:{
      search,
      userTable,
      userPage
  },
   created(){
      this.$store.commit("GET_USER_INFO",{data:this.$store.state.app.user_search_info,pageNo:1})
  }
}
</script>
<style>

</style>
