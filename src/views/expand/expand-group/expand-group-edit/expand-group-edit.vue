<template>
    <div class="expand-manager-detail">
        <div class="basic-info w-container" v-if="show">
          <h2 class="title">编辑代理组</h2>
          <Row>
            <i-col class="item weight" align="right" style="font-size:14px;margin-top:35px;" span="4" offset="3">代理组名称：</i-col>
            <i-col class="item" style="font-size:14px;"  span="10"><i-input type="text" v-model="data.groupName"></i-input></i-col>
          </Row>
          <div class="btn-group">
            <i-button class="btn" type="success" @click="handleSave()">保存修改</i-button>
          </div>
        </div>
    </div>
</template>


<script>
import Util from "@/libs/util";
////import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";

export default {
  data() {
    return {
      data:{},
      show: false,
      
    };
  },
  methods: {
    handleSave() {
        if(this.beforeSubmit()){
            this.$Message.loading({
                content:"保存中...",
                duration:0
            })
            Util.ajax({
            method: "POST",
            url: baseUri.extend_group_update_group,
            data: {
                id:this.$route.params.id,
                groupName: this.data.groupName
            },
            headers: {
                token: Cookies.get("token")
            }
            }).then(res => { 
                this.$Message.destroy()
                this.$Message.success("更新成功")
            })
        }
        
    },
    beforeSubmit() {
        if(this.data.groupName == ''){
            this.$Message.error("请输入代理组名称！");
            return false;
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
      url: baseUri.extend_group_detail,
      params: {
        groupId:this.$route.params.id
      }
    }).then(res => {
        let obj = res.data.data;
        //console.log(obj)
        for (let x in obj) {
          this.data[x] = obj[x];
        }
        //console.log(this.data.groupName)
      this.show = true;
      this.$Message.destroy();
    });
  }
};
</script>
<style>
  @import "../../../../styles/public.less";
  @import "../../expand.less";
</style>

