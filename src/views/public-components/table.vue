<template>
<div id='user_table'>
    <Table  style="min-width:800px;margin:0 16px;" 
    border  stripe  :columns="columns" :data="data">
    </Table>
</div>
   
</template>
<script>
export default {
  name: "user_table",
  props:["columns","data"]
};
</script>
