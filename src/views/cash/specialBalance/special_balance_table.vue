<template>
    <div class="table">
        <Button type="success" style="margin:0 16px">新增用户</Button>
        <br><br>
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns"></Table>
<!-- 新增用户Modal -->
        <Modal v-model="addUserModal" width="360">
        <p slot="header" style="text-align:center">
            <span>新增用户</span>
        </p>
        <div style="text-align:center">
            <Form :label-width="80">
                <FormItem label="用户ID" >
                    <Input clearable  v-model="addUserObj.id"/>
                </FormItem>
                <FormItem label="结算比例">
                    <Input clearable v-model="addUserObj.balanceScale" />
                </FormItem>
            </Form>
        </div>
        <div slot="footer" style="display:flex;justify-content:space-around">
            <Button type="error" >取消</Button>
             <Button type="success" >保存</Button>
        </div>
    </Modal>
<!-- 修改用户modal -->
    <Modal v-model="auitUserModal" width="360">
        <p slot="header" style="text-align:center">
            <span>修改</span>
        </p>
        <div style="text-align:center">
              <Form :label-width="80">
                <FormItem label="用户ID" >
                    <Input clearable  v-model="auditUserObj.id"/>
                </FormItem>
                <FormItem label="结算比例">
                    <Input clearable v-model="auditUserObj.balanceScale" />
                </FormItem>
            </Form>
        </div>
        <div slot="footer" style="display:flex;justify-content:space-around">
           <Button type="error" >取消</Button>
             <Button type="success" >保存</Button>
        </div>
    </Modal>
    </div>    
</template>
<script>
export default {
  data() {
    return {
      addUserModal: true,
      auitUserModal: false,
      addUserObj: {
        id: "",
        balanceScale: ""
      },
      auditUserObj: {
        id: "",
        balanceScale: ""
      },
      columns: [
        {
          title: "用户ID",
          key: "userId"
        },
        {
          title: "用户昵称",
          key: "nickname"
        },
        {
          title: "平台手续费扣除比例",
          key: ""
        },
        {
          title: "操作",
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
                  on: {
                    click: () => {}
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
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
@import "../../../styles/public.less";
</style>
