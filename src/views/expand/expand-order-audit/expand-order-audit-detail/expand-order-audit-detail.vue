<template>
    <div class="expand-manager-detail">
        <div class="basic-info w-container" v-if="show">
          <h2 class="title">结算基础信息</h2>
          <Row>
            <i-col class="item" span="6"><span class="weight">手机号：</span>{{data.phone}}</i-col>
            <i-col class="item" span="6"><span class="weight">代理人：</span>{{data.extendUsername}}</i-col>
            <i-col class="item" span="6"><span class="weight">结算日期：</span>{{data.accountDay}}</i-col>
            <i-col class="item" span="6"><span class="weight">交易订单号：</span>{{data.orderNo}}</i-col>
          </Row>
          <Row>
            <i-col class="item" span="6"><span class="weight">服务者：</span>{{data.providerName}}</i-col>
            <i-col class="item" span="6"><span class="weight">服务手机号：</span>{{data.serviceProviderPhone}}</i-col>
            <i-col class="item" span="6"><span class="weight">服务金额：</span>{{(data.serviceCharge*0.01).toFixed(2)}} 元</i-col>
            <i-col class="item" span="6"><span class="weight">平台服务费：</span>{{(data.platformServiceCharge*0.01).toFixed(2)}} 元</i-col>
          </Row>
          <Row>
            <i-col class="item" span="6"><span class="weight">佣金返点：</span>{{(data.reate*0.01).toFixed(2)}}</i-col>
            <i-col class="item" span="6"><span class="weight">佣金：</span>{{(data.brokerage*0.01).toFixed(2)}} 元</i-col>
          </Row>
          <div class="audit-info">
              <Row>
                  <i-col class="item weight" span="2">审核状态：</i-col>
                  <i-col class="item" span="22">{{data.businessStatus}}</i-col>
              </Row>
              <Row>
                  <i-col class="item weight" span="2">审核时间：</i-col>
                  <i-col class="item" span="22">{{data.auditTime}}</i-col>
              </Row>
              <Row>
                  <i-col class="item weight" span="2">审核人：</i-col>
                  <i-col class="item" span="22">{{data.operator}}</i-col>
              </Row>
              <Row>
                  <i-col class="item weight" span="2">备注：</i-col>
                  <i-col class="item" span="22">{{data.remarks}}</i-col>
              </Row>
          </div>
        </div>
    </div>
</template>


<script>
import Util from "@/libs/util";
////import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";

export default {
  data() {
    return {
      data:{},
      show: false,
      
    };
  },
  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    Util.ajax({
      method: "get",
      url: baseUri.brokerage_order_detail,
      params: {
        id:this.$route.params.id
      },
      headers: {
        token: Cookies.get("token")
      }
    }).then(res => {
        let obj = res.data.data;
        //console.log(obj)
        for (let x in obj) {
            if(x == 'accountDay' || x == 'auditTime'){
                this.data[x] = Util.formatDate(
                    new Date(obj[x]),
                    "yyyy-MM-dd"
                );
            }else if(x == 'businessStatus'){
                if(obj[x] == 1){
                    this.data[x] = '待审核'
                }else if(obj[x] == 2){
                    this.data[x] = '审核未通过'
                }else if(obj[x] == 3){
                    this.data[x] = '审核通过'
                }
            }else{
                this.data[x] = obj[x];
            }
            
        }

      this.show = true;
      this.$Message.destroy();
    });
  }
};
</script>
<style>
  @import "../../../../styles/public.less";
  @import "../../expand.less";
</style>

