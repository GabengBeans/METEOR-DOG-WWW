<template>
  <div id="revise">
      <Row>
      <Form  :label-width="80" >
        <Col :xs="12" :sm="12" :md="12" :lg="12"><FormItem label="用户角色：">
            <Select v-model="roleType">
                <Option value="1">boss</Option>
                <Option value="2">推广代理人</Option>
                <Option value="3">普通用户</Option>
            </Select>
        </FormItem>
        </Col>
        <router-link to="/user"><Button type="success" size="large" style="margin-left:2vw;">保存</Button></router-link>
        <router-link to="/user"><Button type="warning" size="large" style="margin-left:1vw;">返回</Button></router-link>
    </Form>
    </Row>
  </div>
</template>
<script>
import Util from '@/libs/util'
import baseUri from '@/libs/base_uri'
//import Cookies from 'js-cookie'
export default {
    name:'revise',
    data(){
        return {
            roleType:'1'
        }
    },
    created(){
        //console.log(Cookies.get("token"))
      Util.ajax({
          method:'get',
          url:baseUri.user_detail_url,
          params:{
              'userId':this.$route.params.id
          }
      }) .then((response)=>{
             // console.log(response)
          })
    }
}
</script>
<style>
 #revise{
     background: #fff;
    padding:16px;
    height:30vh;
 }
 .row{
     text-align: center;
 }
</style>

