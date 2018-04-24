import axios from 'axios';
import env from '../../build/env';
import baseUri from './base_uri.js';
import baseConfig from './base_config.js';
import Cookies from "js-cookie"
import Main from '@/views/Main.vue';

import user_query from "@/views/user/index"
import demand_audit from "@/views/request/index"
import service_audit from "@/views/service/index"
import order_request from "@/views/order/order_demand_list/order_demand_list"
import order_service from "@/views/order/order_service_list/order_service_list"
import expand_manage from "@/views/expand/expand-manager/index"
import expand_order_audit from "@/views/expand/expand-order-audit/index"
import expand_charge_list from "@/views/expand/expand-charge-list/index"
import expand_group from "@/views/expand/expand-group/index"

import cash_flow_list from "@/views/cash/cash_flow_list/cash_flow_list"
import cash_withdraw_list from "@/views/cash/cash_withdraw_list/cash_withdraw_list"

import cash_refund_list from "@/views/cash/cash_refund_list/cash_refund_list"
import new_advert_list from "@/views/advert/advert_new_list/advert_new_list"
import advert_list from "@/views/advert/advert_new_list/advert_new_list"
import advert_new_bits_list from "@/views/advert/advert_new_bits_list/advert_new_bits_list"
import category_general from "@/views/category/category_general/category_general_index"
import category_tab_general from "@/views/category/category_tab_general/category_tab_general_index"
import after_merchant_enter_list from "@/views/merchant/after_merchant_enter"
import statistics_transaction_list from "@/views/statistics/statistics_transaction/statistics_transaction_index"
import system_settings from "@/views/system/system_settings/system_settings_index"
import web_im from "@/views/error-page/404.vue"
import app_list from "@/views/app/app_list/app_list_index"
import after_feedback_list from "@/views/after_feedback/after_feedback_list/after_feedback_list"
import locked_user_list from "@/views/locked/locked_user/locked_user_list"
import locked_role_list from "@/views/locked/locked_role/locked_role_list"
import locked_resource_index from "@/views/locked/locked_resource/locked_resource_index"
import audit_operation_index from "@/views/audit_operation/audit_operation_index/audit_operation_index"
import after_merchant_enter_query from "@/views/merchant/after_merchant_enter_query/after_merchant_enter_query"
import query_session_record_index from "@/views/im/query_session_record/query_session_record_index"

let util = {

};


