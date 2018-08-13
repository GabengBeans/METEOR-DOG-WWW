<template>
  <div id='user_table' class="table">
    <Button type="primary" style="margin-left:16px;" @click="openAddModal" >修改中奖概率</Button>
    <lottery-set-table :columns="columns" :data="$store.state.app.lottery_set_search_result"></lottery-set-table>
    <Modal v-model="showAddModal" width="400">
      <p slot="header" style="text-align:center">
        <span>修改中奖概率</span>
      </p>
      <div>
        <Form   :label-width="120" >
          <FormItem v-for="item in auditLotteryObj" :key="item.id" :label="item.myPrizesName">
            <Input clearable v-model.number="item.myPrizesRate" style="min-width:50px;" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" @click="showAddModal = false">取消</Button>
        <Button type="success" @click="saveAddGiftInfo">保存</Button>
      </div>
    </Modal>
  </div>

</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import config from "../config"
import lotterySetTable from "@/views/public-components/table"
export default {
    components:{
        lotterySetTable
    },
  data() {
    return {
      showAddModal: false,
      columns:config.lotterySetColumns,
      auditLotteryObj:{}
    };
  },
  methods: {
    openAddModal(){
       this.auditLotteryObj = this.$store.state.app.lottery_set_search_result
        this.showAddModal = true
    },
    saveAddGiftInfo() {
        
    }
  },//lottery_batch_update_url
  created(){
    this.$store.commit("GET_LOTTERY_SET_LIST")        
    }
};
</script>
<style>
@import '../../../styles/public.less'
</style>
