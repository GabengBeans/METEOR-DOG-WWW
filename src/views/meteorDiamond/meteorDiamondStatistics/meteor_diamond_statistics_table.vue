<template>
  <div id='user_table' class="table">
    <div class="statistics_class">
      <span>平台总发行流星钻:
        <span style="font-weight:800">{{$store.state.app.statistics_info.totalCount}}克拉</span>
      </span>
      <span>当前已发放流星钻:
        <span style="font-weight:800">{{$store.state.app.statistics_info.alreadyGrant}}克拉</span>
      </span>
      <span>当前剩余流星钻:
        <span style="font-weight:800">{{$store.state.app.statistics_info.remainingCount}}克拉</span>
      </span>
    </div>
    <Table style="margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.statistics_search_result">
    </Table>
    <Modal v-model="deductionMeteorDiamondModal" width="360">
      <p slot="header" style="text-align:center">
        <span>扣除流星钻</span>
      </p>
      <div>
        <Form>
          <FormItem label="扣除流星钻" :label-width="80">
            <Input clearable v-model="deductionCount" />
          </FormItem>
          <FormItem label="备注原因" :label-width="80">
            <Input clearable type="textarea" v-model="deductionDesc" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" @click="cancelDeduction">取消</Button>
        <Button type="success" @click="deductionFun">确定</Button>
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
      deductionMeteorDiamondModal: false,
      deductionId: "",
      deductionCount: "",
      deductionDesc: "",
      columns: [
        {
          title: "用户ID",
          key: "userId",
          align: "center",
          width: 160
        },
        {
          title: "IP昵称",
          key: "nickname",
          align: "center",
          width: 200
        },
        {
          title: "今日获取(克拉)",
          key: "currentCount",
          align: "center",
          width: 160
        },
        {
          title: "累计获取(克拉)",
          key: "accumulateCount",
          align: "center",
          width: 160
        },
        {
          title: "当前剩余(克拉)",
          key: "availableCount",
          align: "center",
          width: 160
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
                      this.$router.push(
                        "/meteor_diamond_budget_detail_index/" +
                          params.row.userId
                      );
                    }
                  }
                },
                "查看收支"
              ),
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
                    click: () => {
                      this.deductionId = params.row.id;
                      this.deductionMeteorDiamondModal = true;
                    }
                  }
                },
                "扣除流星钻"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    init() {
      this.deductionId = "";
      this.deductionCount = "";
      this.deductionDesc = "";
    },
    cancelDeduction() {
      this.init();
      this.deductionMeteorDiamondModal = false;
    },
    deductionFun() {
      if (!this.deductionCount || !this.deductionDesc) {
        this.$Message.error("请补全信息");
        return;
      }
      let params = {
        userId: this.deductionId,
        ruleType: 8,
        meteorDiamond: this.deductionCount,
        refuseReason: this.deductionDesc
      };
      util
        .ajax({
          method: "post",
          url: base_uri.deduction_meteor_diamond_url,
          params: params
        })
        .then(resp => {
          if (resp.data.success) {
            this.$store.commit("GET_STATISTICS_LIST", {
              data: this.$store.state.app.statistics_search_info,
              pageNo: this.$store.state.app.statistics_public_page
            });
            this.init()
            this.deductionMeteorDiamondModal=false
            this.$Message.success("扣除成功")
          }else{
            this.$Message.error("扣除失败")
          }
        }).catch(error=>{
          console.log(error)
        })
    }
  }
};
</script>
<style>
.statistics_class {
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
}
</style>
