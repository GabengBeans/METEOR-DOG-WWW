<template>
    <div class="expand-manager-detail">
        <div class="basic-info w-container" v-if="show">
          <h2 class="title">基本信息</h2>
          <Row>
            <i-col class="item" span="6"><span class="weight">结算订单号：</span>{{data.balanceOrderNo}}</i-col>
            <i-col class="item" span="6"><span class="weight">手机号：</span>{{data.phone}}</i-col>
            <i-col class="item" span="6"><span class="weight">代理人：</span>{{data.extendUsername}}</i-col>
            <i-col class="item" span="6"><span class="weight">结算状态：</span>{{data.balanceStatus}}</i-col>
          </Row>
          <Row>
            <i-col class="item" span="6"><span class="weight">交易完成日：</span>{{data.accountDay}}</i-col>
            <i-col class="item" span="6"><span class="weight">交易笔数：</span>{{data.tradeCount}}</i-col>
            <i-col class="item" span="6"><span class="weight">交易金额：</span>{{(data.tradeAmount*0.01).toFixed(2)}} 元</i-col>
            <i-col class="item" span="6"><span class="weight">结算生成时间：</span>{{data.createTime}}</i-col>
          </Row>
          <Row>
            <i-col class="item" span="6"><span class="weight">平台服务费：</span>{{(data.platformServiceCharge*0.01).toFixed(2)}} 元</i-col>
            <i-col class="item" span="6"><span class="weight">佣金返点：</span>{{(data.reate*0.01).toFixed(2)}}</i-col>
            <i-col class="item" span="6"><span class="weight">结算佣金：</span>{{(data.balanceAmount*0.01).toFixed(2)}} 元</i-col>
            <i-col class="item" span="6"><span class="weight">结算完成时间：</span>{{data.balanceTime}}</i-col>
          </Row>
          <Row>
            <i-col class="item" span="24"><span class="weight">结算不通过原因：</span>{{data.remarks}}</i-col>
          </Row>
        </div>
        <div class="expand-statistics w-container" v-if="show">
          <h2 class="title">佣金结算订单</h2>
          <i-table class="item-table" border :columns="columns1" :data="data1"></i-table>
        </div>
        <div id='page'>
          <Page style='float:right;  margin-right:10px' 
          :current="expand_charge_page_info.currentPage" 
          :total="expand_charge_page_info.totalPage" 
          show-elevator @on-change = 'get_order_page' >
          </Page>
      </div>
    </div>
</template>
<script>
import Util from "@/libs/util";
////import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
// import axios from "axios";
// import $ from "jquery";

export default {
  data() {
    return {
      data:{},
      show: false,
      balanceOrderNo: '',
      expand_charge_page_info: {
        currentPage: 1,
        totalPage: 0
      },
      columns1: [
        {
            title: '序号',
            key: 'id'
        },
        {
            title: '手机号',
            key: 'phone'
        },
        {
            title: '代理人',
            key: 'extendUsername'
        },
        {
            title: '结算日',
            key: 'accountDay'
        },
        {
            title: '交易订单号',
            key: 'orderNo'
        },
        {
            title: '服务者',
            key: 'providerName'
        },
        {
            title: '服务金额(元)',
            key: 'serviceCharge'
        },
        {
            title: '平台服务费(元)',
            key: 'platformServiceCharge'
        },
        {
            title: '佣金返点',
            key: 'reate'
        },
        {
            title: '结算佣金(元)',
            key: 'brokerage'
        }
      ],
      data1: []
    };
  },
  components: {
    
  },
  methods: {
    get_order_page() {
      Util.ajax({
        method: "get",
        url: baseUri.brokerage_order_search_for_log_page_url,
        params: {
            pageNo: 1,
            pageSize: 10,
            balanceOrderNo: this.balanceOrderNo
        },
        headers: {
            token: Cookies.get("token")
        }
      }).then(res => {
        // console.log(res.data.data)
        let arr = res.data.data.items;
        let vm = this;
        vm.expand_charge_page_info.currentPage = parseInt(res.data.data.page)
        vm.expand_charge_page_info.totalPage = parseInt(res.data.data.totalCount)
        vm.data1 = arr;
        for (let x in arr) {
          vm.data1[x].accountDay = Util.formatDate(new Date(arr[x].accountDay),"yyyy-MM-dd");
          vm.data1[x].serviceCharge = (arr[x].serviceCharge * 0.01).toFixed(2)
          vm.data1[x].platformServiceCharge = (arr[x].platformServiceCharge * 0.01).toFixed(2)
          vm.data1[x].reate = (arr[x].reate * 0.01).toFixed(2)
          vm.data1[x].brokerage = (arr[x].brokerage * 0.01).toFixed(2) 
        }
      })
    },
  },
  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    Util.ajax({
      method: "get",
      url: baseUri.brokerage_balance_detail_url,
      params: {
        id:this.$route.params.id
      },
      headers: {
        token: Cookies.get("token")
      }
    }).then(res => {
      let obj = res.data.data;
      this.balanceOrderNo = obj.balanceOrderNo
      for (let x in obj) {
        if(x == 'createTime' || x == 'updateTime' || x == 'balanceTime'){
          this.data[x] = Util.formatDate(
            new Date(obj[x]),
            "yyyy-MM-dd hh:mm:ss"
          );
        }else if(x == 'accountDay'){
          this.data[x] = Util.formatDate(
            new Date(obj[x]),
            "yyyy-MM-dd"
          );
        }else if(x == 'balanceStatus') {
          if(obj[x] == 1) {
            this.data[x] = '已结算'
          }else if(obj[x] == 2) {
            this.data[x] = '未结算'
          }else if(obj[x] == 3){
            this.data[x] = '待结算'
          }
        } else{
          this.data[x] = obj[x];
        }  
      }

      this.get_order_page()
      this.show = true;
      this.$Message.destroy();
    });
  },
  

};
</script>
<style>
  @import "../../../../styles/public.less";
  @import "../../expand.less";
</style>

