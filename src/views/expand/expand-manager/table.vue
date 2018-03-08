<template>
  <div id='user_table'>
      <div class="btns">
        <i-button class="btn" type="primary">批量导入</i-button>
        <i-button class="btn" type="primary" @click="handleDownload()">下载模板</i-button>
        <i-button class="btn" type="primary">批量导出</i-button>      
      </div>
      <Table style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.expand_search_result">
      </Table>
  </div>
   
</template>
<style>
  .btns{
    margin: 0 30px 15px;
  }
  .btns .btn{
    margin-right: 10px;
  }
</style>

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
          title: "拓展人ID",
          key: "id"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "代理人",
          key: "nickname"
        },
        {
          title: "拓展码",
          key: "inviterCode"
        },
        {
          title: "拓展状态",
          key: "expandStatus"
        },
        {
          title: "拓展用户数",
          key: "allExtendUserCount"
        },
        {
          title: "本月拓展用户",
          key: "extendUserCount"
        },
        {
          title: "本月交易笔数",
          key: "extendServiceCount"
        },
        {
          title: "本月交易金额(元)",
          key: "tradeAmount"
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
                        this.$router.push("/expand-manager-detail/"+params.row.id)
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/expand-manager-edit/"+params.row.id) 
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
  methods: {
    handleDownload() {
      window.open("http://dedc-statics.oss-cn-beijing.aliyuncs.com/files/expand-people.xls")
    }
  }
};
</script>
