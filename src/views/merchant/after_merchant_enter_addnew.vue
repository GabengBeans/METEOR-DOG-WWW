<template>
    <div id="user_edit" style="background:#eee">
        <Card :bordered="false">
            <div class="user_detail_div">
                <label class="from_label">注册手机号</label>
                <Input clearable style="width: 15vw;min-width:100px;" v-model='merchantInfo.regPhone' />
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
                <Input clearable style="width: 15vw;min-width:100px;" v-model='merchantInfo.nickname' />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">流星值</label>
                <span>{{merchantInfo.meteorScore}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">余额</label>
                <span>{{merchantInfo.amount}}</span>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">企业标签</label>
                <Input style="width: 5vw;min-width:100px;margin-right:1vw" v-model='tags' />
                <Tag closable @on-close="handleClose" color="blue" v-for="item in merchantInfo.tags" :key="item.key" :name="item.lableName" class="tag-style">{{item.lableName}}</Tag>
                <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">住址</label>
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
                <Input style="width:40vw" type="textarea" v-model="merchantInfo.synopsis" />
            </div>
            <br>
            <div style="border-bottom:1px solid gray"></div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">企业名称</label>
                <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.realname" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">联系人</label>
                <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.linkman" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">联系人电话</label>
                <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.phone" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">企业法人</label>
                <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.corporation" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">注册资本</label>
                <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.regCapital" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">注册地址</label>
                <Input clearable style="width: 15vw;min-width:100px;" v-model="merchantInfo.regAddress" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">主营业务</label>
                <Input style="width:40vw" type="textarea" v-model="merchantInfo.mainBusiness" />
            </div>
            <br>
            <div class="user_detail_div">
                <label class="from_label">经营范围</label>
                <Input style="width:40vw" type="textarea" v-model="merchantInfo.operateRange" />
            </div>
            <br>
            <div style="text-align:center;">
                <Button class="btn-group" type="success" @click.native="saveInfo">保存</Button>
            </div>
        </Card>
    </div>
</template>
<script>
import Util from "@/libs/util";
import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
import axios from "axios";
import $ from "jquery";
import BMapComponent from "../public-components/BMapComponent";
export default {
  data() {
    return {
      imgUrl: baseUri.img_upload_url,
      aliyun: baseUri.oss_url,
      tags: "",
      arr: [],
      merchantInfo: {
        regPhone: "",
        avatarUrl: baseUri.img_url,
        nickname: "",
        meteorScore: "5.0",
        amount: "0",
        tags: [],
        address: "",
        addressLat: "",
        addressLon: "",
        synopsis: "",
        realname: "",
        linkman: "",
        phone: "",
        corporation: "",
        regCapital: "",
        regAddress: "",
        mainBusiness: "",
        operateRange: ""
      }
    };
  },
  components: {
    BMapComponent
  },
  methods: {
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
      if (this.merchantInfo.tags.length >= 3) {
        this.$Message.error("最多添加3组标签");
      } else {
        if (this.tags == "") {
          this.$Message.error("请输入标签内容");
        } else {
          this.merchantInfo.tags.push({ lableName: this.tags, id: "-1" });
          this.tags = "";
          //console.log(this.user_data.listTags);
        }
      }
    },
    handleClose: function(event, name) {
      //删除个人标签
      for (let i = 0; i < this.merchantInfo.tags.length; i++) {
        if (this.merchantInfo.tags[i].lableName == name) {
          this.merchantInfo.tags.splice(i, 1);
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
      if (this.user_data.certificates[0].imageUrls.length > 8) {
        this.$Notice.warning({
          title: "最多上传8张图片"
        });
        return;
      }
      this.$Message.loading({
        content: "保存中...",
        duration: 0
      });
      let imgList = [];
      for (
        let x = 0;
        x < this.user_data.certificates[0].imageUrls.length;
        x++
      ) {
        imgList.push(this.user_data.certificates[0].imageUrls[x]);
      }

      //console.log(imgList)
      Util.ajax({
        method: "post",
        url: baseUri.user_edit_url,
        headers: {
          token: Cookies.get("token")
        },
        params: {
          userId: this.user_data.id
        },
        data: {
          avatarUrl: this.user_data.avatarUrl,
          phone: this.user_data.phone,
          realname: this.user_data.realname,
          sex: this.user_data.sex,
          nickname: this.user_data.nickname,
          adddress: this.user_data.address,
          lat: this.user_data.addressLat,
          lon: this.user_data.addressLon,
          tagList: this.user_data.listTags,
          certificate: imgList,
          certificateContent: this.user_data.certificates[0].content,
          resumeList: this.resumeList
        }
      })
        .then(res => {
          if (res.data.success) {
            this.$Message.destroy();
            this.$Message.success("保存成功");
          } else {
            this.$Message.destroy();
            this.$Message.success("保存失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
@import "../../styles/public.less";
</style>

