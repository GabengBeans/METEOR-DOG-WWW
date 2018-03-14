<template>
    <div id='user_table'>
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.app_search_result">
        </Table>
        
    </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  name: "user_table",
  data() {
    return {
      columns: [
        {
          title: "app版本号",
          key: "appVersion"
        },
        {
          title: "上传时间",
          key: "createTime"
        }
      ]
    };
  },
}
</script>
