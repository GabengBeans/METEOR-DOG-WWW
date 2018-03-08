<template>
<div id='page'>
    <Page style='float:right;  margin-right:10px' 
    :current="$store.state.app.order_demand_page_info.currentPage" 
    :total="$store.state.app.order_demand_page_info.totalPage" 
    show-elevator @on-change = 'switch_page' >
    </Page>
</div>
</template>
<script>
export default {
  name: "page",
  methods: {
    switch_page: function(index) {
        //console.log(this.$store.state.app.request_search_info)
        this.$store.commit("GET_ORDER_DEMAND_INFO",{data:this.$store.state.app.order_demand_search_info,pageNo:index})
    }
  }
};
</script>