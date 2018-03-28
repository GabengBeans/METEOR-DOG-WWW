<template>
    <div id='user_table' class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.system_settings_search_result">
        </Table>
        <Modal v-model="showEidtPage" width="360" @on-cancel="showEidtPage=false" @on-ok="editSystem()">
            <p slot="header" style="color:#f60;text-align:center">
                <span>编辑系统变量</span>
            </p>
            <div style="text-align:center">
                <Form :label-width="40" label-position="left">
                    <FormItem label="键">
                        <Input clearable v-model="SystemData.key" />
                    </FormItem>
                    <FormItem label="值">
                        <Input clearable v-model="SystemData.value" />
                    </FormItem>
                    <FormItem label="描述">
                        <Input clearable v-model="SystemData.description" />
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  name: "user_table",

  data() {
    return {
      SystemData: {
        key: "",
        value: "",
        description: "",
        id: ""
      },
      showEidtPage: false,
      columns: [
        {
          title:"父KEY",
          key:"parentkey"
        },
        {
          title: "键",
          key: "key"
        },
        {
          title: "值",
          key: "value"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "操作",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showEidtPage = true;
                      this.SystemData.key = params.row.key;
                      this.SystemData.value = params.row.value;
                      this.SystemData.description = params.row.description;
                      this.SystemData.id = params.row.id;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled:params.row.status=="有效"?true:false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        let data = {
                            settingId:params.row.id
                        }
                       Util.ajax({
                           method:"post",
                           url:baseUri.enabling_setting_url,
                           data:Util.formData(data)
                       }).then(res=>{
                           if(res.data.success)
                           {
                               params.row.status = "有效"
                               this.$Message.success("启用成功")
                           }else{
                               this.$Message.success("启用失败")
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
                    type: "error",
                    size: "small",
                    disabled:params.row.status=="无效"?true:false
                  },
                  on: {
                    click: () => {
                       let data = {
                            settingId:params.row.id
                        }
                       Util.ajax({
                           method:"post",
                           url:baseUri.delete_setting_url,
                           data:Util.formData(data)
                       }).then(res=>{
                           if(res.data.success)
                           {
                               params.row.status = "无效"
                               this.$Message.success("禁用成功")
                           }else{
                               this.$Message.success("禁用失败")
                           }
                       }).catch(error=>{
                           console.log(error)
                       })
                    }
                  }
                },
                "禁用"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    editSystem() {
      Util.ajax({
        method: "post",
        url: baseUri.edit_setting_url,
        data: {
          key: this.SystemData.key,
          value: this.SystemData.value,
          description: this.SystemData.description,
          id: this.SystemData.id
        }
      })
        .then(res => {
          //console.log(res)
          if (res.data.success) {
            this.$store.commit("GET_SYSTEM_SETTINGS_SEARCH_INFO", {
              data: {},
              pageNo: 1
            });
            this.$Message.success("编辑成功");
          } else {
            this.$Message.error("编辑失败");
          }
        })
        .catch(error => {
          this.$Message.error(error);
        });
    }
  }
};
</script>
