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
    </div>

</template>
<script>
export default {
  data() {
    return {
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
                        this.$router.push("/meteor_diamond/meteor_diamond_budget_detail_index/?userId=" + params.row.userId);
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
                    click: () => {}
                  }
                },
                "扣除流星钻"
              )
            ]);
          }
        }
      ]
    };
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
