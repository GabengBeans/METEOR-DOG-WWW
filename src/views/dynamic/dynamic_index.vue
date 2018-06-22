<template>
    <div>
        <public-search :data="search" :storeStatus="storeStatus"></public-search>
        <public-table :columns="columns" :data="$store.state.app.dynamic_search_result"></public-table>
        <public-change-page :storeStatus="storeStatus" :currentPage="$store.state.app.dynamic_page_info.currentPage" :totalPage="$store.state.app.dynamic_page_info.totalCount"></public-change-page>
        <Modal v-model="showAuditModal" width="800">
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
                        <FormItem label="昵称：" >
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
                            <span>1111111111111</span>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="个人标签：">
                            <span>11111</span>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Form style="margin-top:30px" :label-width="120">
                    <Row type="flex" justify="start">
                        <Col span="24">
                        <FormItem label="动态文本：">
                            <span>1111111111111</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span="24">
                        <FormItem label="动态图片和视频：">
                            <span>1111111111111</span>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer" style="display:flex;justify-content: space-around;">
                <Button type="success">通过</Button>
                <Button type="error">驳回</Button>
            </div>
        </Modal>
        <Modal v-model="showDetailMOdal" width="800">
            <p slot="header" style="color:#f60;text-align:center">
                <span>动态详情</span>
            </p>
            <div>

            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error">返回</Button>
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
import config from "./config";
export default {
  data() {
    return {
      search: config.dynamicSearch,
      storeStatus: "dynamic",
      showAuditModal: false,
      showDetailMOdal: false,
      dynamicId:"",
      dynamicDetail:{},
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
                        
                      this.showDetailMOdal = true;
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                    //disabled: params.row.businessStatus != "待审核" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        util.ajax({
                            method:"get",
                            url:base_uri.dynamic_detail_url,
                            params:{
                                userId:params.row.userId,
                                dynamicId:params.row.id
                            }
                        }).then(resp=>{
                            if(resp.data.success){
                                this.dynamicDetail = resp.data.data
                                this.showAuditModal = true;
                            }else{
                                this.$Message.error("获取失败")
                            }
                        }).catch(error=>{
                            console.log(error)
                        })
                      
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
  components: {
    publicSearch,
    publicTable,
    publicChangePage
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
