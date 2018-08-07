<template>
  <div id='user_table' class="table">
    <Table style="margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.statistics_search_result">
    </Table>
    <Modal v-model="showAddModal" width="500s">
      <p slot="header" style="text-align:center">
        <span>填写发货信息</span>
      </p>
      <div>
        <Form ref="deliveryInfo" :model="deliveryInfo" :rules="ruleInline" :label-width="90" >
          <FormItem label="序号" prop="companyName" >
            <Input clearable v-model="deliveryInfo.companyName" style="min-width:200px;" />
          </FormItem>
          <FormItem label="礼品名称" prop="companyNo" >
            <Input clearable v-model="deliveryInfo.companyNo" style="min-width:200px;"  />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" @click="showAddModal = false">取消</Button>
        <Button type="success" @click="saveDeliveryInfo('deliveryInfo')">保存</Button>
      </div>
    </Modal>
  </div>

</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import uploadSingleImg from "@/views/public-components/upload_single_img"
export default {
    components:{
        uploadSingleImg
    },
  data() {
    return {
      showAddModal: false,
      deliveryInfo:{
          companyName:"",
          companyNo:""
      },
      ruleInline:{
          companyName:[
              {required:true, message: '物流公司名称不能为空',trigger: 'blur'}
          ],
          companyNo:[
               {required:true,message: '编号不能为空', trigger:'blur'}
          ],
         
      },
      columns: [
        {
          title: "兑换时间",
          key: "userId",
          align: "center",
          width: 160
        },
        {
          title: "用户信息",
          key: "nickname",
          align: "center",
          width: 200
        },
        {
          title: "礼品名称",
          key: "currentCount",
          align: "center",
          width: 160
        },
        {
          title: "兑换数量",
          key: "accumulateCount",
          align: "center",
          width: 160
        },
        {
          title: "收件人信息",
          key: "availableCount",
          align: "center",
          width: 160
        },
        {
          title: "实付流星钻",
          key: "availableCount",
          align: "center",
          width: 160
        },
        {
          title: "留言备注",
          key: "availableCount",
          align: "center",
          width: 160
        },
        {
          title: "状态",
          key: "availableCount",
          align: "center",
          width: 160
        },
        {
          title: "发货信息",
          key: "availableCount",
          align: "center",
          width: 160
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showAddModal = true
                    }
                  }
                },
                "发货"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    init() {
     this.giftAddInfo.sort = ""
     this.giftAddInfo.giftName = ""
     this.giftAddInfo.meteorDiamondAmount = ""
     this.giftAddInfo.invertory = ""
     this.giftAddInfo.desc = ""
     this.giftAddInfo.imgUrl=""
    },
    openAddModal(){
        this.init()
        this.modalName = "新增礼品"
        this.showAddModal = true
    },
    saveDeliveryInfo(name) {
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
</style>
