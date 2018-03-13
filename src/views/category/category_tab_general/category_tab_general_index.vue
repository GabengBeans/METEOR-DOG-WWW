<template>
    <div class="category_tab" style="width:78vw;min-width:700px;margin:auto">
        <template v-if ="$store.state.app.category_tab_search_result && $store.state.app.category_tab_search_result.allLabels" >
        <Card class="card_class">
            <MyTree :categoryData="$store.state.app.category_tab_search_result"></MyTree>
        </Card>
        </template>
        <template v-if ="$store.state.app.categorys_tab_search_result && $store.state.app.categorys_tab_search_result.allLabels"> 
        <Card class="card_class">
            <MyTree :categoryData="$store.state.app.categorys_tab_search_result"></MyTree>
        </Card>
        </template>
    </div>
</template>
<script>
import MyTree from "./category_tab_general_tree";
export default {
  name: "category_tab",
  
  components: {
    MyTree
  },
  created() {
    this.$store.commit("GET_LABEL_LIST_SEARCH_INFO", { lableType: 1 });
    this.$store.commit("GET_LABEL_LIST_SEARCH_INFO", { lableType: 2 });
  }
};
</script>
<style>
.card_class {
  min-width: 40vw;
  float:left;
  margin: 1vw;
  min-width: 700px;
}
</style>
