<template>
  <div>
    <Tree :data="data"  :render="renderContent"></Tree>
    <AddCategory :data="addObj" :categoryData="categoryData" ></AddCategory>
    <EditCategory :data="editObj" ></EditCategory>
    <template v-if="allBuyTags.allLabels && allSellTags.allLabels">
    <BindTags :data="bindTags" :buyDataTags="allBuyTags" :sellDataTags="allSellTags"></BindTags>
    </template>
  </div>
</template>
<script>
import AddCategory from "./category_general_add";
import EditCategory from "./category_general_edit";
import BindTags from "./category_bind_tags"
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
        type: "",
        title:""
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
        type: "",
        homesort:""
      },
      bindTags:{
        showBindTags:false,
        id:''
      },
      allBuyTags:{},
      allSellTags:{},
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
                  display: "inline-flex",
                  width: "100%",
                  minWidth: "200px",
                  height: "40px",
                  lineHeight: "40px",
                  justifyContent:'space-between',
                  alignItems:'center'
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
                            this.addObj.title = "新增二级分类"
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
                            this.editObj.isPush = this.categoryData.isPush?true:false
                            this.editObj.isRecommend = this.categoryData.isRecommend?true:false;
                            this.editObj.level = this.categoryData.level
                            this.editObj.id = this.categoryData.id;
                            this.editObj.avatarUrl = this.categoryData.avatarUrl
                            this.editObj.title = "编辑一级类目"
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
                            this.allBuyTags={}
                            this.allSellTags={}
                            this.$Message.loading({
                              content:"请求中...",
                              duration:0
                            })
                            let This = this
                            function getBuyTags(){
                              return Util.ajax({
                                method:"get",
                                url:baseUri.search_bind_label_list,
                                params:{
                                  lableType:1,
                                  categoryId:This.categoryData.id
                                }
                              })
                            }
                            function getSellTags(){
                              return Util.ajax({
                                method:"get",
                                url:baseUri.search_bind_label_list,
                                params:{
                                  lableType:2,
                                  categoryId:This.categoryData.id
                                }
                              })
                            }
                            axios.all([getBuyTags(),getSellTags()])
                            .then(axios.spread((resBuy,resSell)=>{
                              if(resBuy.data.success && resSell.data.success)
                              {
                                // console.log(resBuy)
                                // console.log(resSell)
                                let levelNameBuy = []
                                for (let x = 0; x < resBuy.data.data.length; x++) {
                                    let obj = {}
                                    obj.name = resBuy.data.data[x].name
                                    obj.id = resBuy.data.data[x].id
                                    levelNameBuy.push(obj)
                                }
                                Util.recursion(resBuy.data.data, "childLableVos")
                                this.$set(this.allBuyTags, "allLabels", resBuy.data.data)
                                console.log(this.allBuyTags.allLabels)
                                for(let x=0;x<this.allBuyTags.allLabels.length;x++)
                                {
                                  for(let y=0;y<this.allBuyTags.allLabels[x].children.length;y++)
                                  {
                                    if(this.allBuyTags.allLabels[x].children[y].isBind)
                                    {
                                      this.$set(this.allBuyTags.allLabels[x].children[y],"checked",true)
                                    }else{
                                      this.$set(this.allBuyTags.allLabels[x].children[y],"checked",false)
                                    }
                                  }
                                }
                                this.$set(this.allBuyTags, "tabName", "买家")
                                this.$set(this.allBuyTags, "levelName", levelNameBuy)
                                this.$set(this.allBuyTags, "labelType", "1")

                                let levelNameSell = []
                                for (let x = 0; x < resSell.data.data.length; x++) {
                                    let obj = {}
                                    obj.name = resSell.data.data[x].name
                                    obj.id = resSell.data.data[x].id
                                    levelNameSell.push(obj)
                                }
                                Util.recursion(resSell.data.data, "childLableVos")
                                this.$set(this.allSellTags, "allLabels", resSell.data.data)
                                for(let x=0;x<this.allSellTags.allLabels.length;x++)
                                {
                                  for(let y=0;y<this.allSellTags.allLabels[x].children.length;y++)
                                  {
                                    if(this.allSellTags.allLabels[x].children[y].isBind)
                                    {
                                      this.$set(this.allSellTags.allLabels[x].children[y],"checked",true)
                                    }else{
                                      this.$set(this.allSellTags.allLabels[x].children[y],"checked",false)
                                    }
                                  }
                                }
                                this.$set(this.allSellTags, "tabName", "卖家")
                                this.$set(this.allSellTags, "levelName", levelNameSell)
                                this.$set(this.allSellTags, "labelType", "2") 
                                console.log(this.allSellTags.allLabels)
                                this.bindTags.showBindTags= true
                                this.bindTags.id = this.categoryData.id
                                this.$Message.destroy()                             
                              }else{
                                this.$Message.destroy();
                                this.$Message.error("请求失败")
                              }
                            }))
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
            display: "inline-flex",
            width: "100%",
            minWidth: "200px",
            height: "40px",
            lineHeight: "40px",
            justifyContent:'space-between',
            alignItems:'center'
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
                    disabled:data.level<3?false:true
                  }),
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.addObj.showAddCategory = true;
                      this.addObj.type = data.type
                      this.addObj.level = "3"
                      this.addObj.levelName = data.name;
                      this.addObj.parentId = data.id
                      this.addObj.title = "新增三级分类"
                      
                    }
                  }
                },
                data.level<3?"新增三级分类":'新增四级分类'
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
                      
                      //console.log(obj)
                      this.editObj.avatarUrl = data.avatarUrl;
                      this.editObj.status = data.status; 
                      this.editObj.name = data.name;
                      this.editObj.sort = data.sort;
                      this.editObj.isHot = data.isHot?true:false;
                      this.editObj.isPush = data.isPush?true:false
                      this.editObj.isRecommend = data.isRecommend?true:false;
                      this.editObj.level = data.level
                      this.editObj.id = data.id;
                      this.editObj.type = data.type
                      this.editObj.showEditCategory = true;
                      this.editObj.homesort = data.homesort
                      this.editObj.title = "编辑二级类目"
                     
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
                      this.allBuyTags={}
                      this.allSellTags={}
                     this.$Message.loading({
                              content:"请求中...",
                              duration:0
                            })
                            let This = this
                            function getBuyTags(){
                              return Util.ajax({
                                method:"get",
                                url:baseUri.search_bind_label_list,
                                params:{
                                  lableType:1,
                                  categoryId:data.id
                                }
                              })
                            }
                            function getSellTags(){
                              return Util.ajax({
                                method:"get",
                                url:baseUri.search_bind_label_list,
                                params:{
                                  lableType:2,
                                  categoryId:data.id
                                }
                              })
                            }
                            axios.all([getBuyTags(),getSellTags()])
                            .then(axios.spread((resBuy,resSell)=>{
                              if(resBuy.data.success && resSell.data.success)
                              {
                                // console.log(resBuy)
                                // console.log(resSell)
                                let levelNameBuy = []
                                for (let x = 0; x < resBuy.data.data.length; x++) {
                                    let obj = {}
                                    obj.name = resBuy.data.data[x].name
                                    obj.id = resBuy.data.data[x].id
                                    levelNameBuy.push(obj)
                                }
                                Util.recursion(resBuy.data.data, "childLableVos")
                                this.$set(this.allBuyTags, "allLabels", resBuy.data.data)
                                for(let x=0;x<this.allBuyTags.allLabels.length;x++)
                                {
                                  for(let y=0;y<this.allBuyTags.allLabels[x].children.length;y++)
                                  {
                                    if(this.allBuyTags.allLabels[x].children[y].isBind)
                                    {
                                      this.$set(this.allBuyTags.allLabels[x].children[y],"checked",true)
                                    }else{
                                      this.$set(this.allBuyTags.allLabels[x].children[y],"checked",false)
                                    }
                                  }
                                }
                                this.$set(this.allBuyTags, "tabName", "买家")
                                this.$set(this.allBuyTags, "levelName", levelNameBuy)
                                this.$set(this.allBuyTags, "labelType", "1")

                                let levelNameSell = []
                                for (let x = 0; x < resSell.data.data.length; x++) {
                                    let obj = {}
                                    obj.name = resSell.data.data[x].name
                                    obj.id = resSell.data.data[x].id
                                    levelNameSell.push(obj)
                                }
                                Util.recursion(resSell.data.data, "childLableVos")
                                this.$set(this.allSellTags, "allLabels", resSell.data.data)
                                for(let x=0;x<this.allSellTags.allLabels.length;x++)
                                {
                                  for(let y=0;y<this.allSellTags.allLabels[x].children.length;y++)
                                  {
                                    if(this.allSellTags.allLabels[x].children[y].isBind)
                                    {
                                      this.$set(this.allSellTags.allLabels[x].children[y],"checked",true)
                                    }else{
                                      this.$set(this.allSellTags.allLabels[x].children[y],"checked",false)
                                    }
                                  }
                                }
                                this.$set(this.allSellTags, "tabName", "卖家")
                                this.$set(this.allSellTags, "levelName", levelNameSell)
                                this.$set(this.allSellTags, "labelType", "2") 
                                  //console.log(this.allBuyTags.allLabels.length)
                                this.bindTags.showBindTags= true
                                this.bindTags.id = data.id
                                this.$Message.destroy()                             
                              }else{
                                this.$Message.destroy();
                                this.$Message.error("请求失败")
                              }
                            }))
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
    EditCategory,
    BindTags
  }
};
</script>
<style>

</style>
