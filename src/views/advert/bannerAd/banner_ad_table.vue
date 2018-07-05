<template>
    <div class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.user_search_result">
        </Table>
    </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      showAbilityModal: true,
      columns: [
        {
          title: "序号",
          key: "id",
          width: 100,
          align: "center"
        },
        {
          title: "类型",
          key: "phone",
          width: 100,
          align: "center"
        },
        {
          title: "详细",
          key: "nickname",
          render: (h, params) => {
            return h("div", [
              h("p", "标题"),
              h("br"),
              h(
                "p",
                { style: { fontWeight: "800" } },
                "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
              )
            ]);
          }
        },
        {
          title: "展示图片",
          key: "realname",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  padding: "10px",
                  fontSize: 0
                }
              },
              [
                h("img", {
                  attrs: {
                    src:
                      "http://p2.gexing.com/G1/M00/83/2C/rBACFFIPLQfAvhLYAAb9ImF6juw834.jpg"
                  },
                  style: {
                    width: "100%",
                    height: "120px"
                  },
                  on: {
                    click: () => {}
                  }
                })
              ]
            );
          }
        },
        {
          title: "状态",
          key: "status",
          width: 100
        },
        {
          title: "操作",
          key: "phone",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                // style:{
                //     display:"flex",
                //     justifyContent:"space-around"
                //}
              },
              [
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
                      click: () => {}
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "下线"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "移除"
                )
              ]
            );
          }
        }
      ]
    };
  },
  methods: {
    updataUserAbility() {}
  }
};
</script>
