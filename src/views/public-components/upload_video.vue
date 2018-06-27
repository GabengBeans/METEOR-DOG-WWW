<template>
  <div>
    <div class="demo-upload-list" v-if="uploadList">
      <img :src="uploadList" />
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView()" style="margin-right:10px"></Icon>
        <Icon v-if="!detail" type="ios-trash-outline" @click.native="handleRemove(uploadList)"></Icon>
      </div>
    </div>
    <div class="demo-upload-list" v-if="showProgress">
      <Progress :percent="progress" hide-info></Progress>
    </div>

    <Upload v-if="upload" ref="upload" :show-upload-list="false" :before-upload="handleBeforeUpload" :action="imgUrl" type="drag" style="display: inline-block;width:99px;">
      <div style="height:99px;weigth:99px;line-height:118px;">
        <Icon type="ios-videocam" size="40"></Icon>
      </div>
    </Upload>

    <Modal title="播放视频" v-model="visible">
      <video :src="videoUrlList" controls="controls" v-if="visible" style="width: 100%"></video>
    </Modal>
  </div>
</template>

<script>
import util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      imgUrl: "",
      uploadAuth: "",
      uploadAddress: "",
      videoId: "",
      //aliyun: baseUri.oss_url,
      visible: false,
      uploadList: this.imgList,
      videoUrlList: this.videoUrl,
      progress: 0,
      showProgress: false
    };
  },
  props: ["imgList", "videoUrl", "type", "upload", "change", "detail"],
  methods: {
    handleView() {
      if (this.type) {
        util.ajax({
            method: "get",
            url: baseUri.get_play_url,
            params: {
              videoId:this.videoUrl
            }
          })
          .then(resp => {
            if (resp.data.success) {
              this.videoUrlList = resp.data.data.PlayInfoList.PlayInfo[1].PlayURL
              this.visible = true;
            } else {
              this.$Message.error("视频获取失败");
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.visible = true;
      }
    },
    handleRemove(file) {
      this.uploadList = false;
      this.$store.state.app.videoId = "";
    },
    // handleFormatError(file) {
    //   this.$Message.destroy();
    //   this.$Notice.warning({
    //     title: "视频格式错误",
    //     desc: "视频名:" + file.name + "只能是mp4格式."
    //   });
    // },
    // handleMaxSize(file) {
    //   this.$Message.destroy();
    //   this.$Notice.warning({
    //     title: "内容过大",
    //     desc: "视频" + file.name + "超过200M的限制."
    //   });
    // },
    handleBeforeUpload(file) {
      if (this.uploadList) {
        this.$Message.error("只能上传一个视频");
        return;
      }
      let titleStr = file.name.slice(0, file.name.indexOf("."));
      util.ajax({
        method: "get",
        url: baseUri.create_video_address_url,
        params: {
          fileName: file.name,
          title: titleStr,
          cateId: 1,
          tags: 1,
          desc: file.type
        }
      })
        .then(res => {
          if (res.data.success) {
            let This = this;
            let obj = res.data.data;
            let reqCount;
            let maxCount = 10;
            var uploader = new AliyunUpload.Vod({
              //分片大小默认1M，不能小于100K
              partSize: 1048576,
              //并行上传分片个数，默认5
              parallel: 5,
              //网络原因失败时，重新上传次数，默认为3
              retryCount: 3,
              //网络原因失败时，重新上传间隔时间，默认为2秒
              retryDuration: 2,
              // 开始上传
              onUploadstarted: function(uploadInfo) {
                This.progress = 0;
                This.showProgress = true;
                uploader.setUploadAuthAndAddress(
                  uploadInfo,
                  obj.uploadAuth,
                  obj.uploadAddress,
                  obj.videoId
                );
                console.log("开始上传");
              },
              // 文件上传成功
              onUploadSucceed: function(uploadInfo) {
                console.log("上传成功");
                //console.log(uploadInfo);
                recursionReq();
                function recursionReq() {
                  reqCount++;
                  if (reqCount > maxCount) {
                    This.destroy();
                    This.$Message.error("上传失败，请重新上传");
                    return;
                  }
                  setTimeout(function() {
                    util.ajax({
                      method: "get",
                      url: baseUri.get_play_url,
                      params: {
                        videoId: uploadInfo.videoId
                      }
                    }).then(res => {
                      //console.log(res)
                      // console.log(typeof res.data);
                      if (typeof res.data == "object" && res.data.success) {
                        This.uploadList = res.data.data.VideoBase.CoverURL;
                        This.videoUrlList =
                          res.data.data.PlayInfoList.PlayInfo[1].PlayURL;
                        This.$store.state.app.videoId = uploadInfo.videoId;
                        This.$Message.destroy();
                        This.progress = 100;
                        This.showProgress = false;
                        This.$Message.success("上传成功");
                      } else {
                        recursionReq();
                      }
                    });
                  }, 3000);
                }
              },
              // 文件上传失败
              onUploadFailed: function(uploadInfo, code, message) {
                console.log(code);
                console.log(message);
                This.$Message.destroy();
                This.$Message.error("上传失败");
                This.showProgress = false;
                console.log("上传失败");
              },
              // 文件上传进度，单位：字节
              onUploadProgress: function(uploadInfo, totalSize, loadedPercent) {
                //console.log("上传进度" + totalSize + "|" + loadedPercent);
                This.progress = loadedPercent * 90;
                //console.log(This.progress)
              },
              // 上传凭证超时
              onUploadTokenExpired: function(uploadInfo) {
                console.log("上传凭证超时");
                //上传方式1  实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
                // uploader.resumeUploadWithAuth(uploadAuth);
                // 上传方式2 实现时，从新获取STS临时账号用于恢复上传
                // uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expireTime);
              },
              //全部文件上传结束
              onUploadEnd: function(uploadInfo) {
                //console.log(uploader);
                console.log("上传完成");
              }
            });
            uploader.addFile(file, null, null, null, null);
            uploader.startUpload();
            this.$Message.loading({
              content: "正在上传,如果视频文件较大，请耐心等待...",
              duration: 0
            });
          } else {
            this.$Message.error("上传失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
      //}
      return false;
    }
  }
}; //:on-progress ="handleProgress"
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
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
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  line-height: 120px;
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
