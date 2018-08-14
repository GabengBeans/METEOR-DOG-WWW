<template>
  <div id='user_table' class="table">
    <Button type="primary" style="margin-left:16px;" @click="openAddModal" >修改中奖概率</Button>
    <lottery-set-table :columns="columns" :data="$store.state.app.lottery_set_search_result"></lottery-set-table>
    <Modal v-model="showAddModal" width="400">
      <p slot="header" style="text-align:center">
        <span>修改中奖概率</span>
      </p>
      <div>
        <Form :label-width="120" >
          <FormItem  v-for="item in auditLotteryObj" :key="item.id"  :label="item.myPrizesName" >
            <Input clearable v-model="item.myPrizesRate" style="min-width:50px;" />
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
      auditLotteryObj:[]
    };
  },
  methods: {
    openAddModal(){
    //  this.$store.state.app.lottery_set_search_result.map((item,index)=>{
    //    this.$set(this.auditLotteryObj,index,item)
    //  })
       this.auditLotteryObj = this.$store.state.app.lottery_set_search_result
        this.showAddModal = true
    },
    saveAddGiftInfo() {
       let boole = true
       let num = 0
       this.auditLotteryObj.map(item=>{
         if(item.myPrizesRate===''){
           this.$Message.error("请补全中奖概率")
           return
         }
         num+=Number(item.myPrizesRate)
       })
       if(num!=100){
         this.$Message.error("综合中奖率不能高于或低于100%")
          return
       }
       let data = []
       this.auditLotteryObj.map(item=>{
         let obj = {}
         obj.id = item.id
         obj.prizesId = item.prizesId
         obj.prizesName = item.prizesName
         obj.prizesRateStr = item.myPrizesRate
         obj.prizesType = item.prizesType
         data.push(obj)
       })
      util.ajax({
        method:'post',
        url:base_uri.lottery_batch_update_url,
        data:data
      }).then(resp=>{
        if(resp.data.success){
          this.$store.commit("GET_LOTTERY_SET_LIST")
          this.$Message.success('修改成功')
          this.showAddModal = false
        }else{
          this.$Message.error(resp.data.msg)
        }
      })
    }
  },
  created(){
    this.$store.commit("GET_LOTTERY_SET_LIST")        
  }
};
</script>
<style>
@import '../../../styles/public.less'
</style>
