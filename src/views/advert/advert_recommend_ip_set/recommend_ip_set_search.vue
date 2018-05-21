<template>
  <div>
    <Form label-position="right" :label-width="80" class="search">
      <Row>
        <Col :xs='24' :sm='12' :md='8' :lg='6'>
        <FormItem label="服务ID">
          <Input clearable style="min-width:100px" v-model="searchServiceId" />
        </FormItem>
        </Col>
        <Col :xs='24' :sm='12' :md='8' :lg='6'>
        <FormItem label="标题">
          <Input clearable style="min-width:100px" v-model="searchName" />
        </FormItem>
        </Col>
        <Col :xs='24' :sm='12' :md='8' :lg='6'>
        <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click="searchRecommendIp">搜索</Button>
        </Col>
        <Col :xs='24' :sm='12' :md='8' :lg='6'>
        <Button type="success" @click="showAddRecommendIp=true">添加推荐IP</Button>
        </Col>
      </Row>
    </Form>
    <Modal v-model="showAddRecommendIp" width="800" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加推荐IP</span>
      </p>
      <div>
        <Form label-position="right" :label-width="80">
          <FormItem label="服务ID">
            <Input clearable v-model="serviceId" style="min-width:100px;width:200px" />
            <Button type="success" style="margin-left:1vw" @click="getServiceDetail">服务详情</Button>
          </FormItem>
          <FormItem label="序号">
            <Input clearable v-model="adSort" style="min-width:100px;width:200px" />
          </FormItem>
          <FormItem label="标题">
            <Input clearable v-model="serviceName" style="min-width:100px;width:200px" />
          </FormItem>
          <FormItem label="推广图片">
            <div>
              <uploadSingleImg :imgUrl="imgObj1" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj2" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj3" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj4" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj5" :upload="true" :change="true" :detail="true"></uploadSingleImg>
              <uploadSingleImg :imgUrl="imgObj6" :upload="true" :change="true" :detail="true"></uploadSingleImg>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="success" @click="saveAddRecommendIp">保存</Button>
        <Button type="error" style="margin-left:3vw" @click="showAddRecommendIp=false">取消</Button>
      </div>
    </Modal>
    <Modal v-model="showServiceDetail" width="800" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>服务详情</span>
      </p>
      <div>
        <Form label-position="right" :label-width="80">
          <FormItem label="服务标题">
            <span>{{serviceName}}</span>
          </FormItem>
          <FormItem label="推广图片">
            <div >
              <uplaodImg :imgList="imgList" :upload="false" :change="false" :detail="true"></uplaodImg>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" @click="closeServiceDetail">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import uploadSingleImg from "@/views/public-components/upload_single_img";
import uplaodImg from "@/views/public-components/upload_img"
export default {
  data() {
    return {
      searchServiceId: "",
      searchName: "",
      showAddRecommendIp: false,
      showServiceDetail:false,
      serviceId: "",
      adSort: "",
      serviceName: "",
      imgObj1: {
        imgUrl: ""
      },
      imgObj2: {
        imgUrl: ""
      },
      imgObj3: {
        imgUrl: ""
      },
      imgObj4: {
        imgUrl: ""
      },
      imgObj5: {
        imgUrl: ""
      },
      imgObj6: {
        imgUrl: ""
      },
      imgList:[]
    }
  },
  methods: {
    init: function() {
      this.adSort = "";
      this.serviceId = "";
      this.serviceName = "";
      this.imgObj1.imgUrl = "";
      this.imgObj2.imgUrl = "";
      this.imgObj3.imgUrl = "";
      this.imgObj4.imgUrl = "";
      this.imgObj5.imgUrl = "";
      this.imgObj6.imgUrl = "";
      this.imgList = []
    },
    saveAddRecommendIp: function() {
      if (
        !this.imgObj1.imgUrl ||
        !this.imgObj2.imgUrl ||
        !this.imgObj3.imgUrl ||
        !this.imgObj4.imgUrl ||
        !this.imgObj5.imgUrl ||
        !this.imgObj6.imgUrl
      ) {
        this.$Message.error("请上传6张图片");
        return;
      }
      this.$Message.loading({
        duration: 0,
        content: "保存中..."
      });
      util
        .ajax({
          method: "post",
          url: base_uri.add_recommend_url,
          data: {
            serviceId: this.serviceId,
            adSort: this.adSort,
            name: this.serviceName,
            imgUrl1: this.imgObj1.imgUrl,
            imgUrl2: this.imgObj2.imgUrl,
            imgUrl3: this.imgObj3.imgUrl,
            imgUrl4: this.imgObj4.imgUrl,
            imgUrl5: this.imgObj5.imgUrl,
            imgUrl6: this.imgObj6.imgUrl
          }
        })
        .then(res => {
          if (res.data.success) {
            this.showAddRecommendIp = false;
            this.init();
            this.searchRecommendIp();
            this.$Message.destroy();
            this.$Message.success("保存成功！");
          } else {
            this.$Message.destroy();
            this.$Message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchRecommendIp: function() {
      let data = {
        serviceId: this.searchServiceId,
        name: this.searchName
      };
      this.$store.commit("GET_RECOMMEND_FOR_PAGE_INFO", {
        data: data,
        pageNo: this.$store.state.app.recommend_ip_public_page
      });
    },
    getServiceDetail() {
      if(!this.serviceId )
      {
        this.$Message.error("请填写服务ID")
        return
      }
      if(!Number(this.serviceId)){
        this.$Message.error("请正确填写服务ID")
        return
      }
      this.showServiceDetail=true
      util.ajax({
        method:'get',
        url:base_uri.service_detail_url,
        params:{
           serviceId:this.serviceId
        }
      }).then(resp=>{
        if(resp.data.success){
          const obj = resp.data.data
          this.serviceName = obj.title
          for(let i=0; i<obj.mediaList.length;i++)
          {
            if(obj.mediaList[i].businessType==1)
            {
              this.imgList.push(obj.mediaList[i].mediaUrl)
            }
          }
        }else{
          this.$Message.error("没有这个服务")
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    closeServiceDetail(){
      this.showServiceDetail = false;
      let length = this.imgList.length
      for(let i=0;i<length;i++)
      {
        this.imgList.pop()
      }
    }
  },
  components: {
    uploadSingleImg,
    uplaodImg
  }
};
</script>
<style>
</style>

