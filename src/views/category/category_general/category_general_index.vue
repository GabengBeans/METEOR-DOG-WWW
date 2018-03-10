<template>
    <div class="category" style="width:85vw;min-width:650px;margin:auto;">
        <Card class="card_class">
            <MyTree :categoryData="$store.state.app.category_search_result"></MyTree>
        </Card>
        <Card class="card_class">
            <MyTree :categoryData="$store.state.app.categorys_search_result"></MyTree>
        </Card>
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
  width: 40vw;
  min-width: 400px;
  float: left;
  margin: 1vw;
  min-width: 300px;
}
</style>
