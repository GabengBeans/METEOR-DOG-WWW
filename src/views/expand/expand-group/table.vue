<template>
  <div id='user_table'>
      <Table style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.expand_group_search_result">
      </Table>
  </div>
   
</template>

<script>
import Util from '@/libs/util'
import baseUri from '@/libs/base_uri'
import Cookies from "js-cookie"
export default {
  name: "user_table",

  data() {
    return {
      columns: [
        {
          title: "组id",
          key: "id",
          width: 100
        },
        {
          title: "组名称",
          key: "groupName"
        },
        {
          title: "操作",
          key: "phone",
          width: 400,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/expand-group-edit/"+params.row.id) 
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      alert('暂未开发') 
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      alert('暂未开发')
                    }
                  }
                },
                "绑定代理人"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      alert('暂未开发') 
                    }
                  }
                },
                "解绑代理人"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>
