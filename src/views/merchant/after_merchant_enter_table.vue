<template>
    <div id='user_table' class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="data">
        </Table>
    </div>

</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      columns: [
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "联系人",
          key: "contact"
        },
        {
          title: "联系电话",
          key: "contactNumber"
        },
        {
          title: "办公地址",
          key: "officeAddress"
        },
        {
          title: "主营业务",
          key: "mainBusiness"
        },
        {
          title: "提交时间",
          key: "createTime"
        }
      ]
    };
  }
};
</script>
