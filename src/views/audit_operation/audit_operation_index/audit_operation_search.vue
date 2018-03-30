<template>
    <div id='user_searchs' class="search">
        <Row :gutter='16'>
            <Form label-position="right" :label-width="80">
                <Col :xs='13' :sm='13' :md='8' :lg='5' v-for="item in data" :key="item.key" style="height:57px;">
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
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  name: "user_searchs",
  data() {
    return {
      data: {}
    };
  },
  methods: {
    search: function() {
      let obj = {};
      for (let x in this.data) {
        if (this.data[x].value != "") {
          obj[x] = this.data[x].value;
        }
      }
      this.$store.commit("GET_AUDIT_OPERATION_INFO",{data:obj,pageNo:1})
    }
  },
  created() {
    Util.ajax({
      method: "get",
      url: baseUri.get_adminUserLis_url
    }).then(res => {
      //console.log(res)
      if (res.data.success) {
        let operater = [];
        for (let x = 0; x < res.data.data.length; x++) {
          let obj = {
            num: "",
            value: ""
          };
          obj.num = res.data.data[x].id;
          obj.value = res.data.data[x].nickname;
          operater.push(obj);
        }
        let obj = {
          num: -1,
          value: "全部"
        };
        operater.unshift(obj);
        //console.log(operater);
        this.data = {
          bussinessUserPhone: {
            tagName: "用户手机号",
            value: ""
          },
          bussinessType: {
            tagName: "类型",
            value: -1,
            tag: {
              op1: {
                num: -1,
                value: "全部"
              },
              op2: {
                num: 2,
                value: "服务"
              },
              op3: {
                num: 1,
                value: "需求"
              }
            }
          },
          operate: {
            tagName: "审核结果",
            value: -1,
            tag: {
              op1: {
                num: -1,
                value: "全部"
              },
              op2: {
                num: 3,
                value: "通过"
              },
              op3: {
                num: 5,
                value: "未通过"
              },
              op4: {
                num: 7,
                value: "下架"
              }
            }
          },
          operaterId: {
            tagName: "审核人",
            value: -1,
            tag: operater
          },
          beginAuditTime: {
            tagName: "开始日期",
            value: "",
            data: 1
          },
          endAuditTime: {
            tagName: "截止日期",
            value: "",
            data: 1
          }
        };
      }
    });
  }
};
</script>
<style>
.search {
  background: #ffffff;
  padding: 25px 30px 0;
  border-radius: 3px;
  margin: 15px 0;
}
</style>
