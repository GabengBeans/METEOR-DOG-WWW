<template>
    <div>
        <Search :data="searchConfig" :storeStatus="status"></Search>
        <div class="btns">
          <Button type="primary" style="margin-right:1vw" @click="searchData(-1)">近1天</Button >
          <Button type="primary" style="margin-right:1vw" @click="searchData(-7)">近7天</Button>
          <Button type="primary" @click="searchData(-30)">近30天</Button>
        </div>
        <subComponent></subComponent>
    </div>
</template>
<script>
import config from "../config";
import Search from "@/views/public-components/search";
import subComponent from "./statistics_transaction_sub";
export default {
  data() {
    return {
      status: "statisticsTransactionSearch",
      searchConfig: config.statisticsTransactionSearch,
    };
  },
 computed: {
    
  },
  components: {
    Search,
    subComponent
  },
  created() {
    this.$store.commit("GET_ORDER_STATISTICS_SEARCH_INFO", {
      time: {}
    });
  },
  methods:{
      searchData(num){
         this.$store.commit("GET_ORDER_STATISTICS_SEARCH_INFO", {
      time: { quickQueryType: num }
    }); 
      }
  }
};
</script>
<style>

</style>
