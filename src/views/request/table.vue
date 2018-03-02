<template>
<div id='user_table'>
    <Table style="min-width:800px;margin:0 16px;" 
    border stripe :columns="columns" :data="$store.state.app.request_search_result">
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
          title: "需求ID",
          key: "id"
        },
        {
          title: "需求标题",
          key: "title"
        },
        {
          title: "商户/姓名/昵称",
          key: "nickname"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "发布时间",
          key: "createTime"
        },
        {
          title: "审核时间",
          key: "auditTime"
        },
        {
          title: "审核状态",
          key: "businessStatus"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "操作",
          key: "phone",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        this.$router.push("/request-detail/"+params.row.id)
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled:params.row.businessStatus =="审核中" && params.row.status=="有效"?false:true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/demand-review/"+params.row.id) 
                    }
                  }
                },
                "审核"
              ),
              // ]
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/demand-edit/"+params.row.id) 
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
    };
  },
};
</script>
