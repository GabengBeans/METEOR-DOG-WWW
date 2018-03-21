<template>
    <div>
        <Tree :data="$store.state.app.admin_resource_search_result" :render="renderContent"></Tree>
    </div>
</template>
<script>
import Util from "@/libs/util";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.commit("GET_SEARCH_ADIMIN_RESOURCE_INFO");
  },
  //   computed: {
  //     tree() {
  //       Util.recursion(this.trees, "childAdminResources");
  //       console.log(this.trees)
  //       return this.trees;
  //     }
  //   },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "1vw"
          }
        },
        [
          h("span", [h("span", data.name)]),
          h("span", {
            style: {
              display: "inline-block",
              float: "right",
              marginRight: "32px"
            }
          }),
          h("Button", {
            props: Object.assign({}, this.buttonProps, {
              icon: "ios-plus-empty"
            }),
            style: {
              marginRight: "8px"
            },
            on: {
              click: () => {
                this.append(data);
              }
            }
          }),
          h("Button", {
            props: Object.assign({}, this.buttonProps, {
              icon: "ios-minus-empty"
            }),
            on: {
              click: () => {
                this.remove(root, node, data);
              }
            }
          })
        ]
      );
    }
  }
};
</script>
<style>

</style>
