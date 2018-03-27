import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
// import VueI18n from 'vue-i18n';
import util from '@/libs/util';
import BaiduMap from 'vue-baidu-map'
import Cookies from "js-cookie"

// Vue.use(VueI18n);
Vue.use(iView);
Vue.use(BaiduMap, {
    ak: "sKkVhwaa0xKdBYPtGzAALEY5FEDL01g2&services=&t=20180201111639"
})
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
        //console.log(this.$store.state.app.menuList)
        //console.log("main.js运行")
        let tagsList = [];
        //let menus = JSON.parse(window.sessionStorage.menus)
       // console.log("created" + menus)
        //if (menus) {
            appRouter.map((item) => {

                if (item.children.length <= 1) {
                    tagsList.push(item.children[0]);
                } else {
                    tagsList.push(...item.children);
                }
            });
            this.$store.commit('setTagsList', tagsList);
        //}

    }
});
