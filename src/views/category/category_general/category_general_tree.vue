<template>
  <div>
    <Tree :data="data"  :render="renderContent"></Tree>
    <AddCategory :data="addObj" :categoryData="categoryData" ></AddCategory>
    <EditCategory :data="editObj" ></EditCategory>
  </div>
</template>
<script>
import AddCategory from "./category_general_add";
import EditCategory from "./category_general_edit";
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  props: ["categoryData"],
  data() {
    return {
      addObj: {
        showAddCategory: false,
        id: "",
        name: "",
        isHot: "",
        level: "2",
        isRecommend: "",
        levelName: "",
        sort: "100",
        status: 1,
        avatarUrl: "",
        parentId: "",
        type: ""
      },
      editObj:{
        showEditCategory:false,
        id: "",
        name: "",
        isHot: "",
        level: "",
        isRecommend: "",
        levelName: "",
        sort: "100",
        status: 1,
        avatarUrl: "",
        parentId: "",
        type: ""
      },
      data: [
        {
          expand: true,
          //loading: false,
          //selected: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%",
                  minWidth: "200px",
                  height: "40px",
                  lineHeight: "40px"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      width: "300px",
                      fontSize: "20px",
                      color: "#2d8cf0",
                      lineHeight: "40px",
                      display: "inline-block",
                      position: "relative"
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: this.categoryData.avatarUrl
                      },
                      style: {
                        width: "30px",
                        height: "30px",
                        marginRight: "8px",
                        position: "absolute",
                        top: "6px"
                      }
                    }),
                    h(
                      "span",
                      {
                        style: {
                          marginLeft: "40px"
                        }
                      },
                      this.categoryData.name
                    )
                  ]
                ),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    // h(
                    //   "span",
                    //   {
                    //     style: {
                    //       display: "inline-block",
                    //       marginRight: "8px",
                    //       color: "gray",
                    //       fontSize: "20px"
                    //     }
                    //   },
                    //   "启用"
                    // ),
                    h(
                      "Button",
                      {
                        props: Object.assign({}, this.buttonProps, {
                          icon: "ios-plus-empty",
                          type: "success"
                        }),
                        style: {
                          marginRight: "8px"
                        },
                        on: {
                          click: () => {
                            this.addObj.showAddCategory = true;
                            this.addObj.levelName = this.categoryData.name;
                            this.addObj.levle = "2",
                            this.addObj.parentId = this.categoryData.id;
                            this.addObj.type = this.categoryData.type;
                          }
                        }
                      },
                      "新增二级分类"
                    ),
                    h(
                      "Button",
                      {
                        props: Object.assign({}, this.buttonProps, {
                          type: "primary"
                        }),
                        style: {
                          marginRight: "8px"
                        },
                        on: {
                          click: () => {
                            this.editObj.showEditCategory = true;
                            this.editObj.status = this.categoryData.status;
                            this.editObj.avatarUrl = this.categoryData.avatarUrl; 
                            this.editObj.name = this.categoryData.name;
                            this.editObj.sort = this.categoryData.sort;
                            this.editObj.isHot = this.categoryData.isHot?true:false;
                            this.editObj.isRecommend = this.categoryData.isRecommend?true:false;
                            this.editObj.level = this.categoryData.level
                            this.editObj.id = this.categoryData.id;
                          }
                        }
                      },
                      "编辑"
                    ),
                    h(
                      "Button",
                      {
                        props: Object.assign({}, this.buttonProps, {
                          icon: "ios-minus-empty",
                          type: "error",
                          disabled: true
                        }),
                        style: {
                          marginRight: "8px"
                        },
                        on: {
                          click: () => {
                            this.remove(root, node, data);
                          }
                        }
                      },
                      "删除"
                    ),
                    h(
                      "Button",
                      {
                        props: Object.assign({}, this.buttonProps, {
                          type: "info"
                        }),
                        on: {
                          click: () => {
                            //this.remove(root, node, data);
                          }
                        }
                      },
                      "捆绑标签"
                    )
                  ]
                )
              ]
            );
          },
          children:this.categoryData.childCategory 
          //   [
          //     {
          //     //   title: "child 1-2",
          //     //   expand: true,

          //     //   children: [
          //     //     {
          //     //       title: "leaf 1-2-1",
          //     //       expand: true
          //     //     },
          //     //     {
          //     //       title: "leaf 1-2-1",
          //     //       expand: true
          //     //     }
          //     //    ]
          //      }
          //   ]
        }
      ],
      buttonProps: {
        type: "ghost",
      }
    };
  },
  methods: {
    // loadData(item, callback) {
    //   setTimeout(() => {
    //     const data = this.categoryData ? this.categoryData.childCategory : [];
    //     callback(data);
    //   }, 500);
    // },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
            minWidth: "200px",
            height: "40px",
            lineHeight: "40px"
          }
        },
        [
          h(
            "span",
            {
              style: {
                width: "300px",
                fontSize: "20px",
                color: "#2d8cf0",
                lineHeight: "40px",
                display: "inline-block",
                position: "relative"
              }
            },
            [
              h("img", {
                attrs: {
                  src: data.avatarUrl
                },
                style: {
                  width: "30px",
                  height: "30px",
                  marginRight: "8px",
                  position: "absolute",
                  top: "6px"
                }
              }),
              h(
                "span",
                {
                  style: {
                    marginLeft: "40px"
                  }
                },
                data.name
              )
            ]
          ),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              // h(
              //   "span",
              //   {
              //     style: {
              //       display: "inline-block",
              //       marginRight: "8px",
              //       color: "gray",
              //       fontSize: "20px"
              //     }
              //   },
              //   "启用"
              // ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-plus-empty",
                    type: "success",
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      let obj
                      for (
                        let x = 0;
                        x < this.categoryData.length;
                        x++
                      ) {
                        if (
                          data.nodeKey == this.categoryData[x].nodeKey
                        ) {
                          obj = this.categoryData[x];
                        }
                      }

                      if(!obj)
                      {
                          for(let x = 0;
                        x < this.categoryData.childCategory.length;
                        x++){
                            if(data.nodeKey == this.categoryData.childCategory[x].nodeKey)
                            {
                              obj = this.categoryData.childCategory[x]
                            }
                        }
                      }
                      this.addObj.showAddCategory = true;
                      this.addObj.type = this.categoryData.type
                      this.addObj.level = "3"
                      this.addObj.levelName = obj.name;
                      this.addObj.parentId = obj.id
                      
                    }
                  }
                },
                "新增三级分类"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    type: "primary"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      let obj
                      for (
                        let x = 0;
                        x < this.categoryData.length;
                        x++
                      ) {
                        if (
                          data.nodeKey == this.categoryData[x].nodeKey
                        ) {
                          obj = this.categoryData[x];
                        }
                      }
                      if(!obj)
                      {
                          for(let x = 0;
                        x < this.categoryData.childCategory.length;
                        x++){
                            if(data.nodeKey == this.categoryData.childCategory[x].nodeKey)
                            {
                              obj = this.categoryData.childCategory[x]
                            }
                        }
                      }

                      this.editObj.avatarUrl = obj.avatarUrl;
                      this.editObj.status = obj.status; 
                      this.editObj.name = obj.name;
                      this.editObj.sort = obj.sort;
                      this.editObj.isHot = obj.isHot?true:false;
                      this.editObj.isRecommend = obj.isRecommend?true:false;
                      this.editObj.level = obj.level
                      this.editObj.id = obj.id;
                      this.editObj.type = obj.type
                      this.editObj.showEditCategory = true;
                     
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-minus-empty",
                    type: "error"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    type: "info"
                  }),
                  on: {
                    click: () => {
                      //this.remove(root, node, data);
                    }
                  }
                },
                "捆绑标签"
              )
            ]
          )
        ]
      );
    },
    remove(root, node, data) {
      if (data.id) {
        let formData = {
          categoryId: data.id
        };
        Util.ajax({
          method: "post",
          url: baseUri.category_delete_url,
          data: Util.formData(formData)
        })
          .then(res => {
            if (res.data.success) {
              const parentKey = root.find(el => el === node).parent;
              const parent = root.find(el => el.nodeKey === parentKey).node;
              const index = parent.children.indexOf(data);
              parent.children.splice(index, 1);
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败，请联系管理员");
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
        this.$Message.success("删除成功");
      }
    }
  },
  components: {
    AddCategory,
    EditCategory
  }
};
</script>
<style>

</style>
