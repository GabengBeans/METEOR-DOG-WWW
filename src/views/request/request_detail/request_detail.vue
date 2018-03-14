<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee" v-if="show">
      <Card :bordered="false" style="height:85vh;overflow:auto;">
        <br>
        <div class="user_detail_div">
          <label class="from_label">用户ID:
            <b>{{data.user.id}}</b>
          </label>

          <label class="from_label">姓名:
            <b>{{data.user.nickname}}</b>
          </label>

          <label class="from_label">手机号:
            <b>{{data.user.phone}}</b>
          </label>

          <label class="from_label">流星值:
            <b>{{(parseInt(data.user.meteorScore)/10).toFixed(1)+"分"}}</b>
          </label>

          <label class="from_label">认证信息:
            <Tag color="blue" v-for="item in data.user.selfAuthInfos" :key="item.key" style="line-height:20px;min-width:5vw;height:20px;text-align:center;">{{item}}</Tag>
          </label>

          <label class="from_label">个人标签:
            <Tag color="blue" v-for="item in data.user.tags" :key="item.key" style="line-height:20px;min-width:5vw;height:20px;text-align:center;">{{item}}</Tag>
          </label>
        </div>
        <br><br>
        <div style="color:blue;font-size:22px;text-align:center">
          需求详情
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
          <label class="from_label">有效期至:</label>
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
          <b>{{data.modeTypeData}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">需求位置:</label>
          <b>{{data.address}}</b>
        </div>
        <br>
        <div class="user_detail_media">
          <label class="from_label">需求图片:</label>
          <UserEditImgList :change="false" :imgList="data.mediaImg"></UserEditImgList>
        </div>
        <br>
        <div class="user_detail_media">
          <label class="from_label">需求视频:</label>
          <div class="demo-upload-list" v-if="data.mediaVideoImg">
            <template>
              <img :src="data.mediaVideoImg" @click="handleVideo()" />
            </template>
            <Modal title="视频播放" v-model="videoVisible">
              <video :src="data.mediaVideo" autoplay controls="controls" v-if="videoVisible" style="width: 100%"></video>
            </Modal>
          </div>
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
import UserEditImgList from "@/views/public-components/user_edit_img_list";
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
      console.log(name);
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
        let obj = response.data.data;
        let priceType = ["", "每次", "每小时", "每天", "每件"];
        let priceIndex = parseInt(obj.priceType);
        for (let x in obj) {
          if (x == "expireTime") {
            this.data[x] = Util.formatDate(
              new Date(obj[x]),
              "yyyy-MM-dd hh:mm:ss"
            );
          } else if (x == "price") {
            this.data[x] =
              (parseInt(obj[x]) / 100).toFixed(2) + "/" + priceType[priceIndex];
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
          } else {
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
      });
  },
  components:{
    UserEditImgList
  }
};
</script>
<style>
.user_detail_div {
  border-bottom: 1px solid rgb(219, 207, 207);
}
.user_detail_media {
 border-bottom: 1px solid rgb(219, 207, 207);
}
.from_label {
  margin-left: 3vw;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  display: inline-block;
  min-width: 75px;
  min-height: 16px;
}
.demo-upload-list {
  display: inline-block;
  min-width: 150px;
  min-height: 150px;
  width: 8vw;
  height: 16vh;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
</style>

