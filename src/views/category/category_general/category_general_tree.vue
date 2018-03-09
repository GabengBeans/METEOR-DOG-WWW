<template>
    <div>
        <Tree :data="data" show-checkbox multiple :load-data="loadData" :render="renderContent"></Tree>
        <AddCategory :show="showAddCategory"></AddCategory>
    </div>
</template>
<script>
import AddCategory from "./category_general_add";
export default {
  props: ["categoryData"],
  data() {
    return {
      showAddCategory: false,
      data: [
        {
          expand: false,
          loading: false,
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
                    h("img", {
                      attrs: {
                        src: this.categoryData ? this.categoryData.url : ""
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
                      this.categoryData ? this.categoryData.name : ""
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
                    h(
                      "span",
                      {
                        style: {
                          display: "inline-block",
                          marginRight: "8px",
                          color: "gray",
                          fontSize: "20px"
                        }
                      },
                      "启用"
                    ),
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
                            this.showAddCategory = true
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
                            //this.remove(root, node, data);
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
          children: []
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
        size: "small"
      }
    };
  },
  methods: {
    loadData(item, callback) {
      setTimeout(() => {
        const data = this.categoryData ? this.categoryData.childCategory : [];
        callback(data);
      }, 500);
    },
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
                  src: data.url
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
                data.title
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
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    marginRight: "8px",
                    color: "gray",
                    fontSize: "20px"
                  }
                },
                "启用"
              ),
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
                      console.log(node.nodeKey);
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
                      //this.remove(root, node, data);
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
    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    }
  },
  components:{
      AddCategory
  }
};
</script>
<style>

</style>
