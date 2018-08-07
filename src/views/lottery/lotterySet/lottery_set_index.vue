<template>
  <div id='user_table' class="table">
    <Button type="primary" style="margin-left:16px;" @click="openAddModal" >修改中奖概率</Button>
    <lottery-set-table :columns="columns"></lottery-set-table>
    <Modal v-model="showAddModal" width="500">
      <p slot="header" style="text-align:center">
        <span>修改中奖概率</span>
      </p>
      <div>
        <Form  :label-width="90" >
          <FormItem label="序号" prop="sort" >
            <Input clearable v-model="giftAddInfo.sort" style="min-width:200px;" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" @click="showAddModal = false">取消</Button>
        <Button type="success" @click="saveAddGiftInfo('giftAddInfo')">保存</Button>
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
      giftAddInfo:{
          sort:""
      }
    };
  },
  methods: {
    openAddModal(){
       
        this.showAddModal = true
    },
    saveAddGiftInfo(name) {
        this.$refs[name].validate(valid=>{
            if(valid){
                this.$Message.success('Success!');
            }
        })
    }
  }
};
</script>
<style>
@import '../../../styles/public.less'
</style>
