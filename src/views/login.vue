<style lang="less">
    @import './login.less';
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
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
export default {
    data () {
        return {
            form: {
                userName: 'admin',
                password: 'superman'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit: function () {

            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let obj = this;
                    util.ajax.get(
                        util.getConfigUri.userLogin,
                        {
                            params: {
                                'userName': this.form.userName,
                                'password': this.form.password
                            }
                        }).then(resp => {
                            if(resp.data.success){
                                console.log(resp)
                                Cookies.set("userId",resp.data.data.userId)
                                Cookies.set('user', obj.form.userName,);
                                Cookies.set('password', obj.form.password);
                                Cookies.set('token',resp.data.data.token,{ expires: 30, path: '' });
                                obj.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                Cookies.set('access', 1);
                                obj.$router.push({
                                    name: 'home_index'
                                });
                            }else{
                                obj.closable("账户或密码错误");
                            }

                        }).catch(err => {
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
    }
};
</script>

<style>

</style>
