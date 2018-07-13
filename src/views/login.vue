<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名" />
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码" />
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <Modal v-model="showBrowser" @on-ok="showBrowser=false" :mask-closable="false">
        <p slot="header"></p>
        <p style="text-align:center;font-size:20px">建议使用谷歌浏览器</p>
      </Modal>
    </div>
  </div>
</template>

<script>
//import Cookies from "js-cookie";
import util from "@/libs/util.js";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      form: {
        userName: "admin",
        password: "superman",
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      showBrowser: false
    };
  },
  methods: {
    handleSubmit: function() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let obj = this;
          util.ajax
            .get('http://39.106.16.60:8822/admin/v1/oauth/token', {
              params: {
                userName: this.form.userName,
                password: this.form.password
              }
            })
            .then(resp => {
              if (resp.data.success) {
                Cookies.set("userId", resp.data.data.userId);
                Cookies.set("user", obj.form.userName);
                Cookies.set("password", obj.form.password);
                Cookies.set("token", resp.data.data.token);
                // obj.$store.commit(
                //   "setAvator",
                //   "../images/logo-min.png"
                // );
                //Cookies.set("access", 1);
                util
                  .ajax({
                    method: "get",
                    url: baseUri.menu_query_url
                  })
                  .then(res => {
                    //console.log(res);
                    if (res.data.success) {
                      window.sessionStorage.setItem(
                        "menus",
                        JSON.stringify(res.data.data)
                      );
                      window.sessionStorage.setItem("logoutStatus", true);
                      //console.log(res.data.data)
                       this.$store.state.app.pageOpenedList=[]
                      obj.$router.push({
                        name: "home_index"
                      });
                      if (window.sessionStorage.getItem("updataStatus")) {
                        window.sessionStorage.setItem("updataStatus", "");
                        //this.$router.go(0);
                        //Cookies.set("timer",1)
                      }
                    } else {
                    }
                  });
              } else {
                obj.closable("账户或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    closable: function(msg) {
      this.$Message.error({
        content: msg,
        duration: 3,
        closable: true
      });
    }
  },
  created() {
    let browser = {
      versions: (function() {
        let u = navigator.userAgent;
        return {
          webKit: u.indexOf("AppleWebKit") > -1 //苹果、谷歌内核
        };
      })()
    };
    if (!browser.versions.webKit) {
      this.showBrowser = true;
    }
  }
};
</script>

<style>

</style>
