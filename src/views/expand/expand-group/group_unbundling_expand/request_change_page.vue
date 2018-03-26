<template>
<div id='page'>
    <Page style='float:right;  margin-right:10px' 
    :current="$store.state.app.group_unbundling_page_info.currentPage" 
    :total="$store.state.app.group_unbundling_page_info.totalPage" 
    show-elevator @on-change = 'switch_page' >
    </Page>
</div>
</template>
<script>
export default {
  name: "page",
  methods: {
    switch_page: function(index) {
        this.$store.commit("GET_GROUP_UNBUNDLING_INFO",{data:this.$store.state.app.group_unbundling_search_info,pageNo:index,groupId:this.$route.params.id})
    }
  }
};
</script>