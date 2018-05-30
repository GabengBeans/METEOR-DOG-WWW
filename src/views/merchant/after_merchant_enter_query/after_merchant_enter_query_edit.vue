<template>
  <div id="user_edit" style="background:#eee">
    <Card :bordered="false" v-if="show">
      <div class="user_detail_div">
        <label class="from_label">注册手机号</label>
        <span style="width: 15vw;min-width:100px;">{{merchantInfo.phone}}</span>
      </div>
      <Upload style="display:inline-block;" :before-upload="handleBeforeUpload" :show-upload-list="false" :on-success="handleSuccess" :data="{
                    'type':'user'
                  }" :action="imgUrl">
        <label style="
                font-size: 12px;
                line-height: 16px;
                margin-right: 20px;  
                display: inline-block; 
                width: 100px;
                font-weight: bold;
                text-align: right;">头像</label>
        <Avatar :src="aliyun + merchantInfo.avatarUrl" shape="square" class="avatar" />
      </Upload>
      <br>
      <div class="user_detail_div">
        <label class="from_label">企业IP昵称</label>
        <Input clearable style="width: 15vw;min-width:100px;" v-model='merchantInfo.nickName' />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">流星值</label>
        <span>{{(merchantInfo.meteorScore/10).toFixed(1)}}</span>
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">余额</label>
        <span>{{(merchantInfo.amount/100).toFixed(2)}}</span>
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">企业标签</label>
        <Input style="width: 5vw;min-width:100px;margin-right:1vw" v-model='tag' />
        <Tag closable @on-close="handleClose" color="blue" v-for="item in merchantInfo.tagList" :key="item.key" :name="item.lableName" class="tag-style">{{item.lableName}}</Tag>
        <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">常驻住址</label>
        <AutoComplete clearable :value="merchantInfo.address" @input="serach_place" style="width: 15vw;min-width:100px;">
          <Option v-for="item in arr" :value="item" :key="item.key"></Option>
        </AutoComplete>
      </div>
      <br>
      <div>
        <BMapComponent style="width:95%;margin:0 auto;" :lat="merchantInfo.addressLat" :lon="merchantInfo.addressLon" :keyword="merchantInfo.address"></BMapComponent>
      </div>
      <br><br>
      <div class="user_detail_div">
        <label class="from_label">企业简介</label>
        <Input style="width:40vw" type="textarea" v-model="merchantInfo.companyProfile" />
      </div>
      <br>
      <div style="border-bottom:1px solid gray"></div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">企业名称</label>
        <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.companyName" />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">联系人</label>
        <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.contact" />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">联系人电话</label>
        <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.contactNumber" />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">企业法人</label>
        <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.legalPerson" />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">注册资本</label>
        <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.registeredCapital" />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">注册地址</label>
        <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.registeredAddress" />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">主营业务</label>
        <Input style="width:40vw" type="textarea" v-model="merchantInfo.mainBusiness" />
      </div>
      <br>
      <div class="user_detail_div">
        <label class="from_label">经营范围</label>
        <Input style="width:40vw" type="textarea" v-model="merchantInfo.businessCope" />
      </div>
      <br>
      <div style="text-align:center;">
        <Button class="btn-group" type="success" @click.native="saveInfo">保存</Button>
      </div>
      <Modal v-model="showCloseMadal" width="360" :closable="false" :mask-closable="false" :on-cancel="closePage">
        <p slot="header">
        </p>
        <div style="text-align:center;font-size:20px">
           <b>更新成功</b>
        </div>
        <div slot="footer" style="text-align:center">
           <Button type="success" size="large" @click="closePage" >确定</Button>
        </div>
    </Modal>
    </Card>
  </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
