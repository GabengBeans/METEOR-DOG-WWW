<template>
    <div id='user_table' class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.app_search_result">
        </Table>
        <Modal v-model="showEditApp" width="360" @on-cancel="showEditApp=false" @on-ok="saveApp()">
      <p slot="header" style="color:#f60;text-align:center">
        <span>上传APP</span>
      </p>
      <div style="text-align:center">
        <Form :label-width="90" label-position="left">
          <FormItem label="app版本号">
            <Input clearable v-model="appData.appVersion" />
          </FormItem>
          <FormItem label="上传文件">
            <Upload ref="upload" action="http://39.106.51.236:9091/oss/v1/upload" :format="['apk']" :data="{
                            'fileType':2
                        }" :before-upload="handleBeforeUpload" :on-progress="handleProgress" :on-success="handleOk">
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
            <Input type="textarea" clearable v-model="appData.description" />
          </FormItem>
        </Form>
      </div>
    </Modal>
    </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  name: "user_table",
  data() {
    return {
      showEditApp:false,
      appData:{},
      updateStatus:"是",
      columns: [
        {
          title: "app版本号",
          key: "appVersion"
        },
        {
          title: "上传时间",
          key: "createTime"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "强制更新",
          key: "updateStatus"
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
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        this.showEditApp=true
                        this.appData = params.row
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
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
      }
      //this.file.appUrl =
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
        //appExternalVersion:0
      };
      //console.log(data)
      Util.ajax({
        method: "post",
        url: baseUri.app_add_url,
        data: Util.formData(data)
      })
        .then(res => {
          if (res.data.success) {
            this.$store.commit("GET_APP_SEARCH_INFO", { data: {}, pageNo: 1 });
            this.$Message.success("添加成功");
          } else {
            this.$Message.error("添加失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
}
</script>
