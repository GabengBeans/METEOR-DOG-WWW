<template>
  <div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.user_search_result">
    </Table>
    <!-- <Modal v-model="showAbilityModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <span>权限</span>
        </p>
        <div style="text-align:center;height:20vh">
            <CheckboxGroup v-model="disabledGroup">
                <Checkbox label="IP红包创建权限"></Checkbox>
            </CheckboxGroup>
        </div>
        <div slot="footer" style="text-align:center">
          <Button type="success" @click="updataUserAbility" >保存</Button>
            <Button type="error" @click="showAbilityModal=false" >取消</Button>
        </div>
    </Modal> -->
  </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import Cookies from "js-cookie";
export default {
  name: "user_table",

  data() {
    return {
      showAbilityModal:true,
      columns: [
        {
          title: "序号",
          key: "id",
          width:160
        },
        {
          title: "服务ID",
          key: "phone"
        },
        {
          title: "服务标题",
          key: "nickname",
          ellipsis: "false"
        },
        {
          title: "IP昵称",
          key: "realname"
        },
        {
          title: "状态",
          key: "meteorScore"
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
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    disabled: params.row.status == "正常" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      
                    }
                  }
                },
                "下线"
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
                     
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods:{
    updataUserAbility(){

    }
  }
};
</script>
