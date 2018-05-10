<template>
    <div class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.merchant_bussiness_enter_search_result"></Table>
    </div>
</template>
<script>
import Util from "@/libs/util"
import base_uri from "@/libs/base_uri"
export default {
  data() {
    return {
      columns: [
        {
          title: "企业ID",
          key: "userId"
        },
        {
          title: "昵称",
          key: "nickName",
          ellipsis: "false"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "企业名称",
          key: "companyName",
          ellipsis: "false"
        },
        {
          title: "流星值",
          key: "meteorScore"
        },
        {
          title: "余额",
          key: "amount"
        },
        {
          title: "状态",
          key: "userStatus"
        },
        {
          title: "操作",
          align: "center",
          width:300,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled:params.row.userStatus=="禁用"?true:false
                  },style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                     Util.ajax({
                       method:"post",
                       url:base_uri.enable_or_disable_business_url,
                       params:{
                         userId:params.row.userId,
                         businessStatus:0
                       }
                     }).then(res=>{
                       if(res.data.success)
                       {
                         this.$Message.success("禁用成功！")
                         params.row.userStatus="禁用"
                       }else{
                         this.$Message.error("禁用失败！")
                       }
                     }).catch(error=>{
                       console.log(error)
                     })
                    }
                  }
                },
                "禁用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled:params.row.userStatus=="禁用"?false:true
                  },style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      Util.ajax({
                       method:"post",
                       url:base_uri.enable_or_disable_business_url,
                       params:{
                         userId:params.row.userId,
                         businessStatus:1
                       }
                     }).then(res=>{
                       if(res.data.success)
                       {
                         this.$Message.success("启用成功！")
                         params.row.userStatus="启用"
                       }else{
                         this.$Message.error("启用失败！")
                       }
                     }).catch(error=>{
                       console.log(error)
                     })
                    }
                  }
                },
                "启用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                     this.$router.push("/after-merchant-enter-query-edit/"+params.row.id) 
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      //console.log(this.$router)
                     this.$router.push("/after-merchant-enter-query-detail/"+params.row.userId) 
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>
<style>

</style>
