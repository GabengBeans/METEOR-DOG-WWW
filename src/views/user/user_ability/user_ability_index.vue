<template>
    <div>
        <userAbilitySearch :data="searchConfig" :storeStatus="status"></userAbilitySearch>
        <userAbilityTable :data="$store.state.app.user_ability_search_result"></userAbilityTable>
        <userAbilityPage :storeStatus="status" :currentPage="$store.state.app.user_ability_page_info.currentPage" :totalPage="$store.state.app.user_ability_page_info.totalPage"></userAbilityPage>
    </div>
</template>
<script>
import config from "./config";
import userAbilitySearch from "@/views/public-components/search";
import userAbilityTable from "./user_ability_table"
import userAbilityPage from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "userAbility",
      searchConfig: config.userAbilitySearch
    };
  },
  components: {
    userAbilitySearch,
    userAbilityTable,
    userAbilityPage
  },
  created(){
      this.$store.commit("GET_USER_ABILITY_LIST",{
          data:this.$store.state.app.user_ability_search_info,
          pageNo:this.$store.state.app.user_ability_public_page
      })
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>
