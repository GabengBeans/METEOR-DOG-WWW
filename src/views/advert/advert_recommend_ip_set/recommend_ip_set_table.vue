<template>
  <div id='user_table' class="table">
    <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.recommend_ip_search_result">
    </Table>
    <Modal v-model="showEditRecommendIp" width="800">
      <p slot="header" style="color:#f60;text-align:center">
        <span>编辑推荐IP</span>
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
        <Button type="success" @click="saveEditRecommendIp">保存</Button>
        <Button type="error" style="margin-left:3vw" @click="showEditRecommendIp=false">取消</Button>
      </div>
    </Modal>
    <Modal v-model="showServiceDetail" width="800" :mask-closable="false" :closable="false" style="z-index:999" >
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
              <uplaodImg :imgList="imgArray" :upload="false" :change="false" :detail="true"></uplaodImg>
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
  name: "user_table",

  data() {
    return {
      showEditRecommendIp: false,
      showServiceDetail:false,
      id:"",
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
       imgArray:[],
      imgList:{
        imgUrl1:"",
        imgUrl2:"",
        imgUrl3:"",
        imgUrl4:"",
        imgUrl5:"",
        imgUrl6:"",
      },
      columns: [
        {
          title: "序号",
          key: "adSort",
          width: 160
        },
        {
          title: "服务ID",
          key: "serviceId"
        },
        {
          title: "标题",
          key: "name",
          ellipsis: "false"
        },
        {
          title: "状态",
          key: "display"
        },
        {
          title: "操作",
          key: "phone",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let data = {
                        id: params.row.id
                      };
                      util
                        .ajax({
                          method: "post",
                          url: base_uri.search_recommend_for_page_url,
                          params: {
                            pageNo: 1,
                            pageSize: 1
                          },
                          data: data
                        })
                        .then(res => {
                          if (res.data.success) {
                            this.showEditRecommendIp = true;
                            let obj = res.data.data.items[0];
                            this.serviceId = obj.serviceId;
                            this.id = obj.id
                            this.adSort = obj.adSort;
                            this.serviceName = obj.name;
                            this.imgList.imgUrl1 = this.imgObj1.imgUrl = obj.imgUrl1;
                            this.imgList.imgUrl2 = this.imgObj2.imgUrl = obj.imgUrl2;
                            this.imgList.imgUrl3 = this.imgObj3.imgUrl = obj.imgUrl3;
                            this.imgList.imgUrl4 = this.imgObj4.imgUrl = obj.imgUrl4;
                            this.imgList.imgUrl5 = this.imgObj5.imgUrl = obj.imgUrl5;
                            this.imgList.imgUrl6 = this.imgObj6.imgUrl = obj.imgUrl6;
                          } else {
                            this.$Message.error("信息获取失败");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  attrs: {
                    id: "recommend_ip_btn" + params.row._rowKey
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let oBtn = document.getElementById(
                        "recommend_ip_btn" + params.row._rowKey
                      );
                      let oSpan = oBtn.getElementsByTagName("span")[0];
                      let displayData = params.row.display == "已上线" ? 0 : 1;
                      util
                        .ajax({
                          method: "post",
                          url: base_uri.up_recommend_url,
                          data: {
                            id: params.row.id,
                            name: params.row.name,
                            display: displayData
                          }
                        })
                        .then(res => {
                          if (res.data.success) {
                            params.row.display =
                              params.row.display == "已上线"
                                ? "已下线"
                                : "已上线";
                            this.$Message.success(oSpan.innerHTML + "成功！");
                          } else {
                            this.$Message.error(oSpan, innerHTML + "失败");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }
                },
                params.row.display == "已上线" ? "下线" : "上线"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      util
                        .ajax({
                          method: "post",
                          url: base_uri.del_recommend_url,
                          params: {
                            id: params.row.id
                          }
                        })
                        .then(res => {
                          if (res.data.success) {
                            this.$store.commit("GET_RECOMMEND_FOR_PAGE_INFO", {
                              data: this.$store.state.app
                                .recommend_ip_search_info,
                              pageNo: this.$store.state.app
                                .recommend_ip_public_page
                            });
                            this.$Message.success("移除成功！");
                          } else {
                            this.$Message.error("移除失败");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    saveEditRecommendIp() {
      // if (
      //   !this.imgObj1.imgUrl ||
      //   !this.imgObj2.imgUrl ||
      //   !this.imgObj3.imgUrl ||
      //   !this.imgObj4.imgUrl ||
      //   !this.imgObj5.imgUrl ||
      //   !this.imgObj6.imgUrl
      // ) {
      //   this.$Message.error("至少上传6张图片");
      //   return;
      // }
      for(let i=1;i<7;i++)
      {
        let imgObj = `imgObj${i}`
        // if(this[imgObj].imgUrl == ""){//""字符串是不上传或删除产生的
        //   this[imgObj].imgUrl = ""
        // }
        let imgUrl = `imgUrl${i}`
        if(this.imgList[imgUrl] == this[imgObj].imgUrl){
          this[imgObj].imgUrl = null
        }
      }
      
      this.$Message.loading({
        duration: 0,
        content: "保存中..."
      });
      util
        .ajax({
          method: "post",
          url: base_uri.up_recommend_url,
          data: {
            id:this.id,
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
            this.showEditRecommendIp =false
            this.$Message.destroy();
            this.$Message.success("保存成功！");
          } else {
            this.$Message.destroy();
            this.$Message.error("保存失败");
          }
        })
        .catch(err => {
          console.log(err);
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
              this.imgArray.push(obj.mediaList[i].mediaUrl)
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
      let length = this.imgArray.length
      for(let i=0;i<length;i++)
      {
        this.imgArray.pop()
      }
    }
  },
  components: {
    uploadSingleImg,
    uplaodImg
  }
};
</script>
