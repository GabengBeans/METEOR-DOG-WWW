<template>
    <div>
        <search :data="searchConfig" :storeStatus="status"></search>
        <userTable></userTable>
        <user-page :storeStatus="status" :currentPage="$store.state.app.user_page_info.currentPage" :totalPage="$store.state.app.user_page_info.totalPage" ></user-page>
    </div>
</template>
<script>
import config from "./config";
import search from "@/views/public-components/search";
import userTable from "./table.vue";
import userPage from "@/views/public-components/changePage";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      status: "user",
      searchConfig: config.userSearch
    };
  },
  components: {
    search,
    userTable,
    userPage
  },
  created() {
    //console.log("user页")
    this.$store.commit("GET_USER_INFO", {
      data: this.$store.state.app.user_search_info,
      pageNo: this.$store.state.app.user_public_page
    });
  }
};
</script>
<style>

</style>
