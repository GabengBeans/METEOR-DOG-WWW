<template>
    <div>
        <Tree :data="trees" show-checkbox multiple :render="renderContent"></Tree>

    </div>
</template>
<script>
import Util from "@/libs/util";
export default {
  props: ["trees"],
  data() {
    return {
    };
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
            width:"1vw"
          }
        },
        [
          h("span", [
            h("span", data.name)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
              }
            },
          )
        ]
      );
    }
  }
};
</script>
<style>

</style>
