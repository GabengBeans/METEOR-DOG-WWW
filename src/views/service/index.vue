<template>
    <div>
        <search :data="serviceSearch" :storeStatus="status"></search>
        <requestTable></requestTable>
        <requestPage :storeStatus="status" :currentPage="$store.state.app.service_page_info.currentPage" :totalPage="$store.state.app.service_page_info.totalPage"></requestPage>
    </div>
</template>
<script>
import config from "./config";
import search from "@/views/public-components/search";
import requestTable from "./table.vue";
import requestPage from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "service"
    };
  },
  components: {
    search,
    requestTable,
    requestPage
  },
  computed: {
    serviceSearch() {
      let categoryArr = new Array();
      const obj = this.$store.state.app.category_search_result;
      const obj1 = this.$store.state.app.categorys_search_result;
      let number = 1;
      for (let i in obj.childCategory) {
        let temp = {
          num: obj.childCategory[i].id,
          value: obj.childCategory[i].name
        };
        categoryArr.push(temp);
      }
      for (let i in obj1.childCategory) {
        let temp = {
          num: obj.childCategory[i].id,
          value: obj.childCategory[i].name
        };
        categoryArr.push(temp);
      }
      for (let i in categoryArr) {
        config.serviceSearch.serviceCategory.tag[`op${++number}`] =
          categoryArr[i];
      }
      localStorage.setItem(
        "serviceCategoryObj",
        JSON.stringify(config.serviceSearch)
      );
      return config.serviceSearch;
    }
  },
  created() {
    this.$store.commit("GET_SERVICE_INFO", {
      data: this.$store.state.app.service_search_info,
      pageNo: this.$store.state.app.service_public_page
    });
    if (!localStorage.getItem("serviceCategoryObj")) {
      this.$store.commit("GET_CATEGORY_SEARCH_INFO", { businessType: 1 });
      this.$store.commit("GET_CATEGORY_SEARCH_INFO", { businessType: 2 });
    }
  }
};
</script>
<style>
</style>
