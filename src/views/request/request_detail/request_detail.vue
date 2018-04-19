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
            <span>姓名:</span>{{data.user.nickname}}</Col>
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
        </div> -->
        <div class="user_detail_div">
          <label class="from_label">需求图片:</label>
          <UserEditImgList :imgList="data.mediaImg" :detail="true"></UserEditImgList>
        </div>
        <br>
        <div class="user_detail_div">
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
        <br>
        <div v-if="btn" style="text-align:center">
          <Button type="error" @click="showUnder()">下架</Button>
          <Modal v-model="underVisible" title="请输入下架原因" @on-ok="handleUnder()">
            <Input v-model="refuseReason" type="textarea" />
          </Modal>
        </div>
        <br><br>
      </Card>
    </div>
  </div>
</template>
<script>
import Util from "@/libs/util";
import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
import UserEditImgList from "@/views/public-components/upload_img";
import UserEditVideoList from "@/views/public-components/upload_video";
export default {
  data() {
    return {
      aliyun: baseUri.oss_url,
      show: false,
      data: {},
      btn: Boolean,
      imgName: "",
      visible: false,
      video: "",
      videoVisible: false,
      underVisible: false,
      refuseReason: ""
    };
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
    handleUnder() {
      if (this.refuseReason == "") {
        this.$Message.error("下架原因不能为空");
        return false;
      }
      let data = {
        demandId: this.$route.params.id,
        status: 0,
        refuseReason: this.refuseReason
      };
      Util.ajax({
        method: "post",
        url: baseUri.demand_undercarriage_url,
        data: Util.formData(data)
      }).then(response => {
        this.$Message.success("下架成功");
      });
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
          let modeTypeObj = {
            3: "到店服务",
            4: "上门服务",
            5: "场所约见",
            6: "电话服务",
            7: "视频服务",
            8: "其他方式"
          };
          let priceIndex = parseInt(obj.priceType);
          for (let x in obj) {
            if (x == "modeType") {
              let modeTypeStr = '';
              for (let y in modeTypeObj) {
                if (obj[x].indexOf(y) != -1) {
                 modeTypeStr += modeTypeObj[y]+" "
                }
              }
              this.data.modeType = modeTypeStr;
            } else if(x == "expireTime"){
              if (obj[x]) {
                this.data[x] = Util.formatDate(
                  new Date(obj[x]),
                  "yyyy-MM-dd"
                );
              }else{
                this.data[x]=""
              }
            } else if (x == "price") {
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
              for (let y in obj[x]) {
                //console.log(obj.mediaList[y])
                if (obj.mediaList[y].mediaType == 1) {
                  this.data.mediaImg.push(obj.mediaList[y].mediaUrl);
                } else if (obj.mediaList[y].mediaType == 2) {
                  this.data.mediaVideoImg = obj.mediaList[y].videoPhotoUrl;
                  this.data.mediaVideo = obj.mediaList[y].videoPlayUrl;
                }
              }
            }else {
              this.data[x] = obj[x];
            }
          }
          //console.log(this.data.mediaVideoImg)
          this.btn =
            this.data.status == "1" && this.data.businessStatus == "3"
              ? true
              : false;
          this.show = true;
          this.$Message.destroy();
        } else {
          this.$Message.destroy();
          this.$Message.error("获取失败");
        }
      });
  },
  components: {
    UserEditImgList,
    UserEditVideoList
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>

