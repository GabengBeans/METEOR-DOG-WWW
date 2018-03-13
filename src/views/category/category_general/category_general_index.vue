<template>
    <div class="category" style="width:88vw;min-width:650px;margin:auto;">
      <template v-if="$store.state.app.category_search_result && $store.state.app.category_search_result.childCategory.length>0">
        <Card class="card_class">
            <MyTree :categoryData="$store.state.app.category_search_result"></MyTree>
        </Card>
      </template>
      <template v-if="$store.state.app.categorys_search_result && $store.state.app.categorys_search_result.childCategory.length>0">
        <Card class="card_class">
            <MyTree :categoryData="$store.state.app.categorys_search_result"></MyTree>
        </Card>
         </template>
    </div>
</template>
<script>
import MyTree from "./category_general_tree";
export default {
  name: "category",
  
  components: {
    MyTree
  },
  created() {
    this.$store.commit("GET_CATEGORY_SEARCH_INFO", { businessType: 1 });
    this.$store.commit("GET_CATEGORY_SEARCH_INFO", { businessType: 2 });
  }
};
</script>
<style>
.card_class {
  min-width: 40vw;
  float: left;
  margin: 1vw;
  min-width: 700px;
}
</style>
