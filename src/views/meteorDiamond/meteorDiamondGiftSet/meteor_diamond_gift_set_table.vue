<template>
  <div id='user_table' class="table">
    <Button type="primary" style="margin-left:16px;" @click="openAddModal" >新增礼品</Button>
    <br><br>
    <Table style="margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.statistics_search_result">
    </Table>
    <Modal v-model="showAddModal" width="500s">
      <p slot="header" style="text-align:center">
        <span>{{modalName}}</span>
      </p>
      <div>
        <Form ref="giftAddInfo" :model="giftAddInfo" :rules="ruleInline" :label-width="90" >
          <FormItem label="序号" prop="sort" >
            <Input clearable v-model.number="giftAddInfo.sort" style="width:200px;" /><span style="color:blue;margin-left:15px;">序号越小位置越靠前</span>
          </FormItem>
          <FormItem label="礼品名称" prop="giftName" >
            <Input clearable v-model="giftAddInfo.giftName" style="width:200px;"  />
          </FormItem>
           <FormItem label="流星钻价格" prop="meteorDiamondAmount" >
            <Input clearable v-model.number="giftAddInfo.meteorDiamondAmount" style="width:200px;" /><span style="margin-left:15px;">克拉/个</span>
          </FormItem>
           <FormItem label="库存" prop="invertory">
            <Input clearable v-model.number="giftAddInfo.invertory" style="width:200px;"  /> <span v-if="modalName=='修改礼品'" style="color:blue;margin-left:15px;">库存只能增加不能减少</span>
          </FormItem>
           <FormItem label="兑换提示" >
            <Input clearable type="textarea" v-model="giftAddInfo.desc" />
          </FormItem>
          <FormItem label="上传图片" prop="imgUrl" >
           <upload-single-img :imgUrl="giftAddInfo" :upload="true"></upload-single-img>
            <Input  v-model="giftAddInfo.imgUrl" style="display:none" />
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
import uploadSingleImg from "@/views/public-components/upload_single_img"
export default {
    components:{
        uploadSingleImg
    },
  data() {
    return {
      showAddModal: false,
      modalName:"新增礼品",
      giftAddInfo:{
          sort:"",
          giftName:"",
          meteorDiamondAmount:"",
          invertory:"",
          desc:"",
          imgUrl:""
      },
      ruleInline:{
          sort:[
              {required:true, type:'number', message: '序号不能为空且必须为数字',trigger: 'blur'}
          ],
          giftName:[
               {required:true,message: '礼品名称不能为空', trigger: 'blur'}
          ],
          meteorDiamondAmount:[
              {required:true, type:'number', message: '流星钻不能为空且必须为数字',trigger: 'blur'}
          ],
          invertory:[
              {required:true, type:'number', message: '库存不能为空且必须为数字',trigger: 'blur'}
          ],
          imgUrl:[
              {required:true,message: '请上传图片', trigger: 'blur'}
          ]
      },
      columns: [
        {
          title: "序号",
          key: "userId",
          align: "center",
          width: 160
        },
        {
          title: "礼品名称",
          key: "nickname",
          align: "center",
          width: 200
        },
        {
          title: "礼品图片",
          key: "currentCount",
          align: "center",
          width: 160
        },
        {
          title: "兑换提示",
          key: "accumulateCount",
          align: "center",
          width: 160
        },
        {
          title: "流星钻价格",
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
          title: "已兑换",
          key: "availableCount",
          align: "center",
          width: 160
        },
        {
          title: "剩余",
          key: "availableCount",
          align: "center",
          width: 160
        },
        {
          title: "总库存",
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
                      this.modalName = "修改礼品"
                      this.showAddModal = true
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                     
                    }
                  }
                },
                "下架"
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
.statistics_class {
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
}
</style>