util.getConfigUri = baseUri;
util.getConfig = baseConfig;
util.menus
util.title = function (title) {
    title = title || '流星狗运营后台';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? util.getConfig.devUrl
    : env === 'production'
        ? util.getConfig.proUrl
        : util.getConfig.testUrl
console.log(ajaxUrl)
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: util.getConfig.ajaxOutTime,
});
util.ajax.interceptors.request.use(
    config => {
        //console.log("请求拦截器")
        const token = Cookies.get("token") //获取存储在本地的token
        //console.log(token)
        config.headers = {
            'token': token
        };
        return config;
    }
);
util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {    
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    //console.log(vm.$store.state.app.routers)
    vm.$store.state.app.routers.forEach(item => {
        if (item.children && item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            if (item.children) {
                item.children.forEach(child => {
                    if (child.name === name) {
                        title = util.handleTitle(vm, child);
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }

        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children && item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                if (item.children) {
                    let i = 0;
                    let childArr = item.children;
                    let len = childArr.length;
                    while (i < len) {
                        if (childArr[i].name === name) {
                            return true;
                        }
                        i++;
                    }
                    return false;
                }

            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);
    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    //console.log(pageOpenedList)
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item && item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关

    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {

    util.ajax.interceptors.response.use(
        response => {
            //console.log(response.data.data.menus);
            return response;
        },
        error => {
            // 退出登录
            //vm.$store.commit('logout', this);
            vm.$store.commit('clearOpenedSubmenu');
            vm.$router.push({
                name: 'login'
            });
        });

    // axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
    //     let version = res.data.tag_name;
    //     vm.$Notice.config({
    //         duration: 0
    //     });
    //     if (semver.lt(packjson.version, version)) {
    //         vm.$Notice.info({
    //             title: 'iview-admin更新啦',
    //             desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
    //         });
    //     }
    // });
};
util.formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };

    // 遍历这个对象
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            // console.log(`${k}`)
            //console.log(RegExp.$1)
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

util.formData = function (data) {
    let formData = new FormData()
    for (let it in data) {
        formData.append(it, data[it])
    }
    return formData;
}
util.recursion = function (obj, subName,detail) {
    if (!obj.length) {
        return false
    } else {
        for (let x = 0; x < obj.length; x++) {
            //Vue.set(obj[x],'expand',true)、
            if(subName == "childAdminResources" && detail)
            {
                obj[x].disabled  = true
            }
            if(detail)
            {
                obj[x].expand = true
            }
            obj[x].children = obj[x][subName]
            util.recursion(obj[x].children, subName,detail)
        }
    }
}

util.createMenus = function (data) {
    if (data == undefined) { return new Array; }
    let path = {
        'user_query': user_query,
        'demand_audit': demand_audit,
        'service_audit': service_audit,
        'order_request': order_request,
        'order_service': order_service,
        'expand_manage': expand_manage,
        'expand_order_audit': expand_order_audit,
        'expand_charge_list': expand_charge_list,
        'expand_group': expand_group,
        'cash_flow_list':cash_flow_list,
        'cash_withdraw_list': cash_withdraw_list,
        'cash_refund_list': cash_refund_list,
        'new_advert_list': new_advert_list,
        'advert_list': advert_list,
        'advert_new_bits_list': advert_new_bits_list,
        'category_general': category_general,
        'category_tab_general': category_tab_general,
        'after_merchant_enter_list': after_merchant_enter_list,
        'statistics_transaction_list': statistics_transaction_list,
        'system_settings': system_settings,
        'web_im': web_im,
        'app_list': app_list,
        'after_feedback_list': after_feedback_list,
        'locked_user_list':locked_user_list,
        'locked_role_list':locked_role_list,
        'locked_resource_index':locked_resource_index,
        'audit_operation_index':audit_operation_index,
        'after_merchant_enter_query':after_merchant_enter_query,
        'query_session_record_index':query_session_record_index
    }
    let menus = []
    for (let i = 0; i < data.length; i++) {
        menus.push({})
    }

    for (let i = 0; i < data.length; i++) {

        menus[i].path = "/" + data[i].modelName
        menus[i].icon = data[i].newIcon?data[i].newIcon:data[i].icon
        menus[i].name = data[i].modelName
        menus[i].title = data[i].name
        menus[i].access = 1
        menus[i].component = Main
        menus[i].children = []
        for (let j = 0; j < data[i].childResources.length; j++) {
            menus[i].children.push({})
        }
        for (let j = 0; j < data[i].childResources.length; j++) {
            let tempPath = path[data[i].childResources[j].modelName]
            menus[i].children[j].path = data[i].childResources[j].modelName
            menus[i].children[j].name = data[i].childResources[j].modelName
            menus[i].children[j].title = data[i].childResources[j].name
            menus[i].children[j].component = tempPath
        }

    }
    //this.menus = menus//console.log(menus)
    //console.log(this.menus)
    return menus
}
util.unique = function unique(array){ 
    var n = []; //一个新的临时数组 
    //遍历当前数组 
    for(var i = 0; i < array.length; i++){ 
    //如果当前数组的第i已经保存进了临时数组，那么跳过， 
    //否则把当前项push到临时数组里面 
    if (n.indexOf(array[i]) == -1) n.push(array[i]); 
    } 
    return n; 
  }
util.isPoneAvailable = function ($poneInput) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test($poneInput.toString())) {
      return false;
    } else {
      return true;
    }
  }
export default util;

// let path = {
//     user_query: "@/views/user/index",
//     demand_audit: "@/views/request/index",
//     service_audit: "@/views/service/index",
//     statistics_transaction_list: "@/views/statistics/statistics_transaction/statistics_transaction_index",
//     order_request: "@/views/order/order_demand_list/order_demand_list",
//     order_service: "@/views/order/order_service_list/order_service_list",
//     expand_manage: "@/views/expand/expand-manager/index",
//     expand_order_audit: "@/views/expand/expand-order-audit/index",
//     expand_charge_list: "@/views/expand/expand-charge-list/index",
//     expand_group: "@/views/expand/expand-group/index",
//     cash_refund_list: "@/views/cash/cash_refund_list/cash_refund_list",
//     new_advert_list: "@/views/advert/advert_new_list/advert_new_list",
//     advert_list: "@/views/advert/advert_new_list/advert_new_list",
//     advert_new_bits_list: "@/views/advert/advert_new_bits_list/advert_new_bits_list",
//     category_general: "@/views/category/category_general/category_general_index",
//     category_tab_general: "@/views/category/category_tab_general/category_tab_general_index",
//     after_merchant_enter_list: "@/views/merchant/after_merchant_enter",
//     statistics_transaction_list: "@/views/statistics/statistics_transaction/statistics_transaction_index",
//     system_settings: "@/views/system/system_settings/system_settings_index",
//     web_im: "@/views/error-page/404.vue",
//     app_list: "@/views/app/app_list/app_list_index",
//     after_feedback_list: "@/views/after_feedback/after_feedback_list/after_feedback_list"
// }