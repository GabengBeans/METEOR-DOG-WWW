//import Vue from 'vue';
//import iView from 'iview';
import {
    router
} from './router/index';
import {
    appRouter
} from './router/router';
import store from './store';
import App from './app.vue';

import util from '@/libs/util';
import BaiduMap from 'vue-baidu-map'
////import Cookies from "js-cookie"
console.log("main.js")

Vue.use(iview);
Vue.use(BaiduMap, {
    ak: "sKkVhwaa0xKdBYPtGzAALEY5FEDL01g2&services=&t=20180201111639"
})
Vue.config.devtools = true;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        //let menus = JSON.parse(window.sessionStorage.menus)
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        //console.log("Main.vue执行") 
        this.$store.commit('updateMenulist')
        util.checkUpdate(this);
    },
    created() {
        
    }
});