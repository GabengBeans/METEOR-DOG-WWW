<template>
    <div class="advertNewDetail">
        <Row :gutter='16'>
            <Form label-position="right" :label-width="60">
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="广告名称">
                    <Input clearable v-model="data.adName"></Input>
                </FormItem>
                <FormItem label="上传">
                    <template v-if="data.mediaType==1">
                        <template v-if="!data.imgUrl">
                            图片大小限制2M
                            <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :data="{
                        'type':'user'
                    }" action="https://lxg.91taogu.com/up/">
                                <div>
                                    <Icon type="camera" size="40"></Icon>
                                </div>
                            </Upload>
                        </template>
                        <template v-if="data.imgUrl">
                            <div class="demo-upload-lists">
                                <img :src="data.imgUrl">
                                <div class="demo-upload-list-covers">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(data.imgUrl)"></Icon>
                                </div>
                            </div>
                        </template>
                    </template>
                    <template v-if="data.mediaType==2">
                        <template v-if="!data.imgUrl">
                            视频大小限制200M
                            <Upload ref="upload" 
                            :show-upload-list="false" 
                            :on-success="handleVideoSuccess" 
                            :format="['MP4']" 
                            :max-size="204800" 
                            :on-format-error="handleVideoFormatError" 
                            :on-exceeded-size="handleVideoMaxSize" 
                            :before-upload="handleVideoBeforeUpload" 
                            :data="{
                        'type':'user'
                    }" action="https://lxg.91taogu.com/up/">
                                <div>
                                    <Icon type="camera" size="40"></Icon>
                                </div>
                            </Upload>
                        </template>
                        <template v-if="data.imgUrl">
                            <div class="demo-upload-lists">
                                <img :src="data.imgUrl">
                                <div class="demo-upload-list-covers">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(data.imgUrl)"></Icon>
                                </div>
                            </div>
                        </template>
                    </template>
                </FormItem>
                </Col>
                    <Col :xs='13' :sm='13' :md='8' :lg='4'>
                    <FormItem label="业务">
                        <Input clearable v-model="data.businessId"></Input>
                    </FormItem>
                    </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="业务类型">
                    <Input clearable v-model="data.adType"></Input>
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="序号">
                    <Input clearable v-model="data.creator"></Input>
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="媒体类型">
                    <Select v-model="data.mediaType">
                        <Option :value=1>图片</Option>
                        <Option :value=2>视频</Option>
                    </Select>
                </FormItem>
                </Col>
            </Form>
        </Row>
    </div>
</template>
<script>
export default {
  name: "advertNewDetail",
  props: ["data"],
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      this.data.imgUrl = "";
    },
    handleSuccess(res, file) {
      //console.log(res);
      this.$Message.destroy();
      this.$Message.success("上传成功");
      this.data.imgUrl = res.result.file.outUrl;
    },
    handleVideoSuccess(res, file) {
      //console.log(res);
      this.$Message.destroy();
      this.$Message.success("上传成功");
      this.data.imgUrl = res.result.file.outUrl;
      this.data.videoId = res.result.fiel.videoId
    },
    handleFormatError(file) {
      this.$Notice.warning({
       title: "文件格式错误",
        desc:
          "文件名" +
          file.name +
          " 格式错误, 请选择jpg或png格式."
      });
    },
    handleVideoFormatError(file) {
      this.$Notice.warning({
        title: "视频格式错误",
        desc:
          "视频 " +
          file.name +
          " 格式错误，请上传MP4格式."
      });
      this.$Message.destroy()
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "内容过大",
        desc: "图片" + file.name + "超过2M的限制."
      });
    },
    handleVideoMaxSize(file) {
      this.$Notice.warning({
        title: "内容过大",
        desc: "视频" + file.name + "超过200M的限制."
      });
    },
    handleBeforeUpload(file) {
        this.$$Message.success("上传视频功能暂未开通")
    //   this.$Message.loading({
    //     content: "正在上传...",
    //     duration: 0
    //   });
    },
     handleVideoBeforeUpload(file) {
      this.$Message.loading({
        content: "正在上传...",
        duration: 0
      });
    }
  }
};
</script>
<style>
.demo-upload-lists {
  display: inline-block;
  min-width: 500px;
  min-height: 300px;
  width: 25vw;
  height: 30vh;
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
.demo-upload-lists img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-covers {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  line-height: 300px;
}
.demo-upload-lists:hover .demo-upload-list-covers {
  display: block;
}
.demo-upload-list-covers i {
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
