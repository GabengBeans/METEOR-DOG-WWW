<template>
    <div class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns"></Table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "企业ID",
          key: "id"
        },
        {
          title: "昵称",
          key: "nickName"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "企业名称",
          key: "id"
        },
        {
          title: "流星值",
          key: "id"
        },
        {
          title: "余额",
          key: "id"
        },
        {
          title: "状态",
          key: "id"
        }
      ]
    };
  }
};
</script>
<style>

</style>
