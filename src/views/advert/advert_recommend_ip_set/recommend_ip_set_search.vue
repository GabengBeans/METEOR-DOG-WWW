<template>
    <div>
        <Form label-position="right" :label-width="80" class="search">
            <Row>
                <Col :xs='24' :sm='12' :md='8' :lg='6'>
                <FormItem label="服务ID">
                    <Input clearable style="min-width:100px" v-model="searchServiceId" />
                </FormItem>
                </Col>
                <!-- <Col :xs='24' :sm='12' :md='8' :lg='6'>
                <FormItem label="IP昵称" >
                    <Input clearable style="min-width:100px" />
                </FormItem>
                </Col> -->
                <Col :xs='24' :sm='12' :md='8' :lg='6'>
                <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click="searchRecommendIp">搜索</Button>
                </Col>
                <Col :xs='24' :sm='12' :md='8' :lg='6'>
                <Button type="success" @click="showAddRecommendIp=true">添加推荐IP</Button>
                </Col>
            </Row>
        </Form>
        <Modal v-model="showAddRecommendIp" width="800">
            <p slot="header" style="color:#f60;text-align:center">
                <span>添加推荐IP</span>
            </p>
            <div>
                <Form label-position="right" :label-width="80">
                    <FormItem label="服务ID">
                        <Input clearable v-model="serviceId" style="min-width:100px;width:200px" />
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
                <Button type="error" style="margin-left:3vw">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import uploadSingleImg from "@/views/public-components/upload_single_img";
export default {
  data() {
    return {
        searchServiceId:"",
      showAddRecommendIp: false,
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
      }
    };
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
            serviceId:this.searchServiceId
        }
      this.$store.commit("GET_RECOMMEND_FOR_PAGE_INFO", {
        data: data,
        pageNo: this.$store.state.app.recommend_ip_public_page
      });
    }
  },
  components: {
    uploadSingleImg
  }
};
</script>
<style>

</style>

