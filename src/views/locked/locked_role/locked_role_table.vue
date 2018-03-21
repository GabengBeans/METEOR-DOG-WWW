<template>
    <div id='user_table' class="table">
        <Button type="success" style="margin-left:16px" @click="showAddAdmin=true">添加角色</Button>
        <br><br>
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.admin_role_search_result">
        </Table>

        <Modal v-model="showAddAdmin" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>添加角色</span>
            </p>
            <div style="text-align:center">
                <UserAdd :data="roleDataAdd"></UserAdd>
            </div>
            <div slot="footer">
                <Button type="error" size="large" @click="showAddAdmin = false">取消</Button>
                <Button type="success" size="large" @click="addAdminRole()">确定</Button>
            </div>
        </Modal>

        <Modal v-model="showRoleDetail" width="500">
            <p slot="header" style="color:#f60;text-align:center">
                <span>角色详情</span>
            </p>
            <div style="text-align:center">
                <UserDetail :data="roleDataDetail"></UserDetail>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long @click="showRoleDetail = false">确定</Button>
            </div>
        </Modal>

        <Modal v-model="showRoleEdit" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>角色分配资源</span>
            </p>
            <div style="text-align:center">
                <UserEdit :data="roleDataEdit" :roleList="roleList"></UserEdit>
            </div>
            <div slot="footer">
                <Button type="error" size="large" @click="showRoleEdit = false">取消</Button>
                <Button type="success" size="large" @click="editUserRole()">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import axios from "axios";
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import Cookies from "js-cookie";
import UserAdd from "./locked_role_add";
import UserDetail from "./locked_role_detail";
import UserEdit from "./locked_role_edit";
export default {
  components: {
    UserAdd,
    UserDetail,
    UserEdit
  },
  name: "user_table",
  data() {
    return {
      roleList: [],
      roleDataAdd: {
        roleName: ""
      },
      roleDataEdit: {},
      roleDataDetail: {},
      showRoleDetail: false,
      showRoleEdit: false,
      showAddAdmin: false,
      columns: [
        {
          title: "角色ID",
          key: "id"
        },
        {
          title: "角色名称",
          key: "roleName"
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
                    type: "error",
                    size: "small",
                    disabled: params.row.status == "无效" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      Util.ajax({
                        method: "post",
                        url: baseUri.disable_admin_role_url,
                        params: {
                          adminRoleId: params.row.id
                        }
                      })
                        .then(res => {
                          if (res.data.success) {
                            this.$Message.success(
                              "角色名称：“" + params.row.roleName + "” 禁用成功"
                            );
                            params.row.status = "无效";
                          }
                        })
                        .catch(error => {
                          this.$Message.error(
                            "角色名称：“" +
                              params.row.roleName +
                              "” 禁用失败，请联系管理员"
                          );
                        });
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
                    disabled: params.row.status == "有效" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      Util.ajax({
                        method: "post",
                        url: baseUri.enabling_admin_role_url,
                        params: {
                          adminRoleId: params.row.id
                        }
                      })
                        .then(res => {
                          if (res.data.success) {
                            this.$Message.success(
                              "角色名称：“" + params.row.roleName + "” 启用成功"
                            );
                            params.row.status = "有效";
                          }
                        })
                        .catch(error => {
                          this.$Message.error(
                            "角色名称：“" +
                              params.row.roleName +
                              "” 启用失败，请联系管理员"
                          );
                        });
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
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      function getAdminUserDetail() {
                        return Util.ajax({
                          method: "get",
                          url: baseUri.admin_role_detail_url,
                          params: {
                            adminRoleId: params.row.id
                          }
                        });
                      }
                      function getFindGrantAdminRole() {
                        return Util.ajax({
                          method: "get",
                          url: baseUri.find_grant_admin_resource_url,
                          params: {
                            adminRoleId: params.row.id
                          }
                        });
                      }
                      axios
                        .all([getAdminUserDetail(), getFindGrantAdminRole()])
                        .then(
                          axios.spread((res1, res2) => {
                            // console.log(res1);
                            console.log(res2);
                            if (res1.data.success && res2.data.success) {
                              this.showRoleEdit = true;
                              let edit = res1.data.data;
                              let resource = res2.data.data;
                              //console.log(res1);
                              for (let x in edit) {
                                if (x == "createTime") {
                                  this.$set(
                                    this.roleDataEdit,
                                    x,
                                    Util.formatDate(
                                      new Date(edit.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.roleDataEdit,
                                    x,
                                    Util.formatDate(
                                      new Date(edit.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.roleDataEdit,
                                    x,
                                    statusArr[edit[x]]
                                  );
                                } else {
                                  this.$set(this.roleDataEdit, x, edit[x]);
                                }
                              }
                              Util.recursion(
                                resource.allLabels,
                                "childAdminResources",
                                false
                              );
                            // for(let x=0;x<resource.allLabels.length;x++)
                            // {
                            //     delete resource.allLabels[x].checked
                            // }
                            //console.log(resource.allLabels)
                              this.$set(
                                this.roleDataEdit,
                                "tree",
                                resource.allLabels
                              );
                            }
                          })
                        )
                        .catch(error => {
                          this.$Message.error("请求错误，请联系管理员");
                          console.log(error);
                        });
                    }
                  }
                },
                "分配资源"
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
                      function getAdminUserDetail() {
                        return Util.ajax({
                          method: "get",
                          url: baseUri.admin_role_detail_url,
                          params: {
                            adminRoleId: params.row.id
                          }
                        });
                      }
                      function getFindGrantAdminRole() {
                        return Util.ajax({
                          method: "get",
                          url: baseUri.find_grant_admin_resource_url,
                          params: {
                            adminRoleId: params.row.id
                          }
                        });
                      }
                      axios
                        .all([getAdminUserDetail(), getFindGrantAdminRole()])
                        .then(
                          axios.spread((res1, res2) => {
                            console.log(res1);
                            console.log(res2);
                            if (res1.data.success && res2.data.success) {
                              this.showRoleDetail = true;
                              let detail = res1.data.data;
                              let resource = res2.data.data;
                              //console.log(res1);
                              for (let x in detail) {
                                if (x == "createTime") {
                                  this.$set(
                                    this.roleDataDetail,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.roleDataDetail,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.roleDataDetail,
                                    x,
                                    statusArr[detail[x]]
                                  );
                                } else {
                                  this.$set(this.roleDataDetail, x, detail[x]);
                                }
                              }
                              Util.recursion(
                                resource.allLabels,
                                "childAdminResources",
                                true
                              );
                              this.$set(
                                this.roleDataDetail,
                                "tree",
                                resource.allLabels
                              );
                            }
                          })
                        )
                        .catch(error => {
                          this.$Message.error("请求错误，请联系管理员");
                          console.log(error);
                        });
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
  },
  methods: {
    editUserRole() {
      if (this.roleDataEdit.roleName == "") {
        this.$Message.error("请补全信息");
        return;
      }
      let arr = []
      let obj = this.roleDataEdit.tree
      for(let x=0;x<obj.length;x++)
      {
          if(obj[x].checked)
          {
              arr.push(obj[x].id)
              for(let y=0;y<obj[x].children.length;y++)
              {
                  arr.push(obj[x].children[y].id)
              }
          }else{
              for(let y=0;y<obj[x].children.length;y++)
              {
                  if(obj[x].children[y].checked)
                  {
                      arr.push(obj[x].children[y].id)
                      arr.push(obj[x].id)
                  }
              }
          }
      }
      arr = Util.unique(arr)
      //console.log(arr)
        Util.ajax({
            method:"post",
            url:baseUri.edit_grant_admin_resource_url,
           params:{
                adminRoleId:this.roleDataEdit.id,
                ids:arr.join(",")
            }
        }).then(res=>{
            if(res.data.success)
            {
                this.showRoleEdit = false
                this.$Message.success("保存成功")
            }
        }).catch(error=>{
            this.$Message.error("保存失败，请联系管理员")
            console.log(error)
        })
    },
    addAdminRole() {
      for (let x in this.roleDataAdd) {
        if (this.roleDataAdd[x] == "") {
          this.$Message.error("请补全信息");
          return;
        }
      }
      Util.ajax({
        method: "post",
        url: baseUri.add_admin_role_url,
        data: this.roleDataAdd
      })
        .then(res => {
          if (res.data.success) {
            this.showAddAdmin = false;
            this.$store.commit("GET_SEARCH_ADIMIN_ROLE_INFO", {
              data: this.$store.state.app.admin_role_search_info,
              pageNo: this.$store.state.app.admin_role_public_page
            });
            this.$Message.success("添加成功");
          }
        })
        .catch(error => {
          this.$Message.error("添加失败，请联系管理员");
          console.log(error);
        });
    }
  }
};
</script>


<style>

</style>
