<template>
    <div >
        <template v-if="categoryData.childCategory.length>0">
            {{categoryData.childCategory}}
        <Tree :data="data" show-checkbox multiple :render="renderContent"></Tree>
        </template>
    </div>
</template>
<script>
export default {
  props: ["categoryData"],
  data() {
    return {
        arr:[],
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
                  height: "40px",
                  lineHeight: "40px"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      height: "20px",
                      fontSize: "20px",
                      color: "#2d8cf0",
                      lineHeight: "40px"
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: this.categoryData?this.categoryData.url:''
                      },
                      style: {
                        width: "30px",
                        height: "30px",
                        marginRight: "8px"
                      }
                    }),
                    h(
                      "span",
                      {
                        style: {
                          lineHeight: "40px"
                        }
                      },
                      this.categoryData?this.categoryData.name:''
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
                            this.append(data);
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
          children: this.categoryData?this.categoryData.childCategory:[]
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
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h(
            "span",
            {
              style: {
                fontSize: "20px",
                color: "blue"
              }
            },
            [
              h("Icon", {
                props: {
                  type: "ios-paper-outline"
                },
                style: {
                  marginRight: "8px"
                }
              }),
              h("span", data.title)
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
                      this.append(data);
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
  }
};
</script>
