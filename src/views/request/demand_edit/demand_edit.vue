<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee" v-if="show">
      <Card :bordered="false">
        <br>
        <Form>
          <div class="title-center">
            需求编辑
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
            <Input clearable style="width: 40vw;min-width:100px;" type="textarea" v-model='data.title' />
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">需求介绍:</label>
            <Input clearable style="width: 40vw;min-width:100px;" type="textarea" v-model='data.desc' />
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">需求限制:</label>
            <Input clearable style="width: 40vw;min-width:100px;" type="textarea" v-model='data.restrictions' />
          </div>
          <br>
          <FormItem>
            <div class="user_detail_div">
              <label class="from_label">需求品类:</label>
              <Select v-model="data.categoryParentId" style="width:150px">
                <Option v-for="item in levelData" :value="item.id" :key="item.value">{{ item.name }}</Option>
              </Select>
            </div>
          </FormItem>
          <br>
          <!-- <FormItem>
            <div class="user_detail_div">
              <label class="from_label">有效期至:</label>
              <b>{{data.expireTime}}</b> -->
              <!-- <Input clearable style="width: 15vw;min-width:100px;"  v-model='data.expireTime' /> -->

              <!-- <template>
                                <DatePicker :value="data.expireTime" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                            </template> -->
            <!-- </div>
          </FormItem>
          <br> -->
          <FormItem>
            <div class="user_detail_div">
              <label class="from_label">出价:</label>
              <Input clearable style="width: 6vw;min-width:100px;" v-model='data.price' />
              <Select v-model="data.priceType" style="width:80px" @on-change="showUnitName(data.priceType)">
                <Option v-for="item in priceType" :value="item.type" :key="item.value">{{ item.name }}</Option>
              </Select>
              <Input v-if="showUnitNames" clearable style="width: 3vw;min-width:80px;" v-model='data.unitName' />
            </div>
          </FormItem>
          <br>
          <FormItem>
            <div class="user_detail_div">
              <label class="from_label">服务方式:</label>
              <CheckboxGroup v-model="data.modeType" style="display:inline-block">
                <Checkbox label=1>线上服务</Checkbox>
                <Checkbox label=2>线下服务</Checkbox>
              </CheckboxGroup>
            </div>
          </FormItem>
          <!-- <FormItem>
            <div class="user_detail_div">
              <label class="from_label">有效天数:</label>
              <Select v-model="data.validDays" style="width:100px">
                <Option value=1>7天</Option>
                <Option value=2>15天</Option>
                <Option value=3>30天</Option>
                <Option value=4>60天</Option>
              </Select>
            </div>
          </FormItem> -->
          <br>
          <div style=" border-bottom: 1px solid rgb(219, 207, 207);">
            <label class="from_label">需求图片:</label>图片限制大小2M
            <UserEditImgList class="image-style" :change="true" :imgList="data.mediaImg" :upload="true"></UserEditImgList>
          </div>
          <br>
          <div style=" border-bottom: 1px solid rgb(219, 207, 207);">
            <label class="from_label">需求视频:</label>
            <UserEditImgList class="image-style" :change="true" :imgList="data.mediaVideoImg" :videoUrl="data.mediaVideo"></UserEditImgList>
          </div>
          <br>
          <FormItem>
            <div class="user_detail_div">
              <label class="from_label">需求区域:</label>
              <Input clearable style="width: 10vw;min-width:100px;" v-model='data.area' />
            </div>
          </FormItem>
          <br>
          <!-- <FormItem style=" border-bottom: 1px solid rgb(219, 207, 207); padding-bottom:1vh">
                        <div>
                            <label class="from_label">需求位置:</label>
                            <AutoComplete clearable :value="data.address" @input="serach_place" style="width: 15vw;min-width:100px;">
                                <Option v-for="item in arr" :value="item" :key="item.key"></Option>
                            </AutoComplete>
                            <br><br>
                            <div>
                                <BMapComponent :lat="data.addressLat" :lon="data.addressLon" :keyword="data.address"></BMapComponent>
                            </div>
                        </div>
                    </FormItem>
                    <br><br> -->
          <div class="title-center">
            需求审核
          </div>
          <br><br>
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
        </Form>
        <div style="text-align:center">
          <Button type="success" @click="saveEdit()">保存修改</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Util from "@/libs/util";
