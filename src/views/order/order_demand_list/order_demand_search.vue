<template>
  <div id='user_search'>
    <Row :gutter='16'>
      <Form label-position="right" :label-width="60">
        <Col :xs='13' :sm='13' :md='8' :lg='5' v-for="item in data" :key="item.key">
        <FormItem style="min-width:100px" :label="item.tagName">
          <Select v-model="item.value" v-if="item.tag">
            <Option v-for="item in item.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
          </Select>
          <DatePicker v-else-if="item.data" v-model="item.value" type="date" placeholder="请选择日期"></DatePicker>
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
        orderNo: {
          tagName: "订单号",
          value: ""
        },
        phone: {
          tagName: "手机号",
          value: ""
        },

        userName: {
          tagName: "昵称",
          value: ""
        },
        title: {
          tagName: "需求标题",
          value: ""
        },
        beginCreateTime: {
          tagName: "下单日期",
          value: "",
          data: "1"
        },
        endCreateTime: {
          tagName: "截止日期",
          value: "",
          data: "1"
        },
        orderStatus: {
          tagName: "订单状态",
          value: "0",
          tag: {
            op1: {
              num: "0",
              value: "全部"
            },
            op2: {
              num: "1",
              value: "待支付"
            },
            op3: {
              num: "2",
              value: "待服务"
            },
            op4: {
              num: "3",
              value: "已完成"
            },
            op5: {
              num: "4",
              value: "已取消"
            },
            op6: {
              num: "5",
              value: "申请退款"
            },
            op7: {
              num: "6",
              value: "退款成功"
            },
            op8: {
              num: "7",
              value: "退款失败"
            },
            op9: {
              num: "9",
              value: "已付款"
            },
            op10: {
              num: "8",
              value: "已过期"
            }
          }
        },
      }
    };
  },
  methods: {
    search: function() {
      let obj = {};
      for (let x in this.data) {
        obj.businessType = '2'
        if (this.data[x].value != "") {
            obj[x] = this.data[x].value;
        }
      }
      //console.log(obj)
      this.$store.state.app.order_demand_search_info = obj;
      this.$store.commit("GET_ORDER_DEMAND_INFO", { data: obj, pageNo: 1 });
    }
  }
};
</script>
<style>

</style>
