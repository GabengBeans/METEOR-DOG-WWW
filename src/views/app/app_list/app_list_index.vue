<template>
  <div>
    <br>
    <Button type="primary" style="margin-left:16px" @click.native="addApps()">添加APP</Button>
    <Table></Table>
    <Page :storeStatus="status" :currentPage="$store.state.app.app_page_info.currentPage" :totalPage="$store.state.app.app_page_info.totalPage"></Page>
    <Modal v-model="showAddApp" width="360" @on-cancel="showAddApp=false" @on-ok="saveApp()">
      <p slot="header" style="color:#f60;text-align:center">
        <span>上传APP</span>
      </p>
      <div style="text-align:center">
        <Form :label-width="90" label-position="left">
          <FormItem label="app版本号">
            <Input clearable v-model="appData.appVersion" />
          </FormItem>
          <FormItem label="内部版本号">
            <Input clearable v-model="appData.appExternalVersion" />
          </FormItem>
          <FormItem label="上传文件">
            <Upload ref="upload" 
            :action="upload_resources_url" 
            :format="['apk']" 
            :data="{'fileType':2}" 
            :before-upload="handleBeforeUpload" 
            :on-progress="handleProgress" 
            :on-success="handleOk">
              <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
            </Upload>
          </FormItem>
          <FormItem label="强制更新">
            <RadioGroup v-model="updateStatus">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="描述">
            <Input type="textarea"  v-model="appData.description" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import Table from "./app_list_table.vue";
import util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import Page from "@/views/public-components/changePage";
export default {
  data() {
    return {
      upload_resources_url:util.upload_resources_url,
      status: "appList",
      appData: {
        appVersion: "",
        appUrl: "",
        description: "",
        appExternalVersion:""
      },
      updateStatus:"是",
      showAddApp: false
    };
  },
  methods: {
    handleBeforeUpload(){
      this.$Message.loading({
        content:"读取文件...",
        duration:0
      })
      return true
    },
    handleProgress(event,file,fielList){
      if(event.percent==100)
      {
        this.$Message.destroy()
        this.$Message.success("读取成功！")
        this.$Message.loading({
        content:"上传中，请等待...",
        duration:0
      })
      }
    },
    handleOk(res, file) {
      //console.log(res)
      if (res.success) {
        this.$Message.destroy()
        this.$Message.success("上传成功！")
        this.appData.appUrl = res.data.fileUrl;
      }else{
        this.$Message.destroy()
        this.$Message.error("上传失败，请重新上传")
      }
    },
    addApps() {
      for (let x in this.appData) {
        this.appData[x] = "";
      }
      this.showAddApp = true;
      this.$refs.upload.clearFiles()
    },
    saveApp() {
      if(this.updateStatus=="是")
      {
        this.updateStatus=1
      }else{
        this.updateStatus=0
      }
      let data = {
        appVersion: this.appData.appVersion,
        appUrl: this.appData.appUrl,
        description: this.appData.description,
        updateStatus:this.updateStatus,
        appExternalVersion:this.appData.appExternalVersion
        //appExternalVersion:0
      };
      //console.log(data)
        util.ajax({
        method: "post",
        url: baseUri.app_add_url,
        data: util.formData(data)
      })
        .then(res => {
          if (res.data.success) {
            this.$store.commit("GET_APP_SEARCH_INFO", { data: {}, pageNo: 1 });
            this.$Message.success("添加成功");
          } else {
            this.$Message.error("添加失败");
          }
        }).catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    Table,
    Page
  },
  created() {
    this.$store.commit("GET_APP_SEARCH_INFO", {
      data: {},
      pageNo: this.$store.state.app.app_public_page
    });
  }
};
</script>
<style>
@import "../../../styles/public.less"
</style>
