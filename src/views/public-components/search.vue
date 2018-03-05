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
  props:["data","storeStatus","storeMutations"],
  
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
