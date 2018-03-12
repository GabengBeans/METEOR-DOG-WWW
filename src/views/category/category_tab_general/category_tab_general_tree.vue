<template>
  <div>
    <Tree :data="data" multiple :load-data="loadData" :render="renderContent"></Tree>
    <AddCategoryTab :data="addObj" :categoryData="categoryData" ></AddCategoryTab>
    <!-- <EditCategory :data="editObj" :categoryData="categoryData" ></EditCategory> -->
  </div>
</template>
<script>
import AddCategoryTab from "./category_tab_general_add";
// import EditCategory from "./category_general_edit";
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  props: ["categoryData"],
  data() {
    return {
      addObj: {
        showAddCategory: false,
        labelType:"",
        name:"",
        level:"2",
        levelName:"",
        status:1,
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
                    h(
                      "span",
                      {
                        style: {
                          marginLeft: "8px"
                        }
                      },
                      this.categoryData?this.categoryData.tabName:""
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
                            this.addObj.showAddCategory = true;
                            this.addObj.labelType = this.categoryData.labelType
                            this.addObj.leve = "2",
                            this.addObj.name = this.categoryData.name,
                            this.addObj.levelName = this.categoryData.levelName
                          }
                        }
                      },
                      "新增二级标签"
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
                    )
                  ]
                )
              ]
            );
          },
          children: []
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
        const data = this.categoryData ? this.categoryData.allLabels : [];
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
                    type: "primary"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      let subObj = {}
                      for(let x = 0;x<this.categoryData.childCategory.length;x++)
                      {
                        if(data.nodeKey==this.categoryData.childCategory[x].nodeKey)
                        {
                          subObj = this.categoryData.childCategory[x]
                        }
                      }
                      //Object.assign(this.editObj,subObj);
                      console.log(subObj)
                    
                      this.editObj.avatarUrl = subObj.avatarUrl;
                       console.log(this.editObj.avatarUrl)
                      this.editObj.status = subObj.status; 
                      this.editObj.name = subObj.title;
                      this.editObj.sort = subObj.sort;
                      this.editObj.isHot = subObj.isHot?true:false;
                      this.editObj.isRecommend = subObj.isRecommend?true:false;
                      this.editObj.level = subObj.level
                      this.editObj.id = subObj.id;
                      this.editObj.type = subObj.type
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
              )
            ]
          )
        ]
      );
    },
    append(obj, subData) {
        let _obj = {}
        for(let x = 0;x<this.categoryData.allLabels.length;x++)
        {
            if(obj == this.categoryData.allLabels[x].id)
            {
                _obj = this.categoryData.allLabels[x]
            }
        }
      const children = _obj.childLableVos || [];
      children.push({
        name: subData,
        expand: true
      });
      this.$set(this.data, "children", children);
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
    AddCategoryTab,
    // EditCategory
  }
};
</script>
<style>

</style>
