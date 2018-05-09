<template>
    <div>
        <Form label-position="right" :label-width="80" class="search">
            <Row>
                <Col :xs='24' :sm='12' :md='8' :lg='6'>
                <FormItem label="服务ID">
                    <Input clearable style="min-width:100px" />
                </FormItem>
                </Col>
                <Col :xs='24' :sm='12' :md='8' :lg='6'>
                <FormItem label="IP昵称" >
                    <Input clearable style="min-width:100px" />
                </FormItem>
                </Col>
                <Col :xs='24' :sm='12' :md='8' :lg='6'>
                <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search">搜索</Button>
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
                        <Input clearable v-model="serviceId"  style="min-width:100px;width:200px"  />
                    </FormItem>
                    <FormItem label="序号" >
                        <Input clearable v-model="adSort"  style="min-width:100px;width:200px" />
                    </FormItem>
                    <FormItem label="推广图片" >
                        <div>
                            <uploadSingleImg :imgUrl="imgUrl1" :upload="true" :change="true" :detail="true"></uploadSingleImg>
                            <uploadSingleImg :imgUrl="imgUrl2" :upload="true" :change="true" :detail="true"></uploadSingleImg>
                            <uploadSingleImg :imgUrl="imgUrl3" :upload="true" :change="true" :detail="true"></uploadSingleImg>
                            <uploadSingleImg :imgUrl="imgUrl4" :upload="true" :change="true" :detail="true"></uploadSingleImg>
                            <uploadSingleImg :imgUrl="imgUrl5" :upload="true" :change="true" :detail="true"></uploadSingleImg>
                            <uploadSingleImg :imgUrl="imgUrl6" :upload="true" :change="true" :detail="true"></uploadSingleImg>                            
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
import util from "@/libs/util"
import base_uri from "@/libs/base_uri"
import uploadSingleImg from "@/views/public-components/upload_single_img"
export default {
  data() {
    return {
      showAddRecommendIp: false,
      serviceId:'',
      adSort:'',
      imgUrl1:'',
      imgUrl2:'',
      imgUrl3:'',
      imgUrl4:'',
      imgUrl5:'',
      imgUrl6:'',
    };
  },
  methods:{
      saveAddRecommendIp:function(){
          this.$Message.success({

          })
          util.ajax({
              method:"post",
              url:base_uri.add_recommend_url,
              data:{
                  serviceId:this.serviceId,
                  adSort:this.adSort,
                  imgUrl1:this.imgUrl1,
                  imgUrl2:this.imgUrl2,
                  imgUrl3:this.imgUrl3,
                  imgUrl4:this.imgUrl4,
                  imgUrl5:this.imgUrl5,
                  imgUrl6:this.imgUrl6
              }
          }).then(result=>{
              if(res.data.success)
              {
                  this.showAddRecommendIp = false
                  this.$Message.destroy()
                  this.$Message.success("保存成功！")
              }else{
                  this.$Message.destroy()
                  this.$Message.error("保存失败")
              }
          }).catch(err=>{
              console.log(err)
          })
      }
  },
  components:{
      uploadSingleImg
  }
};
</script>
<style>

</style>

