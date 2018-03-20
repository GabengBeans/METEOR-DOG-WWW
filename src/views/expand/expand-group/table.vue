<template>
  <div id='user_table'>
  		<div class="btns">
          <i-button class="btn" type="primary" @click="handleNewGroup()">新增代理组</i-button>
      </div>
      <Table style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.expand_group_search_result">
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: '确定删除？',
                        okText: "确定",
                        cancelText: "取消",
                        onOk: () => {
                          let id = params.row.id;
                          let data = {
                              groupId: id,
                          }
                          Util.ajax({
                            method:"post",
                            url:baseUri.extend_group_delete_group,
                            data: Util.formData(data)
                          }).then((res) => {
                            console.log(res.data)
                            if(res.data.data == 'SUCCESS'){
                              this.$Message.success('删除成功！')
                            }else{
                              this.$Message.error('删除失败！')
                            }
                          })
                        }
                      }) 
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
                      this.$router.push("/group_bind_expand/"+params.row.id)
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
                      this.$router.push("/group_unbundling_expand/"+params.row.id) 
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
  },
  methods: {
  	handleNewGroup() {
      this.$router.push("/expand-group-add/expand-group-add") 
    }
  }
};
</script>
