<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee" v-if="show">
      <Card :bordered="false">
        <div class="title-center">
          需求详情
        </div>
        <div class="infos">
          <Row class="row">
            <Col span="6">
            <span>用户ID:</span>{{data.user.id}}</Col>
            <Col span="6">
            <span>昵称:</span>{{data.user.nickname}}</Col>
            <Col span="6">
            <span>手机号:</span>{{data.user.phone}}</Col>
            <Col span="6">
            <span>流星值:</span>{{(parseInt(data.user.meteorScore)/10).toFixed(1)+"分"}}</Col>
          </Row>
          <Row class="row">
            <Col span="6">
            <span>认证信息:</span>
            <Tag color="blue" v-for="item in data.user.selfAuthInfos" :key="item.key" class="tag-style">{{item}}</Tag>
            </Col>
            <Col span="18">
            <span>个人标签:</span>
            <Tag color="blue" v-for="item in data.user.tags" :key="item.key" class="tag-style">{{item}}</Tag>
            </Col>
          </Row>
        </div>

        <br>
        <div class="user_detail_div">
          <label class="from_label">需求ID:</label>
          <b>{{data.id}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求标题:</label>
          <b>{{data.title}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求介绍:</label>
          <b>{{data.desc}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求品类:</label>
          <b>{{data.categoryName}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">预约时间:</label>
          <b>{{data.expireTime}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求限制:</label>
          <b>{{data.restrictions}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">出价:</label>
          <b>{{data.price}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">流星钻标价:</label>
          <b v-if="data.priceMd">{{data.priceMd +"克拉"}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求置顶权重:</label>
          <b>{{data.topall}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">分类置顶权重:</label>
          <b>{{data.topcategory}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求方式:</label>
          <b>{{data.modeType}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求区域:</label>
          <b>{{data.area}}</b>
        </div>
        <br>
        <!-- <div class="user_detail_div">
          <label class="from_label">需求位置:</label>
          <b>{{data.address}}</b>
        </div>
        <br> -->
        <div class="user_detail_media">
          <label class="from_label">需求图片:</label>
          <UserEditImgList :imgList="data.mediaImg" :detail="true"></UserEditImgList>
        </div>
        <br>
        <div class="user_detail_media">
          <label class="from_label">需求视频:</label>
          <UserEditVideoList  :detail="true" :imgList="data.mediaVideoImg" :videoUrl="data.mediaVideo" ></UserEditVideoList>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">审核时间:</label>
          <b>{{data.updateTime}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">操作人:</label>
          <b>{{data.operator}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">不通过原因:</label>
          <b>{{data.refuseReason}}</b>
        </div>
        <br><br>
        <div style="text-align:center" v-if="data.businessStatus=='2'">
          <Button type="success" @click="reviewSuccess()">通　过</Button>
          <Button type="error" @click="showUnder()">不通过</Button>
          <Modal v-model="underVisible" title="请输入不通过原因" @on-ok="reviewFail()">
            <Input v-model="refuseReason" type="textarea" />
          </Modal>
        </div>
        <br><br>
      </Card> 
      <Modal v-model="modalShow" width="360" @on-cancel="closePage()">
        <p slot="header" style="color:#2d8cf0;text-align:center"></p>
        <div style="font-size:20px;text-align:center">
          <b>已审核</b>
        </div>
        <div slot="footer" style="text-align:center">
          <Button type="success" size="large" @click="closePage()">返回</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import Util from "@/libs/util";
//import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
import UserEditImgList from "@/views/public-components/upload_img";
import UserEditVideoList from "@/views/public-components/upload_video";
export default {
  data() {
    return {
      modalShow: false,
      aliyun: baseUri.oss_url,
      show: false,
      data: {},
      imgName: "",
      visible: false,
      video: "",
      videoVisible: false,
      underVisible: false,
      refuseReason: ""
    };
  },
  components:{
    UserEditImgList,
    UserEditVideoList
  },
  methods: {
    handleView(name) {
      //console.log(name);
      this.imgName = name;
      this.visible = true;
    },
    handleVideo() {
      this.videoVisible = true;
    },
    showUnder() {
      this.underVisible = !this.underVisible;
    },
    reviewSuccess() {
      if(!this.data.title)
      {
        this.$Message.error("审核失败，需求标题不能为空")
        return false
      }else if(!this.data.desc){
        this.$Message.error("审核失败，需求介绍不能为空")
        return false
      }else if(this.data.modeTypeData=="线下" && !this.data.area)
      {
        this.$Message.error("审核失败，需求区域不能为空")
        return false
      }
      let data = {
        demandId: this.$route.params.id,
        businessStatus: 3,
        refuseReason: this.refuseReason
      };
      Util.ajax({
        method: "post",
        url: baseUri.demand_autit_url,
        data: Util.formData(data)
      })
        .then(response => {
          //console.log(response);
          if (response.data.success) {
            this.modalShow = true;
          } else {
            this.$Message.error("审核失败,请联系管理员");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    reviewFail() {
      if (this.refuseReason == "") {
        this.$Message.error("不通过原因不能为空");
        return false;
      }
      let data = {
        demandId: this.$route.params.id,
        businessStatus: 5,
        refuseReason: this.refuseReason
      };
      Util.ajax({
        method: "post",
        url: baseUri.demand_autit_url,
        data: Util.formData(data)
      })
        .then(response => {
          if (response.data.success) {
            this.modalShow = true;
            //this.$Message.success("已审核");
          } else {
            this.$Message.success("审核失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    closePage() {
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
      this.$router.go(-1);
      this.modalShow = false;
    }
  },
  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    Util.ajax
      .get(baseUri.demand_detail_url, {
        params: {
          demandId: this.$route.params.id
        }
      })
      .then(response => {
        //console.log(response.data.data);
        if (response.data.success) {
          let obj = response.data.data;
          let priceType = ["", "每次", "每小时", "每天", "每件", "自定义"];
          let priceIndex = parseInt(obj.priceType);
          let modeTypeObj = {
            3: "到店服务",
            4: "上门服务",
            5: "场所约见",
            6: "电话服务",
            7: "视频服务",
            8: "其他方式"
          };
          for (let x in obj) {
            if (x == "expireTime") {
              if (obj[x]) {
                this.data[x] = Util.formatDate(
                  new Date(obj[x]),
                  "yyyy-MM-dd"
                );
              }else{
                this.data[x]=""
              }
            }else if(x == "modeType"){
              let modeTypeStr = '';
              for (let y in modeTypeObj) {
                if (obj[x].indexOf(y) != -1) {
                 modeTypeStr += modeTypeObj[y]+" "
                }
              }
              this.data.modeType = modeTypeStr;
            }else if (x == "price") {
              if (priceType[priceIndex] === "自定义") {
                this.data[x] =
                  (parseInt(obj[x]) / 100).toFixed(2) + "/" + obj.unitName;
              } else {
                this.data[x] =
                  (parseInt(obj[x]) / 100).toFixed(2) +
                  "/" +
                  priceType[priceIndex];
              }
            } else if (x == "updateTime") {
              this.data[x] = Util.formatDate(
                new Date(obj[x]),
                "yyyy-MM-dd hh:mm:ss"
              );
            } else if (x == "mediaList") {
              this.data.mediaImg = [];
               this.data.mediaVideoImg = []
              this.data.mediaVideo = []
              for (let y in obj[x]) {
                //console.log(obj.mediaList[y])
                if (obj.mediaList[y].mediaType == 1) {
                  this.data.mediaImg.push(obj.mediaList[y].mediaUrl);
                } else if (obj.mediaList[y].mediaType == 2) {
                   this.data.mediaVideoImg.push(obj.mediaList[y].videoPhotoUrl)
                  this.data.mediaVideo.push(obj.mediaList[y].videoPlayUrl)
                }
              }
            }else if(x=="title"){
              if(obj[x].length>=30)
              {
                this.data[x] = obj[x].slice(0,30)+"..."
              }else{
                this.data[x] = obj[x]
              }
            } else {
              this.data[x] = obj[x];
            }
          }
          //console.log(this.data.mediaVideoImg)
          this.show = true;
          this.$Message.destroy();
        } else {
          this.$Message.destroy();
          this.$Message.error("读取失败");
        }
      });
  }
};
</script>
<style>
@import "../../../styles/public.less";
.demo-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 60px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
</style>

