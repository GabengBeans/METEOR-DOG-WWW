<template>
    <div>
        <div class="demo-upload-list" v-if="videoUrl" >
           <template v-if="imgList">
                <img :src="imgList">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(imgList)" style="margin-right:10px"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveVideoImg(imgList)"></Icon>
                </div>
           </template>
        </div>
        <div class="demo-upload-list" v-else v-for="item in uploadList" :key="item.key">
            <template v-if="item">
                <img :src="aliyun + item">
                <div class="demo-upload-list-cover" v-if="change">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)" style="margin-right:10px"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
        </div>



        <!-- <Upload v-if="videoUrl" ref="upload" 
        :show-upload-list="false"
        :on-success="handleSuccess" 
        :format="['mp4']" 
        :max-size="204800" 
        :on-format-error="handleFormatError" 
        :on-exceeded-size="handleMaxSizeVideo" 
        :before-upload="handleBeforeUploadVideo"
        :data="{
          'type':'user'
          }"
        type="drag" 
        action="https://lxg.91taogu.com/up/" 
        style="display: inline-block;width:200px;">
            <div style="width: 198px;height:198px;line-height: 198px;">
                <Icon type="camera" size="40"></Icon>
            </div>
        </Upload> -->
        <template v-if="upload">
          <div v-if="videoUrl"></div>
        <Upload v-else ref="upload" 
        :show-upload-list="false"
        :on-success="handleSuccess" 
        :format="['jpg','jpeg','png']" 
        :max-size="2048" 
        :on-format-error="handleFormatError" 
        :on-exceeded-size="handleMaxSize" 
        :before-upload="handleBeforeUpload"
        :data="{
          'type':'user'
          }"
        multiple 
        type="drag" 
        action="https://lxg.91taogu.com/up/" 
        style="display: inline-block;width:99px;">
            <div style="height:99px;line-height:118px;">
                <Icon type="camera" size="40" style="margin-top:10px;"></Icon>
            </div>
        </Upload>
        </template>
        
        <Modal v-if="videoUrl" title="播放视频" v-model="visible">
        <video :src="videoUrl" autoplay controls="controls" v-if="visible" style="width: 100%"></video>
        </Modal>
        <Modal v-else title="展示大图" v-model="visible">
        <img :src="aliyun + imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      aliyun: baseUri.oss_url,
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  props: ["imgList","videoUrl","upload","change"],
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.imgList;
      this.imgList.splice(fileList.indexOf(file), 1);
    },
    handleRemoveVideoImg(file) {
      this.imgList=""
      this.videoUrl=""
    },
    handleSuccess(res, file) {
      this.$Message.destroy();
      //console.log(res)
      this.uploadList.push(res.result.file.innerUrl);
      //console.log(this.uploadList)
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "内容过大",
        desc: "图片" + file.name + "超过2M的限制."
      });
    },
     handleMaxSizeVideo(file) {
      this.$Notice.warning({
        title: "内容过大",
        desc: "视频" + file.name + "超过200M的限制."
      });
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 8;
      if (!check) {
        this.$Notice.warning({
          title: "最多上传8张图片"
        });
      } else {
        this.$Message.loading({
          content: "正在上传...",
          duration: 0
        });
      }
      return check;
    },
    handleBeforeUploadVideo(file){
      const check = this.uploadList.length <=1;
      if (!check) {
        this.$Notice.warning({
          title: "最多上传一个视频"
        });
      } else {
        this.$Message.loading({
          content: "正在上传...",
          duration: 0
        });
      }
      return check;
    }
  },
  
  created() {
    this.uploadList = this.imgList;
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px; 
  text-align: center;
  line-height:60px;
  /* border: 1px solid transparent; */
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
