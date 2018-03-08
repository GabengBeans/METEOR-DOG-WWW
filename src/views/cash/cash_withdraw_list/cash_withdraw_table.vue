<template>
    <div id='user_table'>
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="cashWithDrawTableColumns" :data="$store.state.app.cash_withdraw_search_result">
        </Table>
        <Modal v-model="showDrawOk" @on-ok="handleOk" >
            <div style="font-size:20px;text-align:center">
                <b>确认申请提现？</b>
            </div>
        </Modal>
        <Modal v-model="showDrawCancel" @on-ok="handleCancel">
            <div style="font-size:20px;text-align:center">
                <b>确认申请驳回？</b>
            </div>
        </Modal>
    </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  name: "user_table",
  data() {
    return {
      withdrawId: Number,
      showDrawOk: false,
      showDrawCancel: false,
      cashWithDrawTableColumns: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "提现金额",
          key: "amount"
        },
        {
          title: "操作时间",
          key: "createTime"
        },
        {
          title: "申请状态",
          key: "applyStatus"
        },
        {
          title: "操作",
          key: "id",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: params.row.applyStatus == "申请中" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.withdrawId = params.row.id;
                      this.showDrawOk = true;
                    }
                  }
                },
                "审核通过"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: params.row.applyStatus == "申请中" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.withdrawId = params.row.id;
                      this.showDrawCancel = true;
                    }
                  }
                },
                "审核驳回"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    handleOk() {
      let data ={
        withdrawId: this.withdrawId,
          applyStatus: 1,
          refuseReason: ""
      }
      Util.ajax({
        method: "post",
        url: baseUri.cash_withdraw_audit_url,
        data:Util.formData(data)
      }).then(res => {
        if (res.data.data == "SUCCESS") {
          this.$Message.success("审核通过成功！");
          let arr = this.$store.state.app.cash_withdraw_search_result;
          for(let i=0;i<arr.length;i++)
          {
              if(arr[i].id == this.withdrawId)
              {
                  arr[i].applyStatus = "审核通过"
              }
          }
        }
      });
    },
    handleCancel() {
      let data = {
         withdrawId: this.withdrawId,
          applyStatus: 2,
          refuseReason: ""
      }
      Util.ajax({
        method: "post",
        url: baseUri.cash_withdraw_audit_url,
        data:Util.formData(data)
      }).then(res => {
        if (res.data.data == "SUCCESS") {
          this.$Message.error("审核驳回成功！");
          let arr = this.$store.state.app.cash_withdraw_search_result;
          for(let i=0;i<arr.length;i++)
          {
              if(arr[i].id == this.withdrawId)
              {
                  arr[i].applyStatus = "审核驳回"
              }
          }
        }
      });
    }
  }
};
</script>
