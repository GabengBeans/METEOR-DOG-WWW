<template>
  <div id='user_search'>
    <Row :gutter='16'>
      <Form label-position="right" :label-width="60">
        <Col :xs='13' :sm='13' :md='8' :lg='5' style="height:57px;" v-for="item in data" :key="item.key">
        <FormItem style="min-width:100px" :label="item.tagName">
          <Select v-model="item.value" v-if="item.tag">
            <Option v-for="item in item.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
          </Select>
          <DatePicker style="width:100%;" v-else-if="item.data" v-model="item.value" type="date" placeholder="请选择日期"></DatePicker>
          <Input clearable v-model="item.value" v-else />
        </FormItem>
        </Col>
      </Form>
      <Button style='margin-left:38px;float:left;' type="primary" shape="circle" icon="ios-search" @click.native='search'>搜索</Button>
    </Row>
  </div>
</template>
<script>
import Util from '@/libs/util';
export default {
  name: "user_search",
  data() {
    return {
      data: {
        phone: {
          tagName: "手机号",
          value: ""
        },
        extendUsername: {
          tagName: "代理人",
          value: ""
        },
        orderNo:{
          tagName: "订单号",
          value: ""
        },
        businessStatus: {
          tagName: "审核状态",
          value: "0",
          tag: {
            op1: {
              num: "0",
              value: "全部"
            },
            op2: {
              num: "1",
              value: "待审核"
            },
            op3: {
              num: "2",
              value: "审核未通过"
            },
            op4: {
              num: "3",
              value: "审核通过"
            }
          }
        },
        startAccountDay: {
          tagName: "交易日期",
          value: "",
          data: "1"
        },
        endAccountDay: {
          tagName: "至",
          value: "",
          data: "1"
        },
        startAuditTime: {
          tagName: "审核时间",
          value: "",
          data: "2"
        },
        endAuditTime: {
          tagName: "至",
          value: "",
          data: "2"
        },
      }
    };
  },
  methods: {
    search: function() {
      let obj = {};
      for (let x in this.data) {
        if (this.data[x].value != "") {
          if (x == "startAccountDay" || x == "endAccountDay" || x == "startAuditTime" || x == "endAuditTime") {
            obj[x] = Util.formatDate(new Date(this.data[x].value), "yyyy-MM-dd")
          } else {
            obj[x] = this.data[x].value;
          }
        }
      }
      // console.log(obj)
      this.$store.state.app.brokerage_order_search_info = obj;
      this.$store.commit("GET_BROKERAGE_ORDER_INFO", { data: obj, pageNo: 1 });
    }
  }
};
</script>
<style>

</style>
