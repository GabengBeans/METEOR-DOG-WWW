<template>
  <div id='user_table'>
      <Table @on-select="select" @on-select-all="selectAll" highlight-row  style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.brokerage_order_search_result">
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
// import base_uri from '../../libs/base_uri';
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
          title: "ID",
          key: "id"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "代理人",
          key: "extendUsername"
        },
        {
          title: "交易日",
          key: "accountDay"
        },
        {
          title: "交易订单号",
          key: "orderNo"
        },
        {
          title: "服务者",
          key: "providerName"
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
          title: "佣金(元)",
          key: "brokerage"
        },
        {
          title: "审核状态",
          key: "businessStatus"
        },
        {
          title: "审核时间",
          key: "auditTime"
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
                        this.$router.push("/expand-order-audit-detail/"+params.row.id)
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
                    disabled:params.row.businessStatus == "审核通过" ? true : false                    
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: '确定审核通过？',
                        okText: "确定",
                        cancelText: "取消",
                        onOk: () => {
                          let id = params.row.id;
                          let data = {
                              id: id,
                              businessStatus: 3,
                              remarks: ''
                          }
                          Util.ajax({
                            method:"post",
                            url:baseUri.brokerage_order_audit,
                            data: Util.formData(data),
                          }).then((res) => {
                            if (res.data.success) {
                              this.$Message.success("审核通过！");
                              params.row.businessStatus = "审核通过"
                            } else {
                              this.$Message.success("审核失败！");
                            }
                          })
                        }
                      })
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
                    disabled:params.row.businessStatus == "待审核" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showModal = true;
                      this.activeId = params.row.id;
                      params.row.businessStatus = this.businessStatus;
                      
                    }
                  }
                },
                "审核不通过"
              ),
            ]);
          }
        }
      ],

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
          url:baseUri.brokerage_order_audit,
          data: Util.formData(data),
        }).then((res) => {
          if (res.data.success) {
            this.$Message.success("已审核");
            this.businessStatus = "审核未通过"
          } else {
            this.$Message.error("审核失败！");
          }
        })
      }
    },
    select(selection,row) {
      this.ids.push(row.id)
    },
    selectAll(selection) {
      for(let x in selection) {
        this.ids.push(selection[x].id)
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
            url: baseUri.brokerage_order_batch_update_order,
            data:{
              businessType:3,
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
            url: baseUri.brokerage_order_batch_update_order,
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
