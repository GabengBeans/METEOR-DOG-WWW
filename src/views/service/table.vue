<template>
<div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" 
    border stripe :columns="columns" :data="$store.state.app.service_search_result">
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
          title: "服务ID",
          key: "id",
          width:160
        },
        {
          title: "服务标题",
          key: "title",
          ellipsis:"false"
        },
        {
          title: "昵称",
          key: "nickname",
          ellipsis:"false"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "发布时间",
          key: "createTime",
          width:150
        },
        {
          title: "审核时间",
          key: "auditTime",
          width:150
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
                        this.$router.push("/service-detail/"+params.row.id)
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
                      this.$router.push("/service-review/"+params.row.id) 
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
                      this.$router.push("/service-edit/"+params.row.id) 
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
