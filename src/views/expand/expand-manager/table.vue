<template>
  <div id='user_table'>
      <div class="btns">
        <i-button class="btn" type="primary" @click="handleImport()">批量导入</i-button>
        <i-button class="btn" type="primary" @click="handleDownload()">下载模板</i-button>
        <i-button class="btn" type="primary" @click="handleExport()">批量导出</i-button>      
      </div>
      <Modal v-model="showModal" title="请选择文件">
        <Upload ref="upload"
          :action="uploadUrl"
          :format="['xls','xlsx']"
          name="file"
          :headers="headers"
          :before-upload="handleBeforeUpload"
          :show-upload-list="true"
          type="select"
          :on-success="handleSuccess"
          :on-format-error="handleFormatError"
          :on-error="handleError">
          <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
        </Upload>
        <!-- <form action="" enctype="multipart/form-data">
          <input type="file" name="file" >
        </form> -->
        
      </Modal>
      <Table style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.expand_search_result">
      </Table>
  </div>
   
</template>
<style>
  .btns{
    margin: 0 30px 15px;
  }
  .btns .btn{
    margin-right: 10px;
  }
</style>

<script>
import Util from '@/libs/util'
import baseUri from '@/libs/base_uri'
import baseConfig from '@/libs/base_config'
import Cookies from "js-cookie"
export default {
  name: "user_table",

  data() {
    return {
      uploadUrl: baseConfig.proUrl + baseUri.extend_user_import_url,
      headers:{
        token: Cookies.get("token")
      },
      showModal: false,
      columns: [
        {
          title: "拓展人ID",
          key: "id"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "代理人",
          key: "nickname"
        },
        {
          title: "拓展码",
          key: "inviterCode"
        },
        {
          title: "拓展状态",
          key: "expandStatus"
        },
        {
          title: "拓展用户数",
          key: "allExtendUserCount"
        },
        {
          title: "本月拓展用户",
          key: "extendUserCount"
        },
        {
          title: "本月交易笔数",
          key: "extendServiceCount"
        },
        {
          title: "本月交易金额(元)",
          key: "tradeAmount"
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
                        this.$router.push("/expand-manager-detail/"+params.row.id)
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/expand-manager-edit/"+params.row.id) 
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
    handleDownload() {
      window.open(baseUri.expand_people_template_url)
    },
    handleImport() {
      this.showModal = true
    },
    handleBeforeUpload() {
      // this.$Message.loading({
      //   content: "正在上传...",
      //   duration: 0
      // });
    },
    handleSuccess() {
      this.$Message.destroy();
      this.$Message.success('上传成功！');
    },
    handleFormatError() {
      // this.$Notice.warning({
      //   title: "文件格式不正确",
      //   desc:
      //     "请上传 xls xlsx 格式文件"
      // });
      this.$Message.error('文件格式不正确，请上传 xls xlsx 格式文件');
    },
    handleError() {
      this.$Message.error('上传失败！');
    },
    // 批量导出
    handleExport() {
      let dataform = {};
      dataform = this.$store.state.app.expand_search_info   
      window.open(baseConfig.proUrl + baseUri.extend_user_export_url + "?jsonStr=" + encodeURIComponent(JSON.stringify(dataform)))
    }
  }
};
</script>
