<template>
    <div id="user_edit" style="background:#eee">
        <Card :bordered="false" v-if="show">
            <div class="user_detail_div">
                <label class="from_label">注册手机号</label>
                <span style="width: 15vw;min-width:100px;">{{merchantInfo.phone}}</span>
            </div>
            <div>
                <label style="
                font-size: 12px;
                line-height: 16px;
                margin-right: 20px;  
                display: inline-block; 
                width: 100px;
                font-weight: bold;
                text-align: right;">头像</label>
                <Avatar :src="aliyun + merchantInfo.avatarUrl" shape="square" class="avatar" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">企业IP昵称</label>
                <span>{{merchantInfo.nickName}}</span>
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
                <Tag color="blue" v-for="item in merchantInfo.tagList" :key="item.key" :name="item.lableName" class="tag-style">{{item.lableName}}</Tag>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">常驻住址</label>
                <span>{{merchantInfo.address}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">企业简介</label>
                <span>{{merchantInfo.companyProfile}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">企业名称</label>
                <span>{{merchantInfo.companyName}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">联系人</label>
                <span>{{merchantInfo.contact}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">联系人电话</label>
                <span>{{merchantInfo.contactNumber}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">企业法人</label>
                <span>{{merchantInfo.legalPerson}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">注册资本</label>
                <span>{{merchantInfo.registeredCapital}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">注册地址</label>
                <span>{{merchantInfo.registeredAddress}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">主营业务</label>
                <span>{{merchantInfo.mainBusiness}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">经营范围</label>
                <span>{{merchantInfo.businessCope}}</span>
            </div>
            <br>
        </Card>
    </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
        show:false,
      aliyun: baseUri.oss_url,
      tag: "",
      arr: [],
      btnStatus: true,
      ruleResult: false,
      merchantInfo: {

      }
    };
  },
  created() {
    //console.log(this.$route);
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

