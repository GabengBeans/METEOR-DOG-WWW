<template>
    <div id='user_search'>
    <Row :gutter='16' >
    <Form label-position="right" :label-width="60">
       <Col :xs='13' :sm='13' :md='8' :lg='5' v-for="item in data" :key="item.key">
        <FormItem style="min-width:100px" :label="item.tagName">
            <Select v-model="item.value" v-if="item.tag">
               <Option v-for="item in item.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
            </Select>
            <Input clearable v-model="item.value" v-else />
        </FormItem>
    </Col>
    </Form>
        <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click.native='search' >搜索</Button>
     </Row>
  </div>
</template>
<script>
export default {
  name: "user_search",
  data() {
    return {
      data: {
        id: {
          tagName: "用户ID",
          value: ""
        },
        phone: {
          tagName: "手机号",
          value: ""
        },
        nickname: {
          tagName: "昵称",
          value: ""
        },
        realname: {
          tagName: "真实姓名",
          value: ""
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
              value: "正常"
            },
            op3: {
              num: "0",
              value: "禁用"
            }
          }
        },
        inviterCode: {
          tagName: "邀请码",
          value: ""
        }
      }
    }
  },
  methods:{
      search:function(){
          let obj = {}
          for(let x in this.data)
          { 
              if(this.data[x].value !='')
              {
                   obj[x] = this.data[x].value
              }
          }
          //console.log(obj)
          this.$store.state.app.user_search_info = obj
          this.$store.commit("GET_USER_INFO",{data:obj,pageNo:1})
      }
  }
};
</script>
<style>

</style>
