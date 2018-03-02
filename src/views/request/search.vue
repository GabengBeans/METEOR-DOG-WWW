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
        phone: {
          tagName: "手机号",
          value: ""
        },
        title: {
          tagName: "需求标题",
          value: ""
        },

        realname: {
          tagName: "真实姓名",
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
              value: "待发布"
            },
            op3: {
              num: "2",
              value: "审核中"
            },
            op4: {
              num: "3",
              value: "已发布"
            },
            op5: {
              num: "4",
              value: "已过期"
            },
            op6: {
              num: "5",
              value: "审核未通过"
            },
            op7: {
              num: "6",
              value: "取消发布"
            }
          }
        },
        status: {
          tagName: "有效状态",
          value: "-1",
          tag: {
            op1: {
              num: "-1",
              value: "全部"
            },
            op2: {
              num: "1",
              value: "有效"
            },
            op3: {
              num: "0",
              value: "无效"
            }
          }
        },
        beginCreateTime: {
          tagName: "发布日期",
          value: "",
          data: "1"
        },
        endCreateTime: {
          tagName: "截止日期",
          value: "",
          data: "1"
        },
        nickname: {
          tagName: "昵称",
          value: ""
        }
      }
    };
  },
  methods: {
    search: function() {
      let obj = {};
      for (let x in this.data) {
        if (this.data[x].value != "") {
          if (x == "beginCreateTime") {
            obj[x] = new Date(this.data[x].value).getTime();
          } else if (x == "endCreateTime") {
            obj[x] = new Date(this.data[x].value).getTime();
          } else {
            obj[x] = this.data[x].value;
          }
        }
      }
      //console.log(obj)
      this.$store.state.app.request_search_info = obj;
      this.$store.commit("GET_REQUEST_INFO", { data: obj, pageNo: 1 });
    }
  }
};
</script>
<style>

</style>
