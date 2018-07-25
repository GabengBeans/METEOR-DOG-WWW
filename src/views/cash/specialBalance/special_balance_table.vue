<template>
  <div class="table">
    <Button type="success" style="margin:0 16px" @click="addUserModal=true">新增用户</Button>
    <br><br>
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.special_balance_search_result"></Table>
    <!-- 新增用户Modal -->
    <Modal v-model="addUserModal" width="360">
      <p slot="header" style="text-align:center">
        <span>新增用户</span>
      </p>
      <div style="text-align:center">
        <Form :label-width="80">
          <FormItem label="用户ID">
            <Input clearable v-model="addUserObj.id" />
          </FormItem>
          <FormItem label="结算比例">
            <Input clearable v-model="addUserObj.balanceScale" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="display:flex;justify-content:space-around">
        <Button type="error" @click="addUserModal=false">取消</Button>
        <Button type="success" @click="saveAddUser">保存</Button>
      </div>
    </Modal>
    <!-- 修改用户modal -->
    <Modal v-model="auitUserModal" width="360">
      <p slot="header" style="text-align:center">
        <span>修改</span>
      </p>
      <div style="text-align:center">
        <Form :label-width="80">
          <FormItem label="用户ID">
            <Input clearable v-model="auditUserObj.id" />
          </FormItem>
          <FormItem label="结算比例">
            <Input clearable v-model="auditUserObj.balanceScale" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="display:flex;justify-content:space-around">
        <Button type="error" @click="auitUserModal = false">取消</Button>
        <Button type="success" @click="saveAuditUser">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
export default {
  data() {
    return {
      addUserModal: false,
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
          key: "userId",
          width: 160
        },
        {
          title: "用户昵称",
          key: "nickname"
        },
        {
          title: "平台手续费扣除比例",
          key: "rate",
          width: 160
        },
        {
          title: "操作",
          align: "center",
          minWidth: 150,
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
                      this.auditUserObj.id = params.row.userId;
                      this.auditUserObj.balanceScale = params.row.rate;
                      this.auitUserModal = true;
                    }
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
                    click: () => {
                      let data = {
                        userId: params.row.userId
                      };
                      util
                        .ajax({
                          method: "post",
                          url: base_uri.delete_special_rate_url,
                          params: data
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$Message.success("删除成功");
                            this.$store.commit("GET_SPECIAL_BALANCE_SET_LIST");
                          } else {
                            this.$Message.error("删除失败");
                          }
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    saveAddUser() {
      if(!this.addUserObj.id){
        this.$Message.error("请填写用户ID")
        return
      }
      if(!this.addUserObj.balanceScale){
        this.$Message.error("请填写平台手续费扣除比例")
        return
      }
      let params = {
        userId: this.addUserObj.id,
        rate: this.addUserObj.balanceScale
      };
      util
        .ajax({
          method: "post",
          url: base_uri.saveOrUpdate_special_rate_url,
          params: params
        })
        .then(resp => {
          if (resp.data.success) {
            this.$Message.success("添加成功");
            this.$store.commit("GET_SPECIAL_BALANCE_SET_LIST");
            this.addUserObj.id = ""
            this.addUserObj.balanceScale=""
            this.addUserModal = false;
          } else {
            this.$Message.error("添加失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveAuditUser() {
      if(!this.auditUserObj.id){
        this.$Message.error("请填写用户ID")
        return
      }
      if(!this.auditUserObj.balanceScale){
        this.$Message.error("请填写平台手续费扣除比例")
        return
      }
      let params = {
        userId: this.auditUserObj.id,
        rate: this.auditUserObj.balanceScale
      };
      util
        .ajax({
          method: "post",
          url: base_uri.saveOrUpdate_special_rate_url,
          params: params
        })
        .then(resp => {
          if (resp.data.success) {
            this.$Message.success("修改成功");
            this.$store.commit("GET_SPECIAL_BALANCE_SET_LIST");
            this.auitUserModal = false;
          } else {
            this.$Message.error("修改失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>
