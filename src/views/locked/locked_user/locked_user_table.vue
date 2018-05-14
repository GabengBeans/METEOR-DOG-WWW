<template>
  <div id='user_table' class="table">
    <Button type="success" style="margin-left:16px" @click="showAddAdmin=true">添加管理员</Button>
    <br><br>
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.admin_user_search_result">
    </Table>
    <Modal v-model="showAddAdmin" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加管理员</span>
      </p>
      <div style="text-align:center">
        <UserAdd :data="userDataAdd" :roleList="roleList"></UserAdd>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="showAddAdmin = false">取消</Button>
        <Button type="success" size="large" @click="addAdminUser()">确定</Button>
      </div>
    </Modal>
    <Modal v-model="showUserDetail" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>用户详情</span>
      </p>
      <div style="text-align:center">
        <UserDetail :data="userDataDetail"></UserDetail>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="showUserDetail = false">确定</Button>
      </div>
    </Modal>
    <Modal v-model="showUserEdit" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>用户分配角色</span>
      </p>
      <div>
        <UserEdit :data="userDateEdit" :roleList="roleList"></UserEdit>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="showUserEdit = false">取消</Button>
        <Button type="success" size="large" @click="editUserRole()">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
//import Cookies from "js-cookie";
import UserAdd from "./locked_user_add";
import UserDetail from "./locked_user_detail";
import UserEdit from "./locked_user_edit";
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
      userDataAdd: {
        nickname: "",
        realname: "",
        username: "",
        password: "123456",
        phone: "",
        mail: "",
        status: 1
      },
      userDateEdit: {},
      userDataDetail: {},
      showUserDetail: false,
      showUserEdit: false,
      showAddAdmin: false,
      columns: [
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "昵称",
          key: "nickname",
          ellipsis: "false"
        },
        {
          title: "账号",
          key: "username",
          ellipsis: "false"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title:"用户角色",
          key:"roleName"
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
                        url: baseUri.disable_admin_user_url,
                        params: {
                          adminUserId: params.row.id
                        }
                      })
                        .then(res => {
                          if (res.data.success) {
                            this.$Message.success(
                              "昵称：“" + params.row.nickname + "” 禁用成功"
                            );
                            params.row.status = "无效";
                          }
                        })
                        .catch(error => {
                          this.$Message.error(
                            "昵称：“" +
                              params.row.nickname +
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
                        url: baseUri.enabling_admin_user_url,
                        params: {
                          adminUserId: params.row.id
                        }
                      })
                        .then(res => {
                          if (res.data.success) {
                            this.$Message.success(
                              "昵称：“" + params.row.nickname + "” 启用成功"
                            );
                            params.row.status = "有效";
                          }
                        })
                        .catch(error => {
                          this.$Message.error(
                            "昵称：“" +
                              params.row.nickname +
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
                          url: baseUri.admin_user_detail_url,
                          params: {
                            adminUserId: params.row.id
                          }
                        });
                      }
                      function getFindGrantAdminRole() {
                        return Util.ajax({
                          method: "get",
                          url: baseUri.find_grant_admin_role_url,
                          params: {
                            adminUserId: params.row.id
                          }
                        });
                      }
                      function getRoleList() {
                        return Util.ajax({
                          method: "get",
                          url: baseUri.get_roleList_url
                        });
                      }
                      axios
                        .all([
                          getAdminUserDetail(),
                          getFindGrantAdminRole(),
                          getRoleList()
                        ])
                        .then(
                          axios.spread((res1, res2, res3) => {
                            if (
                              res1.data.success &&
                              res2.data.success &&
                              res3.data.success
                            ) {
                              this.showUserEdit = true;
                              let detail = res1.data.data;
                              let role = res2.data.data[0];
                              let roleList = res3.data.data;
                              //console.log(res1);
                              this.roleList = [];
                              for (let x = 0; x < roleList.length; x++) {
                                let obj = {
                                  label: "",
                                  id: ""
                                };
                                obj.label = roleList[x].roleName;
                                obj.id = roleList[x].id;
                                this.roleList.push(obj);
                              }
                              //console.log(this.roleList)
                              //console.log(res2);
                              for (let x in detail) {
                                if (x == "createTime") {
                                  this.$set(
                                    this.userDateEdit,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.userDateEdit,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.userDateEdit,
                                    x,
                                    statusArr[detail[x]]
                                  );
                                } else {
                                  this.$set(this.userDateEdit, x, detail[x]);
                                }
                              }
                              if (role && role.id) {
                                this.$set(this.userDateEdit, "roleId", role.id);
                              } else {
                                this.$set(
                                  this.userDateEdit,
                                  "roleId",
                                  ""
                                );
                              }
                            }
                          })
                        ).catch(error=>{
                          this.$Message.error("请求错误，请联系管理员");
                          console.log(error);
                        })
                    }
                  }
                },
                "分配角色"
              ),
              // ]
              // ),
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
                          url: baseUri.admin_user_detail_url,
                          params: {
                            adminUserId: params.row.id
                          }
                        });
                      }
                      function getFindGrantAdminRole() {
                        return Util.ajax({
                          method: "get",
                          url: baseUri.find_grant_admin_role_url,
                          params: {
                            adminUserId: params.row.id
                          }
                        });
                      }
                      axios
                        .all([getAdminUserDetail(), getFindGrantAdminRole()])
                        .then(
                          axios.spread((res1, res2) => {
                            if (res1.data.success && res2.data.success) {
                              this.showUserDetail = true;
                              let detail = res1.data.data;
                              let role = res2.data.data[0];
                              //console.log(res1);
                              for (let x in detail) {
                                if (x == "createTime") {
                                  this.$set(
                                    this.userDataDetail,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.userDataDetail,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.userDataDetail,
                                    x,
                                    statusArr[detail[x]]
                                  );
                                } else {
                                  this.$set(this.userDataDetail, x, detail[x]);
                                }
                              }
                              if (role && role.roleName) {
                                this.$set(
                                  this.userDataDetail,
                                  "roleName",
                                  role.roleName
                                );
                              } else {
                                this.$set(
                                  this.userDataDetail,
                                  "roleName",
                                  "未分配角色"
                                );
                              }
                            }
                          })
                        );
                      //     .catch(error);
                      //   {
                      //     this.$Message.error("请求错误，请联系管理员");
                      //     console.log(error);
                      //   }
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
      //console.log(this.userDateEdit)
      if(!(this.userDateEdit.nickname && this.userDateEdit.roleId && this.userDateEdit.username))
      {
         this.$Message.error("请补全信息")
         return
      }
      let This = this;
      function editAdminUser() {
        return Util.ajax({
          method: "post",
          url: baseUri.edit_admin_user_url,
          data: {
            id: This.userDateEdit.id,
            nickname: This.userDateEdit.nickname,
            username: This.userDateEdit.username
          }
        });
      }
      function grantAdminRole() {
        return Util.ajax({
          method: "post",
          url: baseUri.grant_admin_role_url,
          params: {
            adminUserId: This.userDateEdit.id,
            roleId: This.userDateEdit.roleId
          }
        });
      }
      axios.all([editAdminUser(), grantAdminRole()]).then(
        axios.spread((res1, res2) => {
          if (res1.data.success && res2.data.success) {
            This.showUserEdit = false;
            this.$store.commit("GET_SEARCH_ADIMIN_USER_INFO", {
              data: this.$store.state.app.admin_user_search_info,
              pageNo: this.$store.state.app.admin_user_public_page
            });
            This.$Message.success("保存成功");
          }
        })
      ).catch(error=>{
           This.$Message.error("保存失败");
           console.log(error)
      })
    },
    addAdminUser() {
      for(let x in this.userDataAdd)
      {
        if(this.userDataAdd[x]=="")
        {
          this.$Message.error("请补全信息")
          return
        }
      }
      Util.ajax({
        method: "post",
        url: baseUri.add_admin_user,
        data: this.userDataAdd
      })
        .then(res => {
          if (res.data.success) {
            this.showAddAdmin = false;
            this.$store.commit("GET_SEARCH_ADIMIN_USER_INFO", {
              data: this.$store.state.app.admin_user_search_info,
              pageNo: this.$store.state.app.admin_user_public_page
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
