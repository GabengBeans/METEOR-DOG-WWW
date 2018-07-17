<template>
  <div class="table">
    <div style="font-size:18px;font-weight:800;margin-left:16px;">流星钻发放规则</div>
    <br>
    <Table style="margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.meteor_diamond_set_result">
    </Table>
    <Modal v-model="auditModal" width="360">
      <p slot="header" style="text-align:center">
        <span>修改</span>
      </p>
      <div style="text-align:center">
        <Form>
          <FromItem>
            <Input clearable v-model="auditData.diamondCount" style="width:50%" />　克拉
          </FromItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" @click="auditModal=false">取消</Button>
        <Button type="success" @click="saveAudit">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
export default {
  data() {
    return {
      auditModal: false,
      auditData: {
        diamondCount: "",
        id: ""
      },
      columns: [
        {
          title: "用户行为",
          key: "des",
          align: "center"
        },
        {
          title: "发放流星钻(克拉)",
          key: "diamondCount",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                    click: () => {
                      this.auditData.diamondCount = params.row.diamondCount;
                      this.auditData.id = params.row.id;
                      this.auditModal = true;
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    saveAudit() {
      util
        .ajax({
          method: "post",
          url: base_uri.audit_meteor_diamond_set_url,
          data: {
            id: this.auditData.id,
            diamondCount: this.auditData.diamondCount
          }
        })
        .then(resp => {
          if (resp.data.success) {
            this.$Message.success("修改成功")
            this.$store.commit("GET_METEOR_DIAMOND_SET_LIST");
            this.auditModal=false
          }else{
            this.$Message.error("修改失败")
          }
        });
    }
  },
  created() {
    this.$store.commit("GET_METEOR_DIAMOND_SET_LIST");
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>
