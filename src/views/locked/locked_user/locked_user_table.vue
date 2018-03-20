<template>
    <div id='user_table'>
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.admin_user_search_result">
        </Table>
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
                <span>用户编辑</span>
            </p>
            <div>
                <UserEdit :data="userDataEidt" :roleList="roleList"></UserEdit>
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
import Cookies from "js-cookie";
import UserDetail from "./locked_user_detail";
import UserEdit from "./locked_user_edit";
export default {
  components: {
    UserDetail,
    UserEdit
  },
  name: "user_table",
  data() {
    return {
      roleList: [],
      userDataEidt: {},
      userDataDetail: {},
      showUserDetail: false,
      showUserEdit: false,
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
                                    this.userDataEidt,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.userDataEidt,
                                    x,
                                    Util.formatDate(
                                      new Date(detail.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.userDataEidt,
                                    x,
                                    statusArr[detail[x]]
                                  );
                                } else {
                                  this.$set(this.userDataEidt, x, detail[x]);
                                }
                              }
                              if (role && role.id) {
                                this.$set(this.userDataEidt, "roleId", role.id);
                              } else {
                                this.$set(
                                  this.userDataEidt,
                                  "level",
                                  "未分配角色"
                                );
                              }
                            }
                          })
                        )
                    //     .catch(error);
                    //   {
                    //     this.$Message.error("请求错误，请联系管理员");
                    //     console.log(error);
                    //   }
                    }
                  }
                },
                "编辑"
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
                        )
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
      //console.log(this.userDataEidt);
      let This = this
      //edit_admin_user_url
      //grant_admin_role_url
      function editAdminUser() {
        return Util.ajax({
          method: "post",
          url: baseUri.edit_admin_user_url,
          data: {
            id: This.userDataEidt.id,
            nickname: This.userDataEidt.nickname,
            username: This.userDataEidt.username
          }
        });
      }
      function grantAdminRole() {
        return Util.ajax({
          method: "post",
          url: baseUri.grant_admin_role_url,
          params: {
            adminUserId: This.userDataEidt.id,
            roleId: This.userDataEidt.roleId
          }
        });
      }
      axios
        .all([editAdminUser(), grantAdminRole()])
        .then(axios.spread((res1, res2) => {
            if(res1.data.success && res2.data.success)
            {
                This.showUserEdit = false
                This.$Message.success("保存成功")
            }else{
                 This.$Message.error("保存失败")
            }
        }))
    //     .catch(error)
    //   {
    //     This.$Message.error("请求错误，请联系管理员");
    //     console.log(error);
    //   }
    }
  }
};
</script>
