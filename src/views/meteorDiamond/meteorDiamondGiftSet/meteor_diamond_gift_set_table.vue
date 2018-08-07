<template>
  <div id='user_table' class="table">
    <Button type="primary" style="margin-left:16px;" @click="openAddModal" >新增礼品</Button>
    <br><br>
    <Table style="margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.gift_set_search_result">
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
           <FormItem label="每人限兑" prop="invertory">
            <Input clearable v-model.number="giftAddInfo.userLimit" style="width:200px;"  /> 
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
          id:"",
          sort:"",
          giftName:"",
          meteorDiamondAmount:"",
          userLimit:"",
          invertory:"",
          desc:"",
          imgUrl:"",
          imgUrlId:""
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
          userLimit:[
            {required:true, type:'number', message: '每人限兑不能为空且必须为数字',trigger: 'blur'}
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
          key: "sort",
          align: "center",
          width:80
        },
        {
          title: "礼品名称",
          key: "name",
          align: "center",
           width:90 
        },
        {
          title: "礼品图片",
          width:250,
          align:'center',
          render:(h,params)=>{
            return h('div',{
             style:{
               padding:"10px 0" 
             }
            },[
              h('img',{
                attrs:{
                  src:base_uri.oss_url + params.row.imageList[0].mediaUrl
                },
                style:{
                  width:'100%',
                  height:'100%',
                  display:"block"
                }
              })
            ])
          }
        },
        {
          title: "兑换提示",
          key: "prompt",
          align: "center"
        },
        {
          title: "流星钻价格",
          key: "price",
          align: "center",
          width:100
        },
         {
          title: "每人限兑",
          key: "userLimit",
          align: "center",
          width:100
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width:80
        },
        {
          title: "已兑换",
          key: "convertibility",
          align: "center",
          width:80
        },
        {
          title: "剩余",
          key: "goodPool",
          align: "center",
          width:80
        },
        {
          title: "总库存",
          key: "total",
          align: "center",
          width:100
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
                      this.giftAddInfo.id = params.row.id
                      this.giftAddInfo.sort = params.row.sort
                      this.giftAddInfo.giftName = params.row.name
                      this.giftAddInfo.meteorDiamondAmount = params.row.price
                      this.giftAddInfo.invertory = params.row.total
                      this.giftAddInfo.userLimit = params.row.userLimit
                      this.giftAddInfo.desc = params.row.prompt
                      this.giftAddInfo.imgUrl = params.row.imageList[0].mediaUrl
                      this.giftAddInfo.imgUrlId = params.row.imageList[0].id
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
                     util.ajax({
                       method:"post",
                       url:base_uri.disable_exchange_good_url,
                       params:{
                         exchangeGoodId:params.row.id
                       }
                     }).then(resp=>{
                       if(resp.data.success){
                        this.$store.commit("GET_GIFT_SET_LIST", {
                          pageNo: this.$store.state.app.gift_set_public_page
                        });
                        this.$Message.success("下架成功")
                       }else{
                         this.$Message.error(resp.data.msg)
                       }
                     })
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
     this.giftAddInfo.userLimit = ""
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
              let url
              let obj = {}
              obj.mediaUrl = this.giftAddInfo.imgUrl
              obj.id  = this.giftAddInfo.imgUrlId
              if(this.modalName=="修改礼品"){
                 obj.id  = this.giftAddInfo.imgUrlId
              }
              let arr = []
              arr.push(obj)
              let data={
                sort:this.giftAddInfo.sort,
                name:this.giftAddInfo.giftName,
                price:this.giftAddInfo.meteorDiamondAmount,
                total:this.giftAddInfo.invertory,
                prompt:this.giftAddInfo.desc,
                userLimit:this.giftAddInfo.userLimit,
                imageList:arr
              }
              if(this.modalName=="修改礼品"){
               data.id = this.giftAddInfo.id
               url = base_uri.update_exchange_good_url
              }else{
                url = base_uri.add_exchange_good_url
              }
              util.ajax({
                 method:'post',
                 url:url,
                 data:data
                }).then(resp=>{
                  if(resp.data.success){
                    this.$store.commit("GET_GIFT_SET_LIST", {
                        pageNo: this.$store.state.app.gift_set_public_page
                      });
                      this.showAddModal = false
                    this.$Message.success('保存成功');
                  }
                })
            }
        })
    }
  }
};
</script>
<style>
</style>
