<template>
    <div class="advertNewDetails">
        <Row :gutter='16'>
            <Form label-position="right" :label-width="60" >
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem style="min-width:60px" label="广告位">
                    <Select v-model="level">
                        <Option v-for="item in tags" :key="item.key" :value="item.level">{{item.positionName}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem style="min-width:60px" label="子广告位" v-if="name">
                    <Select v-model="data.positionId">
                        <Option v-for="item in name" :key="item.key" :value="item.id">{{item.positionName}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Form>
        </Row>
        <Row :gutter='16'>
            <Form label-position="right" :label-width="70" ref="advert_new_add" :model="data" :rules="ruleValidate">
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="广告名称" prop="adName">
                    <Input clearable v-model="data.adName" />
                </FormItem>
                <FormItem label="上传">
                  <template v-if="data.imgUrl" >
                      <div class="demo-upload-lists">
                        <img :src="data.imgUrl" />
                          <div class="demo-upload-list-covers">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(data.imgUrl)"></Icon>
                          </div>
                      </div>
                    </template>
                    <template v-if="data.mediaType==1">
                        <template v-if="!data.imgUrl">
                            图片大小限制2M
                            <Upload ref="upload" 
                            :show-upload-list="false" 
                            :on-success="handleSuccess" 
                            :format="['jpg','jpeg','png']" 
                            :max-size="2048" 
                            :on-format-error="handleFormatError" 
                            :on-exceeded-size="handleMaxSize" 
                            :before-upload="handleBeforeUpload" 
                            :data="{'type':'user'}" 
                            action="https://lxg.91taogu.com/up/">
                            <div>
                                <Icon type="camera" size="40"></Icon>
                            </div>
                            </Upload>
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
                            :data="{'type':'user'}" 
                            action="https://lxg.91taogu.com/up/">
                            <div>
                              <Icon type="camera" size="40"></Icon>
                            </div>
                            </Upload>
                        </template>
                    </template>
                    
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="业务ID" prop="businessId">
                    <Input  v-model="data.businessId" />
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="业务类型" prop="adType">
                    <Input clearable v-model="data.adType" />
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="序号" prop="adSort">
                    <Input v-model="data.adSort" />
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='4'>
                <FormItem label="媒体类型" >
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
import Util from "@/libs/util"
import baseUri from "@/libs/base_uri"
export default {
  name: "advertNewDetails",
  props: ["data"],
  data() {
    return {
      tags: [],
      level: "",
      names: [],
      ruleValidate:{
        adName: [
                { required: true, message: '广告名称不能为空'}
              ],
        businessId: [
                        { required: true, message: '业务ID不能为空'},
                    ], 
        adType:[
          {required:true,message:"业务类型不能为空"}
        ],
        adSort:[
          {required:true,message:"序号不能为空"}
        ]
      }
    };
  },
  computed: {
    name: function() {
      let arr = [];
      if (this.level) {
        for (let x = 0; x < this.names.length; x++) {
          if (this.level == this.names[x].level) {
            arr.push(this.names[x]);
          }
        }
      }
      if (arr.length) {
        this.data.positionId = arr[0].id;
      }
      return arr;
    }
  },
  methods: {
    handleRemove(file) {
      //console.log(1111)
      console.log(this.data.imgUrl)
      this.data.imgUrl = "";
    },
    handleSuccess(res, file) {
      if(res.success)
      {
        this.$Message.destroy();
        this.$Message.success("图片上传成功");
        this.data.imgUrl = res.result.file.outUrl;
        console.log(this.data.imgUrl)
      }
    },
    handleVideoSuccess(res, file) {
      this.$Message.destroy();
      this.$Message.success("视频上传成功");
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
      this.$Message.loading({
        content: "正在上传...",
        duration: 0
      });
    },
     handleVideoBeforeUpload(file) {
      this.$Message.loading({
        content: "正在上传...",
        duration: 0
      });
    }
  },
  created(){
      Util.ajax({
      method: "get",
      url: baseUri.new_advert_position_list_two_level_advert_position_url
    })
      .then(res => {
        //console.log(res.data.data)
        if (res.data.success) {
          let objLevel = [];
          let objName = [];
          let objNames = [];
          let arr = res.data.data;
          for (let x = 0; x < arr.length; x++) {
            objLevel[x] = {};
            //objLevel[x].id = arr[x].id
            objLevel[x].positionName = arr[x].positionName;
            objLevel[x].level = arr[x].level;
            let subArr = arr[x];
            //console.log(subArr)
            for (let y = 0; y < subArr.subPositionResults.length; y++) {
              objName[y] = {};
              objName[y].level = subArr.subPositionResults[y].level;
              objName[y].id = subArr.subPositionResults[y].id;
              objName[y].positionName =
                subArr.subPositionResults[y].positionName;
              objNames.push(objName[y]);
            }
          }
          this.tags = objLevel;
          this.names = objNames;
          this.data.positionId = objNames[0].id;
          this.level = objLevel[0].level;
        } else {
          this.$Message.error("获取信息失败");
        }
      })
      .catch(error => {
        console.log(error);
      });
    //this.$store.state.app.advert_new_search_info =
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
