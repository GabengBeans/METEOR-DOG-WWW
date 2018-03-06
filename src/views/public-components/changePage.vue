<template>
<div id='page'>
    <Page style='float:right;  margin-right:10px' 
    :current="currentPage" 
    :total="totalPage" 
    show-elevator @on-change = 'switch_page' >
    </Page>
</div>
</template>
<script>
export default {
  name: "page",
  props:["storeStatus","currentPage","totalPage"],
  methods: {
    switch_page: function(index) {
      console.log(this.storeStatus)
      switch(this.storeStatus){
        case "cashFlow": 
          //console.log(index)
          this.$store.commit("GET_CASH_FLOW_INFO", { data: this.$store.state.app.cash_flow_search_info, pageNo:index});
        break
        case "cashRefund": 
          //console.log(index)
          this.$store.commit("GET_CASH_REFUND_INFO", { data: this.$store.state.app.cash_refund_search_info, pageNo:index});
        break
        case "cashWithDraw": 
          //console.log(index)
          this.$store.commit("GET_CASH_WITHDRAW_INFO", { data: this.$store.state.app.cash_withdraw_search_info, pageNo:index});
        break
        case "afterMerchantEnter": 
          //console.log(index)
          this.$store.commit("GET_MERCHANT_ENTER_INFO", { data: this.$store.state.app.merchant_enter_search_info, pageNo: index });
        break
      }
    }
  }
};
</script>