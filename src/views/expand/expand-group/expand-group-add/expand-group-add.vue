<template>
    <div class="expand-manager-detail">
        <div class="basic-info w-container">
          <h2 class="title">新增代理组</h2>
          <Row>
            <i-col class="item weight" align="right" style="font-size:14px;margin-top:35px;" span="4" offset="3">代理组名称：</i-col>
            <i-col class="item" style="font-size:14px;"  span="10"><i-input type="text" v-model="groupName"></i-input></i-col>
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
      groupName: ''
      
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
            url: baseUri.extend_group_add_group,
            data: {
                groupName: this.groupName
            },
            headers: {
                token: Cookies.get("token")
            }
            }).then(res => { 
                if(res.data.code == 100) {
                    this.$Message.destroy()
                    this.$Message.success("添加成功!")
                }else{
                    this.$Message.destroy()
                    this.$Message.error("添加失败!")
                } 
            })
        }   
    },
    beforeSubmit() {
        if(this.groupName == ''){
            this.$Message.error("请输入代理组名称！");
            return false;
        }
        return true;
    }
  },
};
</script>
<style>
  @import "../../../../styles/public.less";
  @import "../../expand.less";
</style>

