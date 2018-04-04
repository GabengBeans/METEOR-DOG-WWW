<template>
  <div>
    <Modal v-model="data.showBindTags" title="捆绑标签" width="500" @on-ok="saveTags()" >
      <Card class="card_class_tags">
      <Tree ref="buyTree" :data="buyData" :render="renderContent" show-checkbox multiple></Tree>
      </Card>
      <Card class="card_class_tags">
      <Tree ref="sellTree" :data="sellData" :render="renderContent" show-checkbox multiple></Tree>
      </Card>
    </Modal>
  </div>
</template>
<script>
import Util from "@/libs/util"
import baseUri from "@/libs/base_uri"
export default {
  props: ["data", "buyDataTags", "sellDataTags"],
  data() {
    return {
      buyData: [
        {
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
                      this.buyDataTags.tabName
                    )
                  ]
                ),
                h("span", {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "32px"
                  }
                })
              ]
            );
          },
          children: this.buyDataTags.allLabels
        }
      ],
      sellData: [
        {
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
                     this.sellDataTags.tabName
                    )
                  ]
                ),
                h("span", {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "32px"
                  }
                })
              ]
            );
          },
          children: this.sellDataTags.allLabels
        }
      ]
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
          h("span", {
            style: {
              display: "inline-block",
              float: "right",
              marginRight: "32px"
            }
          })
        ]
      );
    },
    saveTags(){
      // console.log(this.data.id)
      // console.log(this.$refs.buyTree.getCheckedNodes())
      // console.log(this.$refs.sellTree.getCheckedNodes())
      this.$Message.loading({
                              content:"请求中...",
                              duration:0
                            })
      let tagIdArr=[]
      let buyTreeObj = this.$refs.buyTree.getCheckedNodes()
      let sellTreeObj =this.$refs.sellTree.getCheckedNodes()
      for(let x=0;x<buyTreeObj.length;x++)
      {
        if(buyTreeObj[x].id)
        {
          tagIdArr.push(buyTreeObj[x].id)
        }
      }
      for(let x=0;x<sellTreeObj.length;x++)
      {
        if(sellTreeObj[x].id)
        {
          tagIdArr.push(sellTreeObj[x].id)
        }
      }
      //console.log(tagIdArr)
      Util.ajax({
        method:"post",
        url:baseUri.categorys_bind_lable_url,
        data:{
          id:this.data.id,
          listLableId:tagIdArr
        }
      }).then(res=>{
        if(res.data.success)
        {
          this.$Message.destroy()
          this.$Message.success("绑定成功！")
        }else{
          this.$Message.destroy()
          this.$Message.error("绑定失败")
        }
      }).catch(error=>{
        console.log(error)
      })
    }
  }
};
</script>
<style>
.card_class_tags {
  min-width: 10vw;
  margin: 1vw;
  min-width: 200px;
}
</style>