import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
import axios from "axios";
import $ from "jquery";
import UserEditImgList from "../../public-components/user_edit_img_list";
import BMapComponent from "../../public-components/BMapComponent";
export default {
  data() {
    return {
      showUnitNames: false,
      arr: [],
      aliyun: baseUri.oss_url,
      show: false,
      data: {},
      levelData: [],
      imgName: "",
      visible: false,
      video: "",
      videoVisible: false,
      underVisible: false,
      refuseReason: "",
      priceType: [
        {
          type: 1,
          name: "每次"
        },
        {
          type: 2,
          name: "每小时"
        },
        {
          type: 3,
          name: "每天"
        },
        {
          type: 4,
          name: "每件"
        },
        {
          type: 5,
          name: "自定义"
        }
      ]
    };
  },
  components: {
    UserEditImgList,
    BMapComponent
  },
  methods: {
    showUnitName(value) {
      if (value == 5) {
        this.showUnitNames = true;
      } else {
        this.showUnitNames = false;
      }
    },
    beforeSaveEditValidate() {
      if (this.data.title.length > 100) {
        this.$Message.error("服务标题字数不能超过100字");
        return false;
      } else if (this.data.title.length <= 0) {
        this.$Message.error("服务标题不能为空");
        return false;
      }
      if (this.data.desc.length > 1000) {
        this.$Message.error("服务介绍字数不能超过1000字");
        return false;
      } else if (this.data.desc.length <= 0) {
        this.$Message.error("服务介绍不能为空");
        return false;
      }
      if (this.data.mediaImg.length > 8) {
        this.$Notice.warning({
          title: "最多上传8张图片"
        });
        return false;
      }
      if (
        parseInt(this.data.price) < 0 ||
        (parseInt(this.data.price) > 0 && parseInt(this.data.price) < 5)
      ) {
        this.$Notice.warning({
          title: "服务价格只能为0元，或者大于5元"
        });
        return false;
      }
      if (this.data.price.toString().indexOf(".") != -1) {
        this.$Notice.warning({
          title: "服务价格不能输入小数"
        });
        return false;
      }
      return true;
    },
    saveEdit: function() {
      if (this.beforeSaveEditValidate()) {
        this.$Message.loading({
          content: "保存中...",
          duration: 0
        });
        let mediaVideo;
        let modeType = "[" + this.data.modeType + "]";
        //console.log(modeType);
        let price = parseInt(this.data.price) * 100;
        let validDays = "[" + this.data.validDays + "]";
        if (!this.data.mediaVideo) {
          mediaVideo = "";
        } else {
          mediaVideo = this.data.mediaVideo;
        }
        let data = {
          address: this.data.address || "",
          categoryParentId: this.data.categoryParentId,
          desc: this.data.desc,
          id: this.data.id,
          imageList: this.data.mediaImg,
          lat: this.data.addressLat || "",
          lon: this.data.addressLon || "",
          modeType: modeType,
          price: price,
          priceType: this.data.priceType,
          restrictions: this.data.restrictions || "无",
          title: this.data.title,
          validDays: "[]",
          videoList: mediaVideo
        };
        //console.log(data);
        Util.ajax({
          method: "post",
          url: baseUri.demand_update_url,
          data: data
        }).then(response => {
          this.$Message.destroy();
          this.$Message.success("保存成功");
        });
      }
    },
    serach_place: function(event) {
      //搜索百度地图关联地点
      this.data.address = event;
      //console.log(this.userInfo.address)
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
        //jsonpCallback:"show",
      }).then(result => {
        this.arr = [];
        for (let i = 0; i < result.result.length; i++) {
          this.arr.unshift(result.result[i].name);
        }
      });
    },
    handleView(name) {
      //console.log(name);
      this.imgName = name;
      this.visible = true;
    },
    handleVideo() {
      this.videoVisible = true;
    }
  },
  created() {
    let This = this;
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    function getDemandDetail() {
      return Util.ajax.get(baseUri.demand_detail_url, {
        params: {
          demandId: This.$route.params.id
        }
      });
    }
    function getTwoLevel() {
      //console.log(baseUri.category_query_two_level)
      return Util.ajax.get(baseUri.category_query_two_level);
    }

    axios.all([getDemandDetail(), getTwoLevel()]).then(
      axios.spread((response, response1) => {
        //console.log(response);
        if (response.data.success && response1.data.success) {
          let obj = response.data.data;
          for (let x in obj) {
            if (x == "expireTime") {
              // if (obj[x]) {
              //   this.data[x] = Util.formatDate(
              //     new Date(obj[x]),
              //     "yyyy-MM-dd hh:mm:ss"
              //   );
              // } else {
              //   this.data[x] = "";
              // }
            } else if (x == "price") {
              this.data[x] = parseInt(obj[x]) / 100;
            } else if (x == "priceType") {
              this.data[x] = parseInt(obj.priceType);
            } else if (x == "updateTime") {
              this.data[x] = Util.formatDate(
                new Date(obj[x]),
                "yyyy-MM-dd hh:mm:ss"
              );
            } else if (x == "mediaList") {
              this.data.mediaImg = [];
              for (let y = 0; y < obj[x].length; y++) {
                //console.log(obj.mediaList[y])
                if (obj.mediaList[y].mediaType == 1) {
                  this.data.mediaImg.push(obj.mediaList[y].mediaUrl);
                } else if (obj.mediaList[y].mediaType == 2) {
                  this.data.mediaVideoImg = obj.mediaList[y].videoPhotoUrl;
                  this.data.mediaVideo = obj.mediaList[y].videoPlayUrl;
                }
              }
            } else if (x == "modeType") {
              this.$set(
                this.data,
                "modeType",
                obj[x].replace(/[\[*\]]/g, "").split(",")
              );
              //console.log(this.data.modeType)
            } else if (x == "deposit") {
              this.data.deposit = parseInt(obj[x]) / 100;
            } else if (x == "periodTypes") {
              this.$set(
                this.data,
                "periodTypes",
                obj[x].replace(/[\[*\]]/g, "").split(",")
              );
              //console.log(this.data.periodTypes)
            } else {
              this.data[x] = obj[x];
            }
          }
          this.levelData = response1.data.data;
          //console.log(this.levelData)
          //console.log(this.data);
          this.showUnitNames = this.data.priceType == 5 ? true : false;
          this.show = true;
          this.$Message.destroy();
        } else {
          this.$Message.destroy();
          this.$Message.error("读取失败");
        }
      })
    );
    // .catch(error => {
    //   console.log(error);
    // });
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>

