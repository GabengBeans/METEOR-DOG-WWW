<template>
  <div class="expand-manager-detail">
    <div class="basic-info w-container" v-if="show">
      <h2 class="title">基本信息</h2>
      <Row>
        <i-col class="item" span="6">
          <span class="weight">拓展ID：</span>{{data.id}}</i-col>
        <i-col class="item" span="6">
          <span class="weight">手机号：</span>{{data.phone}}</i-col>
        <i-col class="item" span="6">
          <span class="weight">真实姓名：</span>{{data.realname}}</i-col>
        <i-col class="item" span="6">
          <span class="weight">开户时间：</span>{{data.createTime}}</i-col>
      </Row>
      <Row>
        <i-col class="item" span="6">
          <span class="weight">拓展码：</span>{{data.inviterCode}}</i-col>
        <i-col class="item" span="6">
          <span class="weight">拓展状态：</span>{{data.expandStatus == 1 ? '有效' : '无效'}}</i-col>
        <i-col class="item" span="6">
          <span class="weight">佣金返点：</span>
          <i-input class="input" v-model="data.reate"></i-input>
        </i-col>
        <i-col class="item" span="6">
          <span class="weight">结算周期：</span>T +
          <i-input class="input" v-model="data.settlementPeriod"></i-input>
        </i-col>
      </Row>
      <Row>
        <i-col class="item" span="6">
          <span class="weight">角色类型：</span>
          <Select v-model="data.roleType" style="width:80px">
            <Option v-for="item in roleTypeArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </i-col>
        <i-col class="item" span="6" v-if="data.roleType==4">
          <span class="weight">所属分组：</span>
          <Select v-model="data.groupId" style="width:120px">
            <Option v-for="item in data.groupList" :value="item.id" :key="item.id">{{ item.groupName }}</Option>
          </Select>
        </i-col>
      </Row>
      <div class="btn-group">
        <i-button class="btn" type="success" @click="handleEditExpand()">保存修改</i-button>
        <!-- <i-button class="btn" type="error">取消</i-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import Util from "@/libs/util";
////import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
// //import $ from "jquery";

export default {
  data() {
    return {
      data: {},
      show: false,
      roleTypeArr: [
        {
          value: 1,
          label: "boss"
        },
        {
          value: 2,
          label: "代理人"
        },
        {
          value: 4,
          label: "管理员"
        }
      ],
      status: [{ num: 1, name: "有效" }, { num: 2, name: "无效" }]
    };
  },
  methods: {
    handleEditExpand() {
      if (this.beforeSubmit()) {
        this.$Message.loading({
          content: "保存中...",
          duration: 0
        });
        Util.ajax({
          method: "POST",
          url: baseUri.extend_user_edit_extend_user,
          data: {
            id: String(this.$route.params.id),
            extendStatus: String(this.data.expandStatus),
            reate: this.data.reate * 100,
            settlementPeriod: String(this.data.settlementPeriod),
            roleType:String(this.data.roleType),
            groupId:String(this.data.groupId)
          }
        }).then(res => {
          if(res.data.success)
          {
            this.$Message.destroy();
            this.$Message.success("保存成功");
          }else{
            this.$Message.destroy();
            this.$Message.error("保存失败");
          }
        }).catch(error=>{
          this.$Message.destroy()
          console.log(error)
        })
      }
    },
    beforeSubmit() {
      let pattern = /^(\d+)\.(\d+)$/;
      let re = new RegExp(pattern);
      let isNum = re.test(this.data.reate);
      if ((!isNum && this.data.reate != 0) || this.data.reate > 1) {
        this.$Message.error("佣金返点请输入小于1的小数！");
        return false;
      }
      if (this.data.settlementPeriod != 0) {
        var pattern2 = /^\+?[1-9][0-9]*$/;
        var re2 = new RegExp(pattern2);
        var isNum2 = re2.test(this.data.settlementPeriod);
        if (!isNum2) {
          this.$Message.error("结算周期请输入正整数！");
          return false;
        }
      }
      return true;
    }
  },
  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    Util.ajax({
      method: "get",
      url: baseUri.extend_user_detail_url,
      params: {
        queryType: 2,
        userId: this.$route.params.id
      },
      headers: {
        token: Cookies.get("token")
      }
    }).then(res => {
      let obj = res.data.data;
      // console.log(obj)
      for (let x in obj) {
        if (x == "createTime" || x == "updateTime") {
          this.data[x] = Util.formatDate(
            new Date(obj[x]),
            "yyyy-MM-dd hh:mm:ss"
          );
        } else if (x == "reate") {
          this.data[x] = (obj[x] * 0.01).toFixed(2);
        } else {
          this.data[x] = obj[x];
        }
      }
      this.show = true;
      this.$Message.destroy();
    });
  }
};
</script>
<style lang="less">
@import "../../../../styles/public.less";
@import "../../expand.less";
</style>

