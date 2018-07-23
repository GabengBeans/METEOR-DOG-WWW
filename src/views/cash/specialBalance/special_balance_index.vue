<template>
    <div>
        <special-balance-table></special-balance-table>
    </div>
</template>
<script>
import specialBalanceTable from "./special_balance_table";
export default {
  components: {
    specialBalanceTable
  },
  created(){
      //this.commit("GET_SPECIAL_BALANCE_SET_LIST")
  }
};
</script>
<style>
</style>