//import $ from "jquery";
import BMapComponent from "../../public-components/BMapComponent";
export default {
  data() {
    return {
        show:false,
      showCloseMadal:false,
      imgUrl: baseUri.img_upload_url,
      aliyun: baseUri.oss_url,
      tag: "",
      arr: [],
      btnStatus: true,
      ruleResult: false,
      merchantInfo: {
      }
    };
  },
  components: {
    BMapComponent
  },
  methods: {
    closePage(){
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[0];
      let len = pageOpenedList.length;
      for (let i = 1; i < len; i++) {
        if (pageOpenedList[i].name === this.$route.name) {
          if (i < len - 1) {
            lastPageObj = pageOpenedList[i + 1];
          } else {
            lastPageObj = pageOpenedList[i - 1];
          }
          break;
        }
      }
      this.$store.commit("removeTag", this.$route.name);
      this.$store.commit("closePage", this.$route.name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
      this.$router.back(-1);
      this.modalShow = false;
      this.showCloseMadal=false
    },
    serach_place: function(event) {
      //搜索百度地图关联地点
      this.merchantInfo.address = event;
      $.ajax({
        type: "GET",
        url:
          "http://api.map.baidu.com/place/v2/suggestion?query=" +
          event +
          "&region=" +
          event +
          "&output=json&ak=sKkVhwaa0xKdBYPtGzAALEY5FEDL01g2",
        dataType: "jsonp",
        jsonp: "callback"
      }).then(result => {
        this.arr = [];
        for (let i = 0; i < result.result.length; i++) {
          this.arr.unshift(result.result[i].name);
        }
      });
    },
    handleAdd: function() {
      //添加个人标签
      if (this.merchantInfo.tagList.length >= 3) {
        this.$Message.error("最多添加3组标签");
      } else {
        if (this.tag == "") {
          this.$Message.error("请输入标签内容");
        } else {
          this.merchantInfo.tagList.push({ lableName: this.tag, id: "-1" });
          this.tag = "";
          console.log(this.merchantInfo.tagList);
        }
      }
    },
    handleClose: function(event, name) {
      //删除个人标签
      for (let i = 0; i < this.merchantInfo.tagList.length; i++) {
        if (this.merchantInfo.tagList[i].lableName == name) {
          this.merchantInfo.tagList.splice(i, 1);
        }
      }
    },
    handleBeforeUpload: function() {
      this.$Message.loading({
        content: "正在上传...",
        duration: 0
      });
    },
    handleSuccess: function(res, file) {
      this.$Message.destroy();
      this.merchantInfo.avatarUrl = res.result.file.innerUrl;
    },
    saveInfo: function() {
      this.$Message.loading({
        content: "保存中...",
        duration: 0
      });
      let tags = []
      for(let x=0;x<this.merchantInfo.tagList.length;x++)
      {
          tags.push({id:'',lableName:''})
          for(let y in this.merchantInfo.tagList[x])
          {
              var obj = {}
              if(y=="id")
              {
                 tags[x].id = this.merchantInfo.tagList[x].id
              }else if(y=="lableName")
              {
                  tags[x].lableName = this.merchantInfo.tagList[x].lableName
              }
          }
      }
      //console.log(imgList)
      Util.ajax({
        method: "post",
        url: baseUri.update_business_info,
        data: {
          "userId":this.$route.params.id,
          "phone":this.merchantInfo.phone,
          "avatarUrl":this.merchantInfo.avatarUrl,
          "nickName":this.merchantInfo.nickname,
          "tagList":tags,
          "address":this.merchantInfo.address,
          "addressLat":this.merchantInfo.addressLat,
          "addressLon":this.merchantInfo.addressLon,
          "companyProfile":this.merchantInfo.companyProfile,
          "companyName":this.merchantInfo.companyName,
          "contact":this.merchantInfo.contact,
          "contactNumber":this.merchantInfo.contactNumber,
          "legalPerson":this.merchantInfo.legalPerson,
          "registeredCapital":this.merchantInfo.registeredCapital,
          "registeredAddress":this.merchantInfo.registeredAddress,
          "mainBusiness":this.merchantInfo.mainBusiness,
          "businessCope":this.merchantInfo.businessCope
        }
      })
        .then(res => {
          if (res.data.success) {
            this.$Message.destroy();
            this.showCloseMadal = true
          } else {
            this.$Message.destroy();
            this.$Message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
      Util.ajax({
      method: "post",
      url: baseUri.get_business_info_url,
      params: {
        userId: this.$route.params.id
      }
    }).then(res => {
      if(res.data.success){
          //console.log(res)
          this.merchantInfo = res.data.data
          this.show=true
      }else{
          this.$Message.error("获取失败")
      }
    }).catch(error=>{
        console.log(error)
    })
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>

