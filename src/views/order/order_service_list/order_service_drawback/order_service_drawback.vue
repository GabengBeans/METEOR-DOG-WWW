<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee" v-if="show">
      <Card :bordered="false">
        <br>
        <div class="title-center">
          服务订单退款申请
        </div>
        <br><br>
        <div class="user_detail_div">
          <label class="from_label">项目状态:</label>
          <b>{{data.isService}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">退款原因:</label>
          <b>{{data.drawbackInfo}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">退款用户:</label>
          <b>{{data.drawbackName}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">联系方式:</label>
          <b>{{data.phone}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">订单编号:</label>
          <b>{{data.orderNo}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">项目名称:</label>
          <b>{{data.title}}</b>
        </div>
        <br><br>
        <div style="text-align:center">
          <Button type="success" @click="handleOk()">通　过</Button>
          <Button type="error" @click="handleNo()">不通过</Button>
        </div>

        <Modal v-model="modalShow" >
          <p slot="header"></p>
          <div style="width:100%;font-size:20px;text-align:center">
            <b>需要打开地址进行下一步退款操作:</b>
            <a @click="enterZFB" style="width:100%;font-size:12px;display:block;text-align:left;word-wrap:break-word;" target="_blank" :href="urlStr">{{urlStr}}</a>
          </div>
          <div slot="footer" style="text-align:center">
          </div>
        </Modal>

        <Modal v-model="aamodalShow" >
          <p slot="header" style="text-align:center">提示</p>
          <div style="width:100%;font-size:20px;text-align:center">
            <b>您是否已经在支付宝平台完成退款?</b>
          </div>
          <div slot="footer" style="display:flex;justify-content:space-around">
            <Button type="error" @click="aamodalShow = false">否</Button>
             <Button type="success" @click="closePage">是</Button>
          </div>
        </Modal>
      </Card>
    </div>
  </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      data: {},
      show: false,
      modalShow: false,
      aamodalShow:false,
      urlStr:""
    };
  },
  methods: {
    enterZFB(){
      this.modalShow = false
      this.aamodalShow  = true
    },
    handleOk() {
      let data = {
        orderId: this.data.orderId,
        orderStatus: 5
      };
      Util.ajax({
        method: "post",
        url: baseUri.order_audit_url,
        data: Util.formData(data)
      })
        .then(response => {
          if (response.data.success) {
            let index = response.data.data.failureMsg.indexOf(':')+1
            this.urlStr = response.data.data.failureMsg.slice(index)
            this.modalShow = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleNo() {
      let data = {
        orderId: this.data.orderId,
        orderStatus: 7
      };
      Util.ajax({
        method: "post",
        url: baseUri.order_audit_url,
        data: Util.formData(data)
      })
        .then(response => {
          console.log(response);
          if (response.data.success) {
            this.$Message.success("审核成功")
            this.modalShow = true;
          } else {
            this.$Message.error("审核失败")
            this.modalShow = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    closePage() {
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[0];
      let len = pageOpenedList.length;
      for (let i = 1; i < len; i++) {
        if (pageOpenedList[i].name === this.$route.name) {
          if (i < len - 1) {
            lastPageObj = pageOpenedList[i + 1];
          } else {
            lastPageObj = pageOpenedList[i - 1];
          }
          break;
        }
      }
      this.$store.commit("removeTag", this.$route.name);
      this.$store.commit("closePage", this.$route.name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
      this.$router.back(-1);
      this.$Message.success("退款成功")
      this.aamodalShow = false;
    }
  },
  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    Util.ajax({
      method: "get",
      url: baseUri.order_drawback_detail_url,
      params: {
        orderId: this.$route.params.id
      }
    })
      .then(response => {
        if (response.data.success) {
          let obj = response.data.data;
          //console.log(obj);
          for (let x in obj) {
            if (x == "isService") {
              if (obj[x] == 1) {
                this.data.isService = "已服务";
              } else {
                this.data.isService = "未服务";
              }
            } else {
              this.data[x] = obj[x];
            }
          }
          this.show = true;
          this.$Message.destroy();
        } else {
          this.$Message.destroy()
          this.$Message.error("读取失败");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
@import "../../../../styles/public.less";
</style>
