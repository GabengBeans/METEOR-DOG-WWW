<template>
    <div>
        <Tree :data="data" :render="renderContent"></Tree>
        <AddCategoryTab :data="addObj" :categoryData="categoryData"></AddCategoryTab>
        <EditCategoryTab :data="editObj" :categoryData="categoryData"></EditCategoryTab>
    </div>
</template>
<script>
import AddCategoryTab from "./category_tab_general_add";
import EditCategoryTab from "./category_tab_general_edit";
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  props: ["categoryData"],
  data() {
    return {
      addObj: {
        showAddCategory: false,
        labelType: "",
        name: "",
        level: "2",
        levelName: "",
        status: 1
      },
      editObj: {
        showEditCategory: false,
        name: "",
        status: 1
      },
      data: [
        {
          expand: true,
          selected: true,
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
                    h(
                      "span",
                      {
                        style: {
                          marginLeft: "8px"
                        }
                      },
                      this.categoryData ? this.categoryData.tabName : ""
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
                            this.addObj.labelType = this.categoryData.labelType;
                            (this.addObj.leve = "2"),
                              (this.addObj.name = this.categoryData.name),
                              (this.addObj.levelName = this.categoryData.levelName);
                          }
                        }
                      },
                      "新增二级标签"
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
                    )
                  ]
                )
              ]
            );
          },
          children: this.categoryData.allLabels
        }
      ],
      buttonProps: {
        type: "ghost",
      }
    };
  },
  methods: {
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
              h(
                "span",
                {
                  style: {
                    marginLeft: "8px"
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
                    type: "primary"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      //console.log(obj);
                      this.editObj.showEditCategory = true;
                      this.editObj.name = data.name;
                      this.editObj.status = data.status;
                      this.editObj.id = data.id;
                      this.editObj.parentId = data.parentId
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
              )
            ]
          )
        ]
      );
    },
    remove(root, node, data) {
      if (data.id) {
        let formData = {
          labelId: data.id
        };
        Util.ajax({
          method: "post",
          url: baseUri.label_delete_label_url,
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
    AddCategoryTab,
    EditCategoryTab
  }
};
</script>
<style>

</style>
