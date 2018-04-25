import { otherRouter, appRouter } from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
import baseUri from '@/libs/base_uri'
import base_uri from '../../libs/base_uri';

const app = {
    state: {
        temp_status: true,
        videoId:"",
        //用户公共状态
        user_page_info: {//用户页页码
            currentPage: 1,
            totalPage: 0
        },
        user_search_info: { "status": "-1" },//用户页搜索条件
        user_search_result: [],//用户页搜过结果
        user_public_page: 1,

        //需求公共状态
        request_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        request_search_info: { "businessStatus": "0", "status": "-1" },
        request_search_result: [],
        request_public_page: 1,

        //服务公共状态
        service_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        service_search_info: { "businessStatus": "0", "status": "-1" },
        service_search_result: [],
        service_public_page: 1,

        //需求订单公共状态
        order_demand_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        order_demand_search_info: { "businessType": "2", "orderStatus": "0" },
        order_demand_search_result: [],
        order_demand_public_page: 1,

        //服务订单公共状态
        order_service_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        order_service_search_info: { "businessType": "1", "orderStatus": "0" },
        order_service_search_result: [],
        order_service_public_page: 1,

        //资金流水公共状态
        cash_flow_search_info: { "chargeStatus": "-1", "tradeType": "0" },
        cash_flow_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        cash_flow_search_result: [],
        cash_flow_public_page: 1,

        //保障金
        cash_refund_search_info: { "bondStatus": "-1" },
        cash_refund_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        cash_refund_search_result: [],
        cash_refund_public_page: 1,

        //提现
        cash_withdraw_search_info: { "applyStatus": "-1" },
        cash_withdraw_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        cash_withdraw_search_result: [],
        cash_withdraw_public_page: 1,

        //商户入驻
        merchant_enter_search_info: {},
        merchant_enter_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        merchant_enter_search_result: [],
        merchant_enter_public_page: 1,
        //已入驻商户查询
        merchant_bussiness_enter_search_info: {},
        merchant_bussiness_enter_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        merchant_bussiness_enter_search_result: [],
        merchant_bussiness_enter_public_page: 1,

        //广告
        advert_new_search_info: {},
        advert_new_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        advert_new_search_result: [],
        advert_new_public_page: 1,

        //广告位
        advert_position_search_info: {},
        advert_position_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        advert_position_search_result: [],
        advert_position_public_page: 1,

        //售后管理
        after_feedback_search_info: {},
        after_feedback_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        after_feedback_search_result: [],
        after_feedback_public_page: 1,

        // 拓展用户--代理人
        expand_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        expand_search_info: { "expandStatus": "-1" },
        expand_search_result: [],

        // 拓展用户--返佣订单审核
        brokerage_order_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        brokerage_order_search_info: { "businessStatus": "0" },
        brokerage_order_search_result: [],
        // 拓展用户 -- 佣金结算
        expand_charge_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        expand_charge_search_info: {},
        expand_charge_search_result: [],
        // 拓展用户 -- 代理组管理
        expand_group_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        expand_group_search_info: {},
        expand_group_search_result: [],
        // 拓展-代理组-绑定代理人
        group_bind_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        group_bind_search_info: {},
        group_bind_search_result: [],
        // 拓展-代理组-解绑代理人
        group_unbundling_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        group_unbundling_search_info: {},
        group_unbundling_search_result: [],


        //类目管理
        category_search_result: {
            childCategory: []
        },
        categorys_search_result: {
            childCategory: []
        },

        //标签管理
        category_tab_search_result: {

        },
        categorys_tab_search_result: {

        },

        //统计
        order_statistics_search_info: {},
        order_statistics_search_result: {},

        //系统配置
        system_settings_search_info: {},
        system_settings_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        system_settings_search_result: [],
        system_settings_public_page: 1,

        //app管理
        app_search_info: {},
        app_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        app_search_result: [],
        app_public_page: 1,

        //权限管理-用户管理
        admin_user_search_info: {},
        admin_user_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        admin_user_search_result: [],
        admin_user_public_page: 1,
        //权限管理-角色管理
        admin_role_search_info: {},
        admin_role_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        admin_role_search_result: [],
        admin_role_public_page: 1,
        //权限管理-资源管理
        admin_resource_search_info: {},
        admin_resource_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        admin_resource_search_result: [],
        admin_resource_public_page: 1,

        //审核统计
        audit_operation:{},
        audit_operation_search_info: {},
        audit_operation_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        audit_operation_search_result: [],
        audit_operation_public_page: 1,

        //im查询会话
        query_session_search_info:{},
        query_session_page_info:{
            currentPage:1,
            totalPage:0
        },
        query_session_search_result:[],
        query_session_public_page:1,

        //IP红包查询
        ip_coupon_query_search_info:{},
        ip_coupon_query_page_info:{
            currentPage:1,
            totalPage:0
        },
        ip_coupon_query_search_result:[],
        ip_coupon_query_public_page:1,

        //IP红包详情查询
        ip_coupon_detail_query_serch_info:{},
        ip_coupon_detail_query_page_info:{
            currentPage:1,
            totalPage:0
        },
        ip_coupon_detail_query_search_result:{
            couponInfo:"",
            items:[]
        },
        ip_coupon_detail_query_public_page:1,


        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        setTagsList(state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist(state) {
            //let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            //console.log("app.js")
            appRouter.forEach((item, index) => {
                // if (item.access !== undefined) {
                //     if (Util.showThisRoute(item.access, accessCode)) {
                //         if (item.children.length === 1) {
                //             menuList.push(item);
                //         } else {
                //             let len = menuList.push(item);
                //             let childrenArr = [];
                //             childrenArr = item.children.filter(child => {
                //                 if (child.access !== undefined) {
                //                     if (child.access === accessCode) {
                //                         return child;
                //                     }
                //                 } else {
                //                     return child;
                //                 }
                //             });
                //             menuList[len - 1].children = childrenArr;
                //         }
                //     }
                // } else {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                        handledItem.children = childrenArr;
                        menuList.splice(len - 1, 1, handledItem);
                    }
                //}
            });
            //console.log(menuList)
            state.menuList = menuList;
        },
        changeMenuTheme(state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme(state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu(state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage(state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage(state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag(state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList(state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags(state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList(state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName(state, name) {
            //console.log("setName")
            state.currentPageName = name;
        },
        // setAvator(state, path) {
        //     localStorage.avatorImgPath = "../../images/logo-min.png";
        // },
        switchLang(state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount(state, count) {
            state.messageCount = count;
        },
        increateTag(state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        //获取用户信息
        GET_USER_INFO(state, { data, pageNo }) {
            state.user_search_info = data
            state.user_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.user_search_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                state.user_page_info.currentPage = parseInt(response.data.data.page)
                state.user_page_info.totalPage = parseInt(response.data.data.totalCount)
                //console.log(typeof state.user_page_info.currentPage)
                let arr = response.data.data.items
                state.user_search_result = response.data.data.items
                //console.log(state.user_search_result)
                for (let x in arr) {
                    if (arr[x].status == '1') {
                        state.user_search_result[x].status = '正常'
                    } else {
                        state.user_search_result[x].status = '禁用'
                    }
                    state.user_search_result[x].meteorScore = parseFloat(arr[x].meteorScore / 10).toFixed(1)
                    state.user_search_result[x].amount = parseFloat(arr[x].amount / 100).toFixed(2)
                }
                //Cookies.set("user_search_result",JSON.stringify(state.user_search_result))
            })
        },



        //需求信息
        GET_REQUEST_INFO(state, { data, pageNo }) {
            state.request_search_info = data
            state.request_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.demand_search_demands_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                let businessStatus = ["全部", "编辑中", "审核中", "已发布", "已过期", "审核未通过", "取消发布","已下架","已删除"]
                let status = ["无效", "有效"]
                state.request_page_info.currentPage = parseInt(response.data.data.page)
                state.request_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.request_search_result = response.data.data.items
                //console.log(response.data.data.items[6].id)
                for (let x in arr) {
                    let businessIndex = parseInt(state.request_search_result[x].businessStatus)
                    let statusIndex = parseInt(state.request_search_result[x].status)
                    state.request_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    if (arr[x].auditTime) {
                        state.request_search_result[x].auditTime = Util.formatDate(new Date(arr[x].auditTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.request_search_result[x].auditTime = ''
                    }

                    state.request_search_result[x].businessStatus = businessStatus[businessIndex]
                    state.request_search_result[x].status = status[statusIndex]
                }
            })
        },
        //服务信息
        GET_SERVICE_INFO(state, { data, pageNo }) {
            state.service_search_info = data
            state.service_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.service_search_services_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                let businessStatus = ["全部", "编辑中", "审核中", "已发布", "已过期", "审核未通过", "取消发布","已下架","已删除"]
                let status = ["无效", "有效"]
                state.service_page_info.currentPage = parseInt(response.data.data.page)
                state.service_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.service_search_result = response.data.data.items
                for (let x in arr) {
                    let businessIndex = parseInt(state.service_search_result[x].businessStatus)
                    let statusIndex = parseInt(state.service_search_result[x].status)
                    state.service_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    if (arr[x].auditTime) {
                        state.service_search_result[x].auditTime = Util.formatDate(new Date(arr[x].auditTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.service_search_result[x].auditTime = ''
                    }
                    state.service_search_result[x].businessStatus = businessStatus[businessIndex]
                    state.service_search_result[x].status = status[statusIndex]
                }
            })
        },
        //需求订单
        GET_ORDER_DEMAND_INFO(state, { data, pageNo }) {
            Vue.set(data, 'businessType', '2')
            state.order_demand_search_info = data
            state.order_demand_public_page = pageNo
            //console.log(data)
            Util.ajax({
                method: "post",
                url: base_uri.order_search_orders_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                let orderStatus = ["全部", "待支付", "待服务", "已完成", "已取消", "申请退款", "退款成功", "退款失败", "已过期", "已付款"]
                //let status = ["无效","有效"]
                state.order_demand_page_info.currentPage = parseInt(response.data.data.page)
                state.order_demand_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.order_demand_search_result = response.data.data.items
                //console.log(state.order_demand_search_result)
                for (let x in arr) {
                    let orderStatu = parseInt(arr[x].orderStatus)
                    //let statusIndex = parseInt(state.service_search_result[x].status)
                    state.order_demand_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    state.order_demand_search_result[x].orderStatus = orderStatus[orderStatu]
                    state.order_demand_search_result[x].actualAmount = parseInt(arr[x].actualAmount) / 100 + "元"
                    //state.order_demand_search_result[x].status = status[statusIndex]
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        //服务订单
        GET_ORDER_SERVICE_INFO(state, { data, pageNo }) {
            Vue.set(data, 'businessType', '1')
            state.order_service_search_info = data
            state.order_service_public_page = pageNo
            //console.log(data)
            Util.ajax({
                method: "post",
                url: base_uri.order_search_orders_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                let orderStatus = ["全部", "待支付", "待服务", "已完成", "已取消", "申请退款", "退款成功", "退款失败", "已过期", "已付款"]
                //let status = ["无效","有效"]
                state.order_service_page_info.currentPage = parseInt(response.data.data.page)
                state.order_service_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.order_service_search_result = response.data.data.items
                //console.log(state.order_service_search_result)
                for (let x in arr) {
                    let orderStatu = parseInt(arr[x].orderStatus)
                    //let statusIndex = parseInt(state.service_search_result[x].status)
                    state.order_service_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    state.order_service_search_result[x].orderStatus = orderStatus[orderStatu]
                    state.order_service_search_result[x].rawPrice = parseInt(arr[x].rawPrice) / 100 + "元"
                    //state.order_demand_search_result[x].status = status[statusIndex]
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        //拓展信息
        GET_EXPAND_INFO(state, { data, pageNo }) {
            state.expand_search_info = data
            state.expand_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.extend_user_search_ex_userinfo_for_page,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((res) => {
                // console.log(res)
                let arr = res.data.data.items;
                // console.log(arr)
                let status = ["无效", "有效"];
                state.expand_page_info.currentPage = parseInt(res.data.data.page)
                state.expand_page_info.totalPage = parseInt(res.data.data.totalCount)
                state.expand_search_result = arr
                for (let x in arr) {
                    let statusIndex = parseInt(state.expand_search_result[x].expandStatus)
                    state.expand_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    state.expand_search_result[x].tradeAmount = (arr[x].tradeAmount * 0.01).toFixed(2)
                    if (arr[x].auditTime) {
                        state.expand_search_result[x].auditTime = Util.formatDate(new Date(arr[x].auditTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.expand_search_result[x].auditTime = ''
                    }
                    state.expand_search_result[x].expandStatus = status[statusIndex]
                }
            })
        },
        GET_EXPAND_CHARGE_INFO(state, { data, pageNo }) {
            state.expand_charge_search_info = data
            Util.ajax({
                method: "post",
                url: base_uri.brokerage_balance_search_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((res) => {
                let arr = res.data.data.items;
                console.log(arr)
                let balanceStatus = ["全部", "已结算", "未结算", "待结算"];
                state.expand_charge_page_info.currentPage = parseInt(res.data.data.page)
                state.expand_charge_page_info.totalPage = parseInt(res.data.data.totalCount)
                state.expand_charge_search_result = arr
                for (let x in arr) {
                    let balanceIndex = parseInt(state.expand_charge_search_result[x].balanceStatus)
                    state.expand_charge_search_result[x].accountDay = Util.formatDate(new Date(arr[x].accountDay), "yyyy-MM-dd")
                    state.expand_charge_search_result[x].tradeAmount = (arr[x].tradeAmount * 0.01).toFixed(2)
                    state.expand_charge_search_result[x].platformServiceCharge = (arr[x].platformServiceCharge * 0.01).toFixed(2)
                    state.expand_charge_search_result[x].balanceAmount = (arr[x].balanceAmount * 0.01).toFixed(2)
                    state.expand_charge_search_result[x].reate = (arr[x].reate * 0.01).toFixed(2)

                    if (arr[x].balanceTime) {
                        state.expand_charge_search_result[x].balanceTime = Util.formatDate(new Date(arr[x].balanceTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.expand_charge_search_result[x].balanceTime = ''
                    }
                    state.expand_charge_search_result[x].balanceStatus = balanceStatus[balanceIndex]
                }
            })
        },
        GET_EXPAND_GROUP_INFO(state, { data, pageNo }) {
            state.expand_group_search_info = data
            Util.ajax({
                method: "post",
                url: base_uri.extend_group_search_ex_group_for_page,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((res) => {
                console.log(res)
                let arr = res.data.data.items;
                state.expand_group_page_info.currentPage = parseInt(res.data.data.page)
                state.expand_group_page_info.totalPage = parseInt(res.data.data.totalCount)
                state.expand_group_search_result = arr
                // for (let x in arr) {

                // }
            })
        },
        //绑定代理人
        GET_GROUP_BIND_INFO(state, { data, pageNo }) {
            state.group_bind_search_info = data
            Util.ajax({
                method: "post",
                url: base_uri.get_bind_expend_list_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((res) => {
                console.log(res)
                let arr = res.data.data.items;
                state.group_bind_page_info.currentPage = parseInt(res.data.data.page)
                state.group_bind_page_info.totalPage = parseInt(res.data.data.totalCount)
                state.group_bind_search_result = arr
                for (let x in arr) {
                    if (arr[x].nickname) {
                        state.group_bind_search_result[x].nickname = arr[x].nickname
                    } else {
                        state.group_bind_search_result[x].nickname = '无'
                    }
                }
            })
        },
        //解绑代理人
        GET_GROUP_UNBUNDLING_INFO(state, { data, pageNo, groupId }) {
            state.group_unbundling_search_info = data
            Util.ajax({
                method: "post",
                url: base_uri.get_group_expend_list_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10,
                    groupId: groupId
                },
                data: data
            }).then((res) => {
                console.log(res)
                let arr = res.data.data.items;
                state.group_unbundling_page_info.currentPage = parseInt(res.data.data.page)
                state.group_unbundling_page_info.totalPage = parseInt(res.data.data.totalCount)
                state.group_unbundling_search_result = arr
                for (let x in arr) {
                    if (arr[x].nickname) {
                        state.group_unbundling_search_result[x].nickname = arr[x].nickname
                    } else {
                        state.group_unbundling_search_result[x].nickname = '无'
                    }
                }
            })
        },
        //资金信息
        GET_CASH_FLOW_INFO(state, { data, pageNo }) {
            state.cash_flow_search_info = data
            state.cash_flow_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.cash_search_account_log_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                let chargeStatusArr = ["未成功", "成功"]
                let tradeTypeArr = ["全部", "服务", "需求", "手续费", "提现", "退款", "佣金", "保障金", "退还保障金"]
                let isIncomingArr = ["", "收入", "支出"]
                let paymentTypeArr = ["", "支付宝", "微信"]
                let statusArr = ["禁用", "启用"]
                state.cash_flow_page_info.currentPage = parseInt(response.data.data.page)
                state.cash_flow_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.cash_flow_search_result = response.data.data.items

                for (let x in arr) {
                    let chargeStatus = parseInt(arr[x].chargeStatus)
                    let tradeType = parseInt(arr[x].tradeType)
                    let isIncoming = parseInt(arr[x].isIncoming)
                    let paymentType = parseInt(arr[x].paymentType)
                    let status = parseInt(arr[x].status)
                    //let statusIndex = parseInt(state.service_search_result[x].status)
                    if (arr[x].createTime) {
                        state.cash_flow_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    }
                    state.cash_flow_search_result[x].chargeStatus = chargeStatusArr[chargeStatus]
                    state.cash_flow_search_result[x].tradeType = tradeTypeArr[tradeType]
                    state.cash_flow_search_result[x].amount = parseInt(arr[x].amount) / 100 + "元"
                    state.cash_flow_search_result[x].isIncoming = isIncomingArr[isIncoming]
                    state.cash_flow_search_result[x].paymentType = paymentTypeArr[paymentType]
                    state.cash_flow_search_result[x].status = statusArr[status]
                }
                //console.log( state.cash_flow_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //保障金退回
        GET_CASH_REFUND_INFO(state, { data, pageNo }) {
            state.cash_refund_search_info = data
            state.cash_refund_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.account_search_bond_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                // console.log(response)
                let arr = response.data.data.items
                let bondStatusArr = ["未缴纳", "已缴纳", "申请中"]
                state.cash_refund_page_info.currentPage = parseInt(response.data.data.page)
                state.cash_refund_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.cash_refund_search_result = response.data.data.items

                for (let x in arr) {
                    let bondStatus = parseInt(arr[x].bondStatus)
                    if (arr[x].createTime) {
                        state.cash_refund_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.cash_refund_search_result[x].createTime = ''
                    }

                    state.cash_refund_search_result[x].bondAmount = parseInt(arr[x].bondAmount) / 100 + "元"
                    state.cash_refund_search_result[x].bondStatus = bondStatusArr[bondStatus]
                }
                // console.log(state.cash_refund_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //提现申请
        GET_CASH_WITHDRAW_INFO(state, { data, pageNo }) {
            state.cash_withdraw_search_info = data
            state.cash_withdraw_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.cash_search_withdraw_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                let applyStatusArr = ["申请中", "申请通过", "申请驳回"]
                state.cash_withdraw_page_info.currentPage = parseInt(response.data.data.page)
                state.cash_withdraw_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.cash_withdraw_search_result = response.data.data.items

                for (let x in arr) {
                    let applyStatus = parseInt(arr[x].applyStatus)
                    if (arr[x].createTime) {
                        state.cash_withdraw_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.cash_withdraw_search_result[x].createTime = ''
                    }

                    state.cash_withdraw_search_result[x].amount = parseInt(arr[x].amount) / 100 + "元"
                    state.cash_withdraw_search_result[x].applyStatus = applyStatusArr[applyStatus]
                }
                //    console.log(state.cash_refund_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //商户入住
        GET_MERCHANT_ENTER_INFO(state, { data, pageNo }) {
            state.merchant_enter_search_info = data
            state.merchant_enter_public_page = pageNo

            Util.ajax({
                method: "post",
                url: base_uri.search_business_info_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                state.merchant_enter_page_info.currentPage = parseInt(response.data.data.page)
                state.merchant_enter_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.merchant_enter_search_result = response.data.data.items

                for (let x in arr) {
                    if (arr[x].createTime) {
                        state.merchant_enter_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.merchant_enter_search_result[x].createTime = ''
                    }
                }
                //console.log(state.cash_refund_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        GET_BUSINESS_ENTER_FOR_PAGE_INFO(state, { data, pageNo }) {
            state.merchant_bussiness_enter_search_info = data
            state.merchant_bussiness_enter_public_page = pageNo 
            Util.ajax({
                method: "post",
                url: base_uri.search_business_enter_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10,
                },
                data:data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                let status=["禁用","启用"]
                state.merchant_bussiness_enter_page_info.currentPage = parseInt(response.data.data.page)
                state.merchant_bussiness_enter_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.merchant_bussiness_enter_search_result = response.data.data.items

                for (let x=0;x<arr.length;x++) {
                    for(let y in arr[x])
                    {
                        if (y=="userStatus") {
                            state.merchant_bussiness_enter_search_result[x].userStatus = status[arr[x][y]]
                        }
                        else if(y=="meteorScore")
                        {
                            if(arr[x][y])
                            {
                                state.merchant_bussiness_enter_search_result[x].meteorScore = (parseInt(arr[x][y])/10).toFixed(1)                                
                            }else{
                                state.merchant_bussiness_enter_search_result[x].meteorScore =''                                
                            }
                        }else if(y=="amount"){
                            state.merchant_bussiness_enter_search_result[x].amount =(parseInt(arr[x][y])/100).toFixed(2)                       
                        }

                    }
                }
            //console.log(state.merchant_bussiness_enter_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //search_business_enter_for_page_url
        //拓展管理-返佣订单审核
        GET_BROKERAGE_ORDER_INFO(state, { data, pageNo }) {
            state.brokerage_order_search_info = data
            Util.ajax({
                method: "post",
                url: base_uri.brokerage_order_search_for_page,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((res) => {
                // console.log(res)
                let arr = res.data.data.items;
                let businessStatus = ["全部", "待审核", "审核未通过", "审核通过"];
                state.brokerage_order_page_info.currentPage = parseInt(res.data.data.page)
                state.brokerage_order_page_info.totalPage = parseInt(res.data.data.totalCount)
                state.brokerage_order_search_result = arr
                for (let x in arr) {
                    let businessIndex = parseInt(state.brokerage_order_search_result[x].businessStatus)

                    state.brokerage_order_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                    state.brokerage_order_search_result[x].platformServiceCharge = (arr[x].platformServiceCharge * 0.01).toFixed(2);
                    state.brokerage_order_search_result[x].brokerage = (arr[x].brokerage * 0.01).toFixed(2);
                    state.brokerage_order_search_result[x].reate = (arr[x].reate * 0.01).toFixed(2);


                    if (arr[x].accountDay) {
                        state.brokerage_order_search_result[x].accountDay = Util.formatDate(new Date(arr[x].accountDay), "yyyy-MM-dd")
                    } else {
                        state.brokerage_order_search_result[x].accountDay = ''
                    }
                    if (arr[x].auditTime) {
                        state.brokerage_order_search_result[x].auditTime = Util.formatDate(new Date(arr[x].auditTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.brokerage_order_search_result[x].auditTime = ''
                    }
                    state.brokerage_order_search_result[x].businessStatus = businessStatus[businessIndex]
                }
            })
        },
        //广告管理
        GET_ADVERT_NEW_INFO(state, { data, pageNo }) {
            state.advert_new_search_info = data
            state.advert_new_public_page = pageNo

            Util.ajax({
                method: "post",
                url: base_uri.advert_query_advert_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                let arr = response.data.data.items
                state.advert_new_page_info.currentPage = parseInt(response.data.data.page)
                state.advert_new_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.advert_new_search_result = response.data.data.items

                for (let x = 0; x < arr.length; x++) {
                    if (arr[x].updateTime) {
                        state.advert_new_search_result[x].updateTime = Util.formatDate(new Date(arr[x].updateTime), "yyyy-MM-dd hh:mm:ss")
                    } else {
                        state.advert_new_search_result[x].updateTime = ''
                    }
                }
                //console.log(state.advert_new_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //广告位管理
        GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO(state, { data, pageNo }) {
            state.advert_position_search_info = data
            state.advert_position_public_page = pageNo

            Util.ajax({
                method: "post",
                url: base_uri.advert_position_search_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                if (response.data.success) {
                    let levelArr = ["", "一级广告位", "二级广告位", "三级广告位", "四级广告位"]
                    let statusArr = ["禁用", "启用"]
                    let arr = response.data.data.items
                    state.advert_position_page_info.currentPage = parseInt(response.data.data.page)
                    state.advert_position_page_info.totalPage = parseInt(response.data.data.totalCount)
                    state.advert_position_search_result = response.data.data.items

                    for (let x = 0; x < arr.length; x++) {
                        state.advert_position_search_result[x].level = levelArr[arr[x].level]
                        state.advert_position_search_result[x].status = statusArr[arr[x].status]
                    }
                } else {
                    Vue.$Message.error("获取失败，请检查网络")
                }
                //console.log(state.advert_position_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //售后管理
        GET_AFTER_FEEDBACK_INFO(state, { data, pageNo }) {
            state.after_feedback_search_info = data
            state.after_feedback_public_page = pageNo

            Util.ajax({
                method: "post",
                url: base_uri.after_feedback_query_for_page,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                //console.log(response)
                if (response.data.success) {
                    let arr = response.data.data.items
                    state.after_feedback_page_info.currentPage = parseInt(response.data.data.page)
                    state.after_feedback_page_info.totalPage = parseInt(response.data.data.totalCount)
                    state.after_feedback_search_result = response.data.data.items

                    for (let x = 0; x < arr.length; x++) {
                        state.after_feedback_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
                        if (!arr[x].phone) {
                            state.after_feedback_search_result[x].phone = ""
                        }
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
        },

        //类别管理
        GET_CATEGORY_SEARCH_INFO(state, { businessType }) {
            Util.ajax({
                method: "get",
                url: base_uri.category_search_url,
                params: {
                    businessType: businessType
                }
            }).then((response) => {
                //console.log(response)
                let obj = response.data.data.allCategory[0]
                if (businessType == 1) {
                    if (response.data.success) {
                        Util.recursion(response.data.data.allCategory, "childCategory")
                        state.category_search_result = response.data.data.allCategory[0]
                    }

                } else if (businessType == 2) {
                    if (response.data.success) {
                        Util.recursion(response.data.data.allCategory, "childCategory")
                        state.categorys_search_result = response.data.data.allCategory[0]
                    }
                }

            }).catch((error) => {
                console.log(error)
            })
        },
        //标签管理
        GET_LABEL_LIST_SEARCH_INFO(state, { lableType }) {
            Util.ajax({
                method: "get",
                url: base_uri.label_search_label_list_url,
                params: {
                    lableType: lableType
                }
            }).then((response) => {
                //console.log(response)
                if (lableType == 1) {
                    if (response.data.success) {
                        let levelName = []
                        for (let x = 0; x < response.data.data.allLabels.length; x++) {
                            let obj = {}
                            obj.name = response.data.data.allLabels[x].name
                            obj.id = response.data.data.allLabels[x].id
                            levelName.push(obj)
                        }
                        Util.recursion(response.data.data.allLabels, "childLableVos")
                        Vue.set(state.category_tab_search_result, "allLabels", response.data.data.allLabels)
                        //console.log(state.category_tab_search_result.allLabels instanceof Array)
                        Vue.set(state.category_tab_search_result, "tabName", "买家")
                        Vue.set(state.category_tab_search_result, "levelName", levelName)
                        Vue.set(state.category_tab_search_result, "labelType", "1")
                        //console.log(state.category_tab_search_result)
                    }

                } else if (lableType == 2) {
                    if (response.data.success) {
                        let levelName = []
                        for (let x = 0; x < response.data.data.allLabels.length; x++) {
                            let obj = {}
                            obj.name = response.data.data.allLabels[x].name
                            obj.id = response.data.data.allLabels[x].id
                            levelName.push(obj)
                        }
                        Util.recursion(response.data.data.allLabels, "childLableVos")
                        Vue.set(state.categorys_tab_search_result, "allLabels", response.data.data.allLabels)
                        Vue.set(state.categorys_tab_search_result, "tabName", "卖家")
                        Vue.set(state.categorys_tab_search_result, "levelName", levelName)
                        Vue.set(state.categorys_tab_search_result, "labelType", "2")
                    }
                }
                //console.log(state.category_tab_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //统计
        GET_ORDER_STATISTICS_SEARCH_INFO(state, { time }) {
            Util.ajax({
                method: "post",
                url: base_uri.order_statistics_query,
                data: time
            }).then((response) => {

                if (response.data.success) {
                    state.order_statistics_search_result = response.data.data

                }
                //console.log(state.order_statistics_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //系统变量
        GET_SYSTEM_SETTINGS_SEARCH_INFO(state, { data, pageNo }) {
            state.system_settings_search_info = data
            state.system_settings_public_page = pageNo

            Util.ajax({
                method: "post",
                url: base_uri.search_setting_info_for_page,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then(res => {
                //console.log(res)
                if (res.data.success) {
                    //console.log(res)
                    state.system_settings_page_info.currentPage = res.data.data.page
                    state.system_settings_page_info.totalPage = res.data.data.totalCount
                    state.system_settings_search_result = res.data.data.items
                    for (let x in res.data.data.items) {
                        if (res.data.data.items[x].status) {
                            state.system_settings_search_result[x].status = "有效"
                        } else {
                            state.system_settings_search_result[x].status = "无效"
                        }
                    }
                }
            }).catch(error => {
                console.log(error)
            })
        },
        //app管理
        GET_APP_SEARCH_INFO(state, { data, pageNo }) {
            state.app_public_page = pageNo

            Util.ajax({
                method: "post",
                url: base_uri.app_search_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then(res => {
                //console.log(res)
                if (res.data.success) {
                    state.app_page_info.currentPage = res.data.data.page
                    state.app_page_info.totalPage = res.data.data.totalCount
                    state.app_search_result = res.data.data.items
                    for (let x in res.data.data.items) {
                        state.app_search_result[x].createTime = Util.formatDate(new Date(res.data.data.items[x].createTime), "yyyy-MM-dd hh:mm:ss")
                        state.app_search_result[x].updateStatus = res.data.data.items[x].updateStatus?"是":"否"
                    }
                }
                //console.log(state.app_search_result)
            })
        },
        //权限管理-用户管理
        GET_SEARCH_ADIMIN_USER_INFO(state, { data, pageNo }) {
            state.admin_user_search_info = data
            state.admin_user_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.search_admin_user_info,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then(res => {
                //console.log(res)
                if (res.data.success) {
                    //console.log(res.data.data.items)
                    state.admin_user_page_info.currentPage = res.data.data.page
                    state.admin_user_page_info.totalPage = res.data.data.totalCount
                    let statusArr = ["无效", "有效"]
                    state.admin_user_search_result = []
                    for (let x in res.data.data.items) {
                        //state.admin_user_search_result[x] = res.data.data.items[x]
                        Vue.set(state.admin_user_search_result, x, res.data.data.items[x])
                        for (let y in res.data.data.items[x]) {
                            if (y == "status") {
                                state.admin_user_search_result[x].status = statusArr[res.data.data.items[x][y]]
                            }
                        }
                    }
                    //console.log(state.admin_user_search_result)
                }
            })
        },
        //权限管理-角色管理
        GET_SEARCH_ADIMIN_ROLE_INFO(state, { data, pageNo }) {
            //console.log(data)
            state.admin_role_search_info = data
            state.admin_role_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.search_admin_role_info,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then(res => {
                //console.log(res)
                if (res.data.success) {
                    //console.log(res.data.data.items)
                    state.admin_role_page_info.currentPage = res.data.data.page
                    state.admin_role_page_info.totalPage = res.data.data.totalCount
                    let statusArr = ["无效", "有效"]
                    state.admin_role_search_result = []
                    for (let x in res.data.data.items) {
                        Vue.set(state.admin_role_search_result, x, res.data.data.items[x])
                        for (let y in res.data.data.items[x]) {
                            if (y == "status") {
                                state.admin_role_search_result[x].status = statusArr[res.data.data.items[x][y]]
                            }
                        }
                    }
                    //console.log(state.admin_role_search_result)
                }
            })
        },
        //权限管理-资源管理
        GET_SEARCH_ADIMIN_RESOURCE_INFO(state) {
            Util.ajax({
                method: "get",
                url: base_uri.search_admin_resource_list,
            }).then(res => {
                let obj = res.data.data.allLabels
                Util.recursion(obj, "childAdminResources", false)
                //console.log(obj)
                state.admin_resource_search_result = obj
            })
        },
        //数据统计
        GET_AUDIT_OPERATION_INFO(state, { data, pageNo }) {
            state.audit_operation_search_info = data
            state.audit_operation_public_page = pageNo
            Util.ajax({
                method: "post",
                url: base_uri.search_audit_operation_log_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then(res => {
                if (res.data.success) {
                    state.audit_operation = res.data.data
                    state.audit_operation_page_info.currentPage = res.data.data.pageAuditOperationLogResult.page
                    state.audit_operation_page_info.totalPage = res.data.data.pageAuditOperationLogResult.totalCount
                    let obj = res.data.data.pageAuditOperationLogResult.items
                    state.audit_operation_search_result= obj
                    for (let x=0;x<obj.length;x++) {
                        for (let y in obj[x]) {
                            //console.log(y)
                            if (y == "bussinessTime" || y == "opertateTime") {
                                let time = Util.formatDate(new Date(obj[x][y]),"yyyy-MM-dd hh:mm:ss")
                                state.audit_operation_search_result[x][y] = time
                            } 
                        }

                    }
                    //console.log(state.audit_operation_search_result)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        //查询会话列表
        GET_SEARCH_CHATLOG_FOR_PAGE(state, { data, pageNo }){
            state.query_session_search_info = data
            state.query_session_public_page = pageNo
            Util.ajax({
                method:"post",
                url:base_uri.search_chatlog_for_page_url,
                params:{
                    pageNo:pageNo || 1,
                    pageSize:10
                },
                data:data
            }).then(res=>{
                if(res.data.success){
                    state.query_session_search_result = res.data.data.items
                    state.query_session_page_info.currentPage = res.data.data.page
                    state.query_session_page_info.totalPage = res.data.data.totalCount
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        //ip红包查询
        GET_IP_COUPON_QUERY_LIST(state, { data, pageNo }){
            state.ip_coupon_query_search_info = data
            state.ip_coupon_query_public_page = pageNo
            Util.ajax({
                method:"post",
                url:base_uri.search_coupon_for_page_url,
                params:{
                    pageNo:pageNo || 1,
                    pageSize:10
                },
                data:data
            }).then(res=>{
                if(res.data.success){
                    //console.log(res)
                    state.ip_coupon_query_search_result = res.data.data.items
                    state.ip_coupon_query_page_info.currentPage = res.data.data.page
                    state.ip_coupon_query_page_info.totalPage = res.data.data.totalCount
                    let obj = res.data.data.items
                    for(let x=0;x<obj.length;x++)
                    {
                        for(let y in obj[x])
                        {
                            if(y=="createTime")
                            {
                                state.ip_coupon_query_search_result[x].createTime=Util.formatDate(new Date(obj[x][y]),"yyyy-MM-dd hh:mm:ss")
                            }else if(y=="saleEvery")
                            {
                                state.ip_coupon_query_search_result[x][y] = parseInt(obj[x][y]/100)
                            }else if(y=="saleDecrease")
                            {
                                state.ip_coupon_query_search_result[x][y] = parseInt(obj[x][y]/100)
                            }
                        }
                    }
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        //IP红包详情查询
        GET_IP_COUPON_DETAIL_QUERY_LIST(state, { data, pageNo }){
            state.ip_coupon_detail_query_search_info = data
            state.ip_coupon_detail_query_public_page = pageNo
            Util.ajax({
                method:"post",
                url:base_uri.search_usercoupon_for_page_url,
                params:{
                    pageNo:pageNo || 1,
                    pageSize:10
                },
                data:data
            }).then(res=>{
                if(res.data.success){
                    //console.log(res)
                    state.ip_coupon_detail_query_search_result.items = res.data.data.userCouponList.items
                    state.ip_coupon_detail_query_search_result.couponInfo = res.data.data.couponInfo
                    state.ip_coupon_detail_query_page_info.currentPage = res.data.data.userCouponList.page
                    state.ip_coupon_detail_query_page_info.totalPage = res.data.data.userCouponList.totalCount
                    let items = res.data.data.userCouponList.items
                    let couponInfo = res.data.data.couponInfo
                    let useStatusArr = ["没有使用","使用中","已经使用","已经过期"]
                    for(let x=0;x<items.length;x++)
                    {
                        for(let y in items[x])
                        {
                            if(y=="createTime")
                            {
                                state.ip_coupon_detail_query_search_result.items[x][y]=Util.formatDate(new Date(items[x][y]),"yyyy-MM-dd hh:mm:ss")
                            }else if(y=="useStatus")
                            {
                                state.ip_coupon_detail_query_search_result.items[x][y] =useStatusArr[items[x][y]]
                            }
                        }
                    }
                    for(let x in couponInfo)
                    {
                        if(x=="saleDecrease" || x=="saleEvery")
                        {
                            state.ip_coupon_detail_query_search_result.couponInfo[x]=parseInt(couponInfo[x]/100)
                        }else if(x=="beginTime" || x=="endTime")
                        {
                            state.ip_coupon_detail_query_search_result.couponInfo[x] = Util.formatDate(new Date(couponInfo[x]),"yyyy-MM-dd")
                        }
                    }
                    //console.log(state.ip_coupon_detail_query_search_result.couponInfo)
                }
            }).catch(error=>{
                console.log(error)
            })
        },
    }
}
export default app
