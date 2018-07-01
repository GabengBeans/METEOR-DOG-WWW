<template>
  <div>
    <public-search :data="search" :storeStatus="storeStatus"></public-search>
    <public-table :columns="columns" :data="$store.state.app.dynamic_search_result"></public-table>
    <public-change-page :storeStatus="storeStatus" :currentPage="$store.state.app.dynamic_page_info.currentPage" :totalPage="$store.state.app.dynamic_page_info.totalCount"></public-change-page>
    <Modal v-model="showAuditModal" width="800" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>动态审核</span>
      </p>
      <div>
        <Form style="border-bottom:1px solid gray" :label-width="100">
          <Row type="flex" justify="space-around">
            <Col span="6">
            <FormItem label="用户ID：">
              <span>{{dynamicDetail.userId}}</span>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="昵称：">
              <span>{{dynamicDetail.nickname}}</span>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="手机号：">
              <span>{{dynamicDetail.phone}}</span>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="流星值：">
              <span>{{Number.parseFloat(dynamicDetail.meteorScore/10).toFixed(1)}}</span>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="12">
            <FormItem label="认证信息：">
              <Tag color="blue" v-for="item in dynamicDetail.selfAuthInfos" :key="item.key">{{item}}</Tag>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="个人标签：">
              <Tag color="blue" v-for="item in dynamicDetail.tags" :key="item.key">{{item}}</Tag>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <Form style="margin-top:30px" :label-width="120">
          <Row type="flex" justify="start">
            <Col span="24">
            <FormItem label="动态文本：">
              <span>{{dynamicDetail.content}}</span>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="24">
            <FormItem label="动态图片和视频：">
              <upload-img style="display:inline" v-if="imgUrlArr.length>0" :imgList="imgUrlArr" :detail="true"></upload-img>
              <template v-if="videoObj.length>0">
                <upload-video style="display:inline" v-for="item in videoObj" :key="item.videoId" :imgList="item.videoImg" :videoUrl="item.videoId" :detail="true" :type="item.type"></upload-video>
              </template>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start" v-if="audioUrl">
            <Col span="24">
            <FormItem label="动态音频：">
              <a :href="audioUrl">下载</a>
              <!-- <Button type="info" @click="playAudio(audioUrl)">播放</Button> -->
              <div style="width:1px;height:1px;" id="playerQT"> </div>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" style="display:flex;justify-content: space-around;">
        <Button type="error" @click="showAuditDismissedMoadl=true">驳回</Button>
        <Button type="success" @click="auditDynamic('2')">通过</Button>
      </div>
    </Modal>
    <Modal v-model="showDetailModal" width="800" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>动态详情</span>
      </p>
      <div>
        <Form style="border-bottom:1px solid gray" :label-width="100">
          <Row type="flex" justify="space-around">
            <Col span="6">
            <FormItem label="用户ID：">
              <span>{{dynamicDetail.userId}}</span>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="昵称：">
              <span>{{dynamicDetail.nickname}}</span>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="手机号：">
              <span>{{dynamicDetail.phone}}</span>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="流星值：">
              <span>{{Number.parseFloat(dynamicDetail.meteorScore/10).toFixed(1)}}</span>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="12">
            <FormItem label="认证信息：">
              <Tag color="blue" v-for="item in dynamicDetail.selfAuthInfos" :key="item.key">{{item}}</Tag>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="个人标签：">
              <Tag color="blue" v-for="item in dynamicDetail.tags" :key="item.key">{{item}}</Tag>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <Form style="margin-top:30px" :label-width="120">
          <Row type="flex" justify="start">
            <Col span="24">
            <FormItem label="动态文本：">
              <span>{{dynamicDetail.content}}</span>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="24">
            <FormItem label="动态图片和视频：">
              <upload-img style="display:inline" v-if="imgUrlArr.length>0" :imgList="imgUrlArr" :detail="true"></upload-img>
              <template v-if="videoObj.length>0">
                <upload-video style="display:inline" v-for="item in videoObj" :key="item.videoId" :imgList="item.videoImg" :videoUrl="item.videoId" :detail="true" :type="item.type"></upload-video>
              </template>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start" v-if="audioUrl">
            <Col span="24">
            <FormItem label="动态音频：">
              <a :href="audioUrl">下载</a>
              <!-- <Button type="info" @click="playAudio(audioUrl)">播放</Button> -->
              <div style="width:1px;height:1px;" id="playerQT"> </div>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" @click="showDetailModal=false">返回</Button>
      </div>
    </Modal>
    <Modal v-model="showAuditDismissedMoadl" width="500">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>不通过原因</span>
      </p>
      <div style="text-align:center">
        <Input type="textarea" :rows="4" v-model="DismissedReason" placeholder="请输入不通过原因" />
      </div>
      <div slot="footer">
        <Button type="success" @click="auditDynamic('3')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import publicSearch from "@/views/public-components/search";
