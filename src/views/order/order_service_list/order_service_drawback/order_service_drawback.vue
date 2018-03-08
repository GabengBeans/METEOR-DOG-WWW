<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee" v-if="show">
      <Card :bordered="false" style="height:85vh;overflow:auto;">
        <br>
        <div style="color:blue;font-size:22px;text-align:center">
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
        <Modal v-model="modalShow" @on-cancel="closePage()">
          <p slot="header" style="color:#f60;text-align:center"></p>
          <div style="font-size:20px;text-align:center">
            <b>已审核</b>
          </div>
          <div slot="footer" style="text-align:center">
            <Button type="success" size="large" @click="closePage()">返回</Button>
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
      modalShow: false
    };
  },
  methods: {
    handleOk() {
      let data = {
        orderId: this.data.orderId,
        orderStatus: 6
      };
      Util.ajax({
        method: "post",
        url: baseUri.order_audit_url,
        data: Util.formData(data)
      })
        .then(response => {
          console.log(response);
          if (response.data.success) {
            console.log("已审核");
            this.modalShow = true;
          } else {
            console.log("审核失败");
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
            console.log("已审核");
            this.modalShow = true;
          } else {
            console.log("审核失败");
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
      this.modalShow = false;
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
          console.log(obj);
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
.user_detail_div {
  border-bottom: 1px solid rgb(219, 207, 207);
}
.from_label {
  margin-left: 3vw;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  display: inline-block;
  min-width: 75px;
  min-height: 16px;
}
</style>
