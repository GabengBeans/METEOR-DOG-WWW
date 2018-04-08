<template>
    <div>
        <Search :data="search"></Search>
            <MerchantTable></MerchantTable>
    </div>
</template>
<script>
import config from "../config";
import Search from "@/views/public-components/search";
import MerchantTable from "./after_merchant_enter_query_table";
export default {
  data() {
    return {
      search: config.afterMerchantEnterQuerySearch
    };
  },
  components: {
    Search,
    MerchantTable
  }
};
</script>
<style>

</style>
