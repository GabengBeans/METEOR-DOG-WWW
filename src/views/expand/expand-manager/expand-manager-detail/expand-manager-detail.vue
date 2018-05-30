<template>
    <div class="expand-manager-detail">
        <div class="basic-info w-container" v-if="show">
          <h2 class="title">基本信息</h2>
          <Row>
            <i-col class="item" span="6"><span class="weight">拓展ID：</span>{{data.id}}</i-col>
            <i-col class="item" span="6"><span class="weight">手机号：</span>{{data.phone}}</i-col>
            <i-col class="item" span="6"><span class="weight">真实姓名：</span>{{data.realname}}</i-col>
            <i-col class="item" span="6"><span class="weight">开户时间：</span>{{data.createTime}}</i-col>
          </Row>
          <Row>
            <i-col class="item" span="6"><span class="weight">拓展码：</span>{{data.inviterCode}}</i-col>
            <i-col class="item" span="6"><span class="weight">拓展状态：</span>{{data.expandStatus == 1 ? '有效' : '无效'}}</i-col>
            <i-col class="item" span="6"><span class="weight">佣金返点：</span>{{(data.reate*0.01).toFixed(2)}}</i-col>
            <i-col class="item" span="6"><span class="weight">结算周期：</span>T + {{data.settlementPeriod}}</i-col>
          </Row>
          <Row>
            <i-col class="item" span="6"><span class="weight">更新时间：</span>{{data.updateTime}}</i-col>
            <i-col class="item" span="6"><span class="weight">操作人：</span>{{data.operator}}</i-col>
          </Row>
        </div>
        <div class="expand-statistics w-container" v-if="show">
          <h2 class="title">拓展统计</h2>
          <i-table class="item-table" border :columns="columns1" :data="data1"></i-table>
          <i-table class="item-table" border :columns="columns2" :data="data2"></i-table>
        </div>
    </div>
</template>
<script>
import Util from "@/libs/util";
////import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
// //import $ from "jquery";

export default {
  data() {
    return {
      data:{},
      show: false,
      columns1: [
        {
            title: '拓展用户数',
            key: 'extendUserCount'
        },
        {
            title: '拓展服务数',
            key: 'extendServiceCount'
        },
        {
            title: '累计交易笔数',
            key: 'tradeCount'
        },
        {
            title: '累计交易额(元)',
            key: 'tradeAmount'
        },
        {
            title: '累计返佣(元)',
            key: 'brokerage'
        }
      ],
      data1: [
        {
          extendUserCount: '',
          extendServiceCount: '',
          tradeCount: '',
          tradeAmount: '',
          brokerage: ''
        }
      ],
      columns2: [
        {
            title: '本月拓展用户',
            key: 'extendUserCount'
        },
        {
            title: '本月拓展服务',
            key: 'extendServiceCount'
        },
        {
            title: '本月交易笔数',
            key: 'tradeCount'
        },
        {
            title: '本月交易金额(元)',
            key: 'tradeAmount'
        },
        {
            title: '本月返佣(元)',
            key: 'brokerage'
        }
      ],
      data2: [
        {
          extendUserCount: '',
          extendServiceCount: '',
          tradeCount: '',
          tradeAmount: '',
          brokerage: ''
        }
      ]
    };
  },
  components: {
    
  },
  methods: {
    
  },
  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    Util.ajax({
      method: "get",
      url: baseUri.extend_user_detail_url,
      params: {
        queryType:2,
        userId:this.$route.params.id
      },
      headers: {
        token: Cookies.get("token")
      }
    }).then(res => {
      let obj = res.data.data;
      // console.log(obj)
      for (let x in obj) {
        if(x == 'createTime' || x == 'updateTime'){
          this.data[x] = Util.formatDate(
            new Date(obj[x]),
            "yyyy-MM-dd hh:mm:ss"
          );
        }else if(x == 'tradeAmount' || x == 'brokerage'){
          this.data[x] = (obj[x] * 0.01).toFixed(2);
        }else if(x == 'all'){
          // console.log(obj[x])
          this.data[x] = obj[x];
          this.data[x].tradeAmount = (obj[x].tradeAmount * 0.01).toFixed(2);
          this.data[x].brokerage = (obj[x].brokerage * 0.01).toFixed(2);          
        } else{
          this.data[x] = obj[x];
        }  
      }
      this.data1[0] = this.data.all;
      this.data2[0] = this.data;
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

