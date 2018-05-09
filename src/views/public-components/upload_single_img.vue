<template>
  <div style="display:inline-block">
    <div class="demo-upload-list" v-if="uploadImg" >
        <img :src="aliyun + uploadImg">
        <div class="demo-upload-list-cover" >
          <Icon type="ios-eye-outline" @click.native="handleView(uploadImg)" style="margin-right:10px"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(uploadImg)"></Icon>
        </div>
    </div>
    <template v-if="!uploadImg" >
    <Upload v-if="upload"  ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="5120" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :data="{
          'type':'user'
          }" multiple :type="uploadImg?'select':'drag'" :action="imgUrl" style="display: inline-block;width:99px;margin-right:10px">
      <div style="height:99px;line-height:118px;">
        <Icon type="camera" size="40" style="margin-top:10px;"></Icon>
      </div>
    </Upload>
    </template>
    <Modal title="展示大图" v-model="visible">
      <img :src="aliyun + imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      imgUrl: baseUri.img_upload_url,
      aliyun: baseUri.oss_url,
      imgName: "",
      visible: false,
      uploadImg: this.img_url
    };
  },
  //change:是否可上传   detail:是否查看。浮层
  props: ["img_url", "upload", "change", "detail"],
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
     this.uploadImg=""
    },
    handleSuccess(res, file) {
      this.$Message.destroy();
      this.uploadImg = res.result.file.innerUrl
      //console.log(this.uploadList)
    },
    handleFormatError(file) {
      this.$Message.destroy();
      this.$Notice.warning({
        title: "图片格式错误",
        desc:
          "图片名:" +file.name +"只能是jgp,jegp,png格式"
      });
    },
    handleMaxSize(file) {
      this.$Message.destroy();
      this.$Notice.warning({
        title: "内容过大",
        desc: "图片" + file.name + "超过5M的限制."
      });
    },
    handleBeforeUpload(file) {
      this.$Message.destroy();
      // const check = this.uploadList.length < 8;
      // if (!check) {
      //   this.$Notice.warning({
      //     title: "最多上传8张图片"
      //   });
      // } else {
        this.$Message.loading({
          content: "正在上传...",
          duration: 0
        });
      //}
      return true;
    }
  },

};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 60px;
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