import publicTable from "@/views/public-components/table";
import publicChangePage from "@/views/public-components/changePage";
import uploadImg from "@/views/public-components/upload_img";
import uploadVideo from "@/views/public-components/upload_video";
import config from "./config";
export default {
  data() {
    return {
      search: config.dynamicSearch,
      storeStatus: "dynamic",
      showAuditModal: false,
      showDetailModal: false,
      showAuditDismissedMoadl: false,
      audioUrl: "",
      imgUrlArr: [],
      videoObj: [],
      DismissedReason: "",
      dynamicId: "",
      dynamicDetail: {},
      columns: [
        {
          title: "动态ID",
          key: "id"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "发布时间",
          key: "createTime"
        },
        {
          title: "审核时间",
          key: "auditTime"
        },
        {
          title: "审核状态",
          key: "businessStatus"
        },
        {
          title: "操作",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                    disabled: params.row.status == "禁用" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.videoObj = [];
                      this.imgUrlArr = [];
                      util
                        .ajax({
                          method: "get",
                          url: base_uri.dynamic_detail_url,
                          params: {
                            userId: params.row.userId,
                            dynamicId: params.row.id
                          }
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.dynamicDetail = resp.data.data;
                            this.dynamicDetail.medias.map(item => {
                              if (item.mediaType == 1) {
                                this.imgUrlArr.push(item.mediaUrl);
                              } else if (item.mediaType == 2) {
                                this.videoObj.push({
                                  videoImg:
                                    base_uri.oss_video_img_url +
                                    item.mediaUrl +
                                    "00001.jpg",
                                  videoId: item.mediaUrl,
                                  type: "id"
                                });
                              } else if (item.mediaType == 6) {
                                this.audioUrl =
                                  base_uri.oss_url + item.mediaUrl;
                              }
                            });
                            this.showDetailModal = true;
                          } else {
                            this.$Message.error("获取失败");
                          }
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled:
                      params.row.businessStatus != "待审核" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.videoObj = [];
                      this.imgUrlArr = [];
                      util
                        .ajax({
                          method: "get",
                          url: base_uri.dynamic_detail_url,
                          params: {
                            userId: params.row.userId,
                            dynamicId: params.row.id
                          }
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.dynamicDetail = resp.data.data;
                            this.dynamicDetail.medias.map(item => {
                              if (item.mediaType == 1) {
                                this.imgUrlArr.push(item.mediaUrl);
                              } else if (item.mediaType == 2) {
                                this.videoObj.push({
                                  videoImg:
                                    base_uri.oss_video_img_url +
                                    item.mediaUrl +
                                    "00001.jpg",
                                  videoId: item.mediaUrl,
                                  type: "id"
                                });
                              } else if (item.mediaType == 6) {
                                this.audioUrl =
                                  base_uri.oss_url + item.mediaUrl;
                              }
                            });
                            this.showAuditModal = true;
                          } else {
                            this.$Message.error("获取失败");
                          }
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
                  }
                },
                "审核"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    auditDynamic(value) {
      this.audioFun(value);
    },
    audioFun(status) {
      let params = {};
      if (status == "2") {
        params = {
          dynamicId: this.dynamicDetail.id,
          businessStatus: status
        };
      } else if (status == "3" && this.DismissedReason) {
        params = {
          dynamicId: this.dynamicDetail.id,
          businessStatus: status,
          refuseReason: this.DismissedReason
        };
      } else {
        this.$Message.error("请填写不通过原因");
        return;
      }
      util
        .ajax({
          method: "post",
          url: base_uri.dynamic_audit,
          params: params
        })
        .then(resp => {
          if (resp.data.success) {
            this.$Message.success("审核成功");
            this.$store.commit("GET_DYNAMIC_LIST", {
              data: this.$store.state.app.dynamic_search_info,
              pageNo: this.$store.state.app.dynamic_public_page
            });
            this.DismissedReason = "";
            this.showAuditDismissedMoadl = false;
            this.showAuditModal = false;
          } else {
            this.$Message.error("审核失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    playAudio(url) {
      let html =
        '<ltembed width="1px" height="1px" name="plugin" src="' +
        url +
        '" type="audio/amr" id="QT_EMB">';
      console.log($("#playerQT")[0]);
      $("#playerQT")[0].innerHTML = html;
    }
  },
  components: {
    publicSearch,
    publicTable,
    publicChangePage,
    uploadImg,
    uploadVideo
  },
  created() {
    this.$store.commit("GET_DYNAMIC_LIST", {
      data: this.$store.state.app.dynamic_search_info,
      pageNo: this.$store.state.app.dynamic_public_page
    });
  }
};
</script>
<style>
@import "../../styles/public.less";
</style>
