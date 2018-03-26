<template>
  <div id='user_table'>
      <Table @on-select="select" @on-select-all="selectAll" highlight-row style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.expand_charge_search_result">
      </Table>
      <br>
      <div class="btns">
        <i-button class="btn" type="primary" @click="batchPass()">批量通过</i-button>
        <i-button class="btn" type="primary" @click="batchNotPass()">批量不通过</i-button>      
      </div>
      <Modal v-model="showModal" title="提示" @on-ok="reviewFail()">
        <p>请输入不通过原因</p>
        <Input v-model="remarks" type="textarea" />
      </Modal>
  </div>
   
</template>
<style>
  .btns{
    margin: 15px 30px;
  }
  .btns .btn{
    margin-right: 10px;
  }
</style>
<script>
import Util from '@/libs/util'
import baseUri from '@/libs/base_uri'
import Cookies from "js-cookie"
export default {
  name: "user_table",

  data() {
    return {
      remarks: '',
      showModal: false,
      activeId: '',
      businessStatus: '',
      ids: [],//批量选择id
      columns: [
        {
          width: 60,
          align: 'center',
          type: 'selection'
        },
        {
          title: "订单号",
          key: "balanceOrderNo"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "代理人姓名",
          key: "extendUsername"
        },
        {
          title: "交易日期",
          key: "accountDay"
        },
        {
          title: "交易笔数",
          key: "tradeCount"
        },
        {
          title: "交易金额(元)",
          key: "tradeAmount"
        },
        {
          title: "平台服务费(元)",
          key: "platformServiceCharge"
        },
        {
          title: "佣金返点",
          key: "reate"
        },
        {
          title: "结算佣金(元)",
          key: "balanceAmount"
        },
        {
          title: "结算状态",
          key: "balanceStatus"
        },
        {
          title: "结算时间",
          key: "balanceTime"
        },
        {
          title: "操作",
          key: "phone",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        this.$router.push("/expand-charge-detail/"+params.row.id)
                    }
                  }
                },
                "查看"
              ),
               h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled:params.row.balanceStatus == "已结算" ? true : false                    
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: '确定结算？',
                        okText: "确定",
                        cancelText: "取消",
                        onOk: () => {
                          let id = params.row.id;
                          let data = {
                              id: id,
                              businessStatus: 1,
                              remarks: ''
                          }
                          Util.ajax({
                            method:"post",
                            url:baseUri.brokerage_balance_audit_url,
                            data: Util.formData(data),
                          }).then((res) => {
                            if (res.data.success) {
                              this.$Message.success("结算成功！");
                              params.row.balanceStatus = "已结算"
                            } else {
                              this.$Message.success("结算失败！");
                            }
                          })
                        }
                      })
                    }
                  }
                },
                "已结算"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled:params.row.balanceStatus == "待结算" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showModal = true;
                      this.activeId = params.row.id;
                      params.row.balanceStatus = this.businessStatus;
                    }
                  }
                },
                "未结算"
              ),
            ]);
          }
        }
      ]
    };
  },
  methods:{
    reviewFail() {
      if (this.remarks == "") {
        this.$Message.error("不通过原因不能为空!");
        return false;
      }else{
        let data = {
          id: this.activeId,
          businessStatus: 2,
          remarks: this.remarks
        };
        Util.ajax({
          method:"post",
          url:baseUri.brokerage_balance_audit_url,
          data: Util.formData(data),
        }).then((res) => {
          if (res.data.success) {
            this.$Message.success('审核成功！');
            this.businessStatus = "待结算"
          } else {
            this.$Message.error(res.data.msg);
          }
        })
      }
    },
    select(selection,row) {
      //console.log(row.balanceOrderNo)
      this.ids.push(row.balanceOrderNo)
      //console.log(this.ids)
    },
    selectAll(selection) {
      for(let x in selection) {
        this.ids.push(selection[x].balanceOrderNo)
      }
    },
    batchPass() {
      this.$Modal.confirm({
        title: "提示",
        content: '批量通过所选数据吗？',
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          let arr = this.ids;
          let ids = [...new Set(arr)];
          Util.ajax({
            method: 'POST',
            url: baseUri.brokerage_balance_batch_update_order,
            data:{
              businessType:1,
              ids: ids
            }
          }).then(res => {
            //console.log(res)
            if(res.data.success){
              this.$Message.success("批量审核成功！");
            }else {
              this.$Message.error('批量审核失败！');
            }
          })
        }
      })
    },
    batchNotPass() {
      this.$Modal.confirm({
        title: "提示",
        content: '批量不通过所选数据吗？',
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          let arr = this.ids;
          let ids = [...new Set(arr)];
          Util.ajax({
            method: 'POST',
            url: baseUri.brokerage_balance_batch_update_order,
            data:{
              businessType:2,
              ids: ids
            }
          }).then(res => {
            if(res.data.success){
              this.$Message.success("批量审核成功！");
            }else {
              this.$Message.error('批量审核失败！');
            }
          })
        }
      })
    },
  }
};
</script>
