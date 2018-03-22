<template>
  <div id='user_search'>
    <Row :gutter='16'>
      <Form label-position="right" :label-width="60">
        <Col :xs='13' :sm='13' :md='8' :lg='5' v-for="item in data" :key="item.key" style="height:57px;">
        <FormItem style="min-width:100px" :label="item.tagName">
          <Select v-model="item.value" v-if="item.tag">
            <Option v-for="item in item.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
          </Select>
          <DatePicker style="width:100%;" v-else-if="item.data" v-model="item.value" type="date" placeholder="请选择日期"></DatePicker>
          <Input clearable v-model="item.value" v-else />
        </FormItem>
        </Col>
      </Form>
      <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click.native='search'>搜索</Button>
    </Row>
  </div>
</template>
<script>
export default {
  name: "user_search",
  data() {
    return {
      data: {
        balanceOrderNo: {
          tagName: "订单号",
          value: ""
        },
        phone: {
          tagName: "手机号",
          value: ""
        },
        extendUsername: {
          tagName: "代理人",
          value: ""
        },
        balanceStatus: {
          tagName: "结算状态",
          value: "0",
          tag: {
            op1: {
              num: "0",
              value: "全部"
            },
            op2: {
              num: "1",
              value: "已结算"
            },
            op3: {
              num: "2",
              value: "未结算"
            },
            op4: {
              num: "3",
              value: "待结算"
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
        startBalanceTime: {
          tagName: "结算时间",
          value: "",
          data: "2"
        },
        endBalanceTime: {
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
          if (x == "startAccountDay" || x == "endAccountDay" || x == "startBalanceTime" || x == "endBalanceTime") {
            //console.log(this.data[x].value)
            obj[x] = new Date(this.data[x].value).getTime();
          } else {
            obj[x] = this.data[x].value;
          }
          // obj[x] = this.data[x].value;
        }
      }
      //console.log(obj)
      this.$store.state.app.expand_charge_search_info = obj;
      this.$store.commit("GET_EXPAND_CHARGE_INFO", { data: obj, pageNo: 1 });
    }
  }
};
</script>
<style>

</style>
