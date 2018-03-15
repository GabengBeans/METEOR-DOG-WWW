import { otherRouter, appRouter } from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
import baseUri from '@/libs/base_uri'
import base_uri from '../../libs/base_uri';
const app = {
    state: {
        //用户公共状态
        user_page_info: {//用户页页码
            currentPage: 1,
            totalPage: 0
        },
        user_search_info: { "status": "-1" },//用户页搜索条件
        user_search_result: [],//用户页搜过结果
        user_public_page:1,

        //需求公共状态
        request_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        request_search_info: { "businessStatus": "0", "status": "-1" },
        request_search_result: [],
        request_public_page:1,

        //服务公共状态
        service_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        service_search_info: { "businessStatus": "0", "status": "-1" },
        service_search_result: [],
        service_public_page:1,

        //需求订单公共状态
        order_demand_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        order_demand_search_info: { "businessType": "2", "orderStatus": "0" },
        order_demand_search_result: [],
        order_demand_public_page:1,

        //服务订单公共状态
        order_service_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        order_service_search_info: { "businessType": "1", "orderStatus": "0" },
        order_service_search_result: [],
        order_service_public_page:1,

        //资金流水公共状态
        cash_flow_search_info: { "chargeStatus": "-1", "tradeType": "0" },
        cash_flow_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        cash_flow_search_result: [],
        cash_flow_public_page:1,

        //保障金
        cash_refund_search_info: { "bondStatus": "-1" },
        cash_refund_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        cash_refund_search_result: [],
        cash_refund_public_page:1,

        //提现
        cash_withdraw_search_info: { "applyStatus": "-1" },
        cash_withdraw_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        cash_withdraw_search_result: [],
        cash_withdraw_public_page:1,

        //商户入驻
        merchant_enter_search_info: {},
        merchant_enter_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        merchant_enter_search_result: [],
        merchant_enter_public_page:1,

        //广告
        advert_new_search_info: {},
        advert_new_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        advert_new_search_result: [],
        advert_new_public_page:1,

        //广告位
        advert_position_search_info: {},
        advert_position_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        advert_position_search_result: [],
        advert_position_public_page:1,

        //售后管理
        after_feedback_search_info: {},
        after_feedback_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        after_feedback_search_result: [],
        after_feedback_public_page:1,

        // 拓展用户--代理人
        expand_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        expand_search_info: { "expandStatus": "-1" },
        expand_search_result: [],
        
        // 拓展用户--返佣订单审核
        brokerage_order_info: {
            currentPage: 1,
            totalPage: 0
        },
        brokerage_order_search_info: { "businessStatus": "0" },
        brokerage_order_search_result: [],

        //类目管理
        category_search_result:{
            childCategory:[]
        },
        categorys_search_result:{
            childCategory:[]
        },

        //标签管理
        category_tab_search_result:{
           
        },
        categorys_tab_search_result:{
            
        },

        //统计
        order_statistics_search_info: {},
        order_statistics_search_result:{},

        //系统配置
        system_settings_search_info: {},
        system_settings_page_info: {
            currentPage: 1,
            totalPage: 0
        },
        system_settings_search_result: [],
        system_settings_public_page:1,

        //app管理
        app_search_info:{},
        app_page_info:{
            currentPage: 1,
            totalPage: 0
        },
        app_search_result: [],
        app_public_page:1,

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
            let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            appRouter.forEach((item, index) => {
                if (item.access !== undefined) {
                    if (Util.showThisRoute(item.access, accessCode)) {
                        if (item.children.length === 1) {
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (child.access === accessCode) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            menuList[len - 1].children = childrenArr;
                        }
                    }
                } else {
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
                }
            });
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
            state.currentPageName = name;
        },
        setAvator(state, path) {
            localStorage.avatorImgPath = path;
        },
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
                console.log(response)
                state.user_page_info.currentPage = parseInt(response.data.data.page)
                state.user_page_info.totalPage = parseInt(response.data.data.totalCount)
                //console.log(typeof state.user_page_info.currentPage)
                let arr = response.data.data.items
                state.user_search_result = response.data.data.items
                //console.log(arr)
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
                let businessStatus = ["全部", "待发布", "审核中", "已发布", "已过期", "审核未通过", "取消发布"]
                let status = ["无效", "有效"]
                state.request_page_info.currentPage = parseInt(response.data.data.page)
                state.request_page_info.totalPage = parseInt(response.data.data.totalCount)
                state.request_search_result = response.data.data.items
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
                let businessStatus = ["全部", "待发布", "审核中", "已发布", "已过期", "审核未通过", "取消发布"]
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
                headers: {
                    'token': Cookies.get("token")
                },
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
                console.log(state.order_service_search_result)
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
                    state.cash_flow_search_result[x].createTime = Util.formatDate(new Date(arr[x].createTime), "yyyy-MM-dd hh:mm:ss")
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
            state.cash_flow_search_info = data
            state.cash_flow_public_page = pageNo                                    
            Util.ajax({
                method: "post",
                url: base_uri.account_search_bond_for_page_url,
                params: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                },
                data: data
            }).then((response) => {
                console.log(response)
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
                console.log(state.cash_refund_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //提现申请
        GET_CASH_WITHDRAW_INFO(state, { data, pageNo }) {
            state.cash_flow_serch_info = data
            state.cash_flow_public_page = pageNo                                    
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
        //拓展管理
        GET_BROKERAGE_ORDER_INFO(state, { data, pageNo }) {
            state.brokerage_order_search_info = data         
            
            Util.ajax({
                method: "post",
                url: base_uri.brokerage_order_search_for_page,
                headers: {
                    'token': Cookies.get("token")
                },
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
        GET_CATEGORY_SEARCH_INFO(state,{businessType}){
            Util.ajax({
                method: "get",
                url: base_uri.category_search_url,
                params: {
                    businessType:businessType
                }
            }).then((response) => {
                //console.log(response)
                let obj =response.data.data.allCategory[0]
                if(businessType==1) 
                {
                    if(response.data.success)
                    {
                    Util.recursion(response.data.data.allCategory,"childCategory")
                    state.category_search_result = response.data.data.allCategory[0]
                    }
                    
                }else if(businessType==2)
                {
                    if(response.data.success)
                    {
                        Util.recursion(response.data.data.allCategory,"childCategory")
                        state.categorys_search_result = response.data.data.allCategory[0]
                    }
                }
                
            }).catch((error) => {
                console.log(error)
            })
        },
        //标签管理
        GET_LABEL_LIST_SEARCH_INFO(state,{lableType}){
            Util.ajax({
                method: "get",
                url: base_uri.label_search_label_list_url,
                params: {
                    lableType:lableType
                }
            }).then((response) => {
                //console.log(response)
                if(lableType==1) 
                {
                    if(response.data.success)
                    {
                        let levelName = []
                        for(let x=0;x<response.data.data.allLabels.length;x++)
                        {
                            let obj = {}
                            obj.name = response.data.data.allLabels[x].name
                            obj.id = response.data.data.allLabels[x].id
                            levelName.push(obj)
                        }
                       Util.recursion(response.data.data.allLabels,"childLableVos")
                       Vue.set(state.category_tab_search_result,"allLabels",response.data.data.allLabels)
                       //console.log(state.category_tab_search_result.allLabels instanceof Array)
                       Vue.set(state.category_tab_search_result,"tabName","买家")
                       Vue.set(state.category_tab_search_result,"levelName",levelName)
                       Vue.set(state.category_tab_search_result,"labelType","1")
                       //console.log(state.category_tab_search_result)
                    }
                    
                }else if(lableType==2)
                {
                    if(response.data.success)
                    {
                        let levelName = []
                        for(let x=0;x<response.data.data.allLabels.length;x++)
                        {
                            let obj = {}
                            obj.name = response.data.data.allLabels[x].name
                            obj.id = response.data.data.allLabels[x].id
                            levelName.push(obj)
                        }
                        Util.recursion(response.data.data.allLabels,"childLableVos")
                        Vue.set(state.categorys_tab_search_result,"allLabels",response.data.data.allLabels)
                        Vue.set(state.categorys_tab_search_result,"tabName","卖家")
                        Vue.set(state.categorys_tab_search_result,"levelName",levelName)
                        Vue.set(state.categorys_tab_search_result,"labelType","2")
                    }
                }
                //console.log(state.category_tab_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //统计
        GET_ORDER_STATISTICS_SEARCH_INFO(state,{time}){
            Util.ajax({
                method: "post",
                url: base_uri.order_statistics_query,
                data:time
            }).then((response) => {
                
                if(response.data.success)
                {
                    
                    // for(let x in response.data.data)
                    //  {
                    //      Vue.set(state.order_statistics_search_result,x,parseInt(response.data.data[x]))
                    //  }
                    state.order_statistics_search_result = response.data.data
                  
                }
                //console.log(state.order_statistics_search_result)
            }).catch((error) => {
                console.log(error)
            })
        },
        //系统变量
        GET_SYSTEM_SETTINGS_SEARCH_INFO(state,{data,pageNo}){
            state.system_settings_search_info = data
            state.system_settings_public_page = pageNo                        
            
            Util.ajax({
                method:"post",
                url:base_uri.search_setting_info_for_page,
                params:{
                    pageNo:pageNo || 1,
                    pageSize:10
                },
                data:data
            }).then(res=>{
                //console.log(res)
                if(res.data.success)
                {
                    state.system_settings_page_info.currentPage = res.data.data.page
                    state.system_settings_page_info.totalPage = res.data.data.totalCount
                    state.system_settings_search_result = res.data.data.items
                    for(let x in res.data.data.items)
                    {
                        if(res.data.data.items[x].status)
                        {
                            state.system_settings_search_result[x].status = "有效"
                        }else{
                            state.system_settings_search_result[x].status = "无效"
                        }
                    }
                }   
            }).catch(error=>{
                console.log(error)
            })
        },
        //app管理
        GET_APP_SEARCH_INFO(state,{data,pageNo})
        {
            state.app_public_page = pageNo                        

            Util.ajax({
                method:"post",
                url:base_uri.app_search_url,
                params:{
                    pageNo:pageNo || 1,
                    pageSize:10
                },
                data:data
            }).then(res=>{
                //console.log(res)
                if(res.data.success)
                {
                    state.app_page_info.currentPage = res.data.data.page
                    state.app_page_info.totalPage = res.data.data.totalCount
                    state.app_search_result = res.data.data.items
                    for(let x in res.data.data.items)
                    {
                        state.app_search_result[x].createTime = Util.formatDate(new Date(res.data.data.items[x].createTime),"yyyy-MM-dd hh:mm:ss")   
                    }
                }
                console.log(state.app_search_result)
            })
        }
    }
}
export default app
