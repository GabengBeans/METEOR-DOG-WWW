import Main from '@/views/Main.vue';
////import Cookies from "js-cookie"
import Util from "@/libs/util"


// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};


export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        //{ path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/statistics/statistics_transaction/statistics_transaction_index'], resolve); } },
        { path: 'ownspace', title: '修改密码', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } },
        //用户
        //{ path: 'user-role/:id', title: '修改用户角色', name: 'user-role', component: resolve => { require(['@/views/user/modify_user_role/modify_user_role'], resolve) } },
        { path: 'user-edit/:id', title: '用户编辑', name: 'user-edit', component: resolve => { require(['@/views/user/user_edit/user_edit'], resolve) } },
        { path: 'user-detail/:id', title: '用户详情', name: 'user-detail', component: resolve => { require(['@/views/user/user_detail/user_detail'], resolve) } },

        //需求
        { path: 'request-detail/:id', title: '需求详情', name: 'request-detail', component: resolve => { require(['@/views/request/request_detail/request_detail'], resolve) } },
        { path: 'demand-edit/:id', title: '需求编辑', name: 'demand-edit', component: resolve => { require(['@/views/request/demand_edit/demand_edit'], resolve) } },
        { path: 'demand-review/:id', title: '需求审核', name: 'demand-review', component: resolve => { require(['@/views/request/demand_review/demand_review'], resolve) } },

        //服务
        { path: 'service-detail/:id', title: '服务详情', name: 'service-detail', component: resolve => { require(['@/views/service/request_detail/request_detail'], resolve) } },
        { path: 'service-edit/:id', title: '服务编辑', name: 'service-edit', component: resolve => { require(['@/views/service/demand_edit/demand_edit'], resolve) } },
        { path: 'service-review/:id', title: '服务审核', name: 'service-review', component: resolve => { require(['@/views/service/demand_review/demand_review'], resolve) } },

        //需求订单详情
        { path: 'order-demand-detail/:id', title: '需求订单详情', name: 'order-demand-detail', component: resolve => { require(['@/views/order/order_demand_list/order_demand_detail/order_demand_detail'], resolve) } },
        //需求订单退款
        { path: 'order-demand-drawback/:id', title: '需求订单退款', name: 'order-demand-drawback', component: resolve => { require(['@/views/order/order_demand_list/order_demand_drawback/order_demand_drawback'], resolve) } },
        //服务订单详情
        { path: 'order-service-detail/:id', title: '服务订单详情', name: 'order-service-detail', component: resolve => { require(['@/views/order/order_service_list/order_service_detail/order_service_detail'], resolve) } },
        //服务订单退款
        { path: 'order-service-drawback/:id', title: '服务订单退款', name: 'order-service-drawback', component: resolve => { require(['@/views/order/order_service_list/order_service_drawback/order_service_drawback'], resolve) } },
        // 拓展-代理人管理
        { path: 'expand-manager-detail/:id', title: '代理人详情', name: 'expand-manager-detail', component: resolve => { require(['@/views/expand/expand-manager/expand-manager-detail/expand-manager-detail'], resolve) } },
        { path: 'expand-manager-edit/:id', title: '代理人编辑', name: 'expand-manager-edit', component: resolve => { require(['@/views/expand/expand-manager/expand-manager-edit/expand-manager-edit'], resolve) } },
        { path: 'expand-manager-review/:id', title: '代理人审核', name: 'expand-manager-review', component: resolve => { require(['@/views/expand/expand-manager/expand-manager-review/expand-manager-review'], resolve) } },
        // 拓展-返佣订单审核
        { path: 'expand-order-audit-detail/:id', title: '返佣订单详情', name: 'expand-order-audit-detail', component: resolve => { require(['@/views/expand/expand-order-audit/expand-order-audit-detail/expand-order-audit-detail'], resolve) } },
        // { path: 'expand-order-audit-review/:id', title: '返佣订单详情', name: 'expand-order-audit-review', component: resolve => { require(['@/views/expand/expand-order-audit/expand-order-audit-review/expand-order-audit-review'], resolve) } },

        // 拓展-佣金结算
        { path: 'expand-charge-detail/:id', title: '佣金结算详情', name: 'expand-charge-detail', component: resolve => { require(['@/views/expand/expand-charge-list/expand-charge-detail/expand-charge-detail'], resolve) } },
        { path: 'expand-charge-review/:id', title: '佣金结算审核', name: 'expand-charge-review', component: resolve => { require(['@/views/expand/expand-charge-list/expand-charge-review/expand-charge-review'], resolve) } },
        // 拓展-代理组管理
        { path: 'expand-group-edit/:id', title: '代理组编辑', name: 'expand-group-edit', component: resolve => { require(['@/views/expand/expand-group/expand-group-edit/expand-group-edit'], resolve) } },
        { path: 'expand-group-add/:id', title: '新增代理组', name: 'expand-group-add', component: resolve => { require(['@/views/expand/expand-group/expand-group-add/expand-group-add'], resolve) } },
        { path: 'group_bind_expand/:id', title: '绑定代理人', name: 'group_bind_expand', component: resolve => { require(['@/views/expand/expand-group/group_bind_expand/group_bind_expand'], resolve) } },
        { path: 'group_unbundling_expand/:id', title: '解除绑定代理人', name: 'group_unbundling_expand', component: resolve => { require(['@/views/expand/expand-group/group_unbundling_expand/group_unbundling_expand'], resolve) } },
        //商户入驻
        { path: 'after-merchant-enter-addnew', title: '新增企业IP', name: 'after-merchant-enter-addnew', component: resolve => { require(['@/views/merchant/after_merchant_enter_addnew'], resolve) } },
        //企业IP详情
        { path: 'after-merchant-enter-query-detail/:id', title: '企业IP详情', name: 'after-merchant-enter-query-detail', component: resolve => { require(['@/views/merchant/after_merchant_enter_query/after_merchant_enter_query_detail'], resolve) } },
        //企业IP编辑
        { path: 'after-merchant-enter-query-edit/:id', title: '企业IP编辑', name: 'after-merchant-enter-query-edit', component: resolve => { require(['@/views/merchant/after_merchant_enter_query/after_merchant_enter_query_edit'], resolve) } },
        //ip红包领取和使用详情
        { path: 'ip_coupon_detail/:id', title: 'IP红包领取和使用详情', name: 'ip_coupon_detail', component: resolve => { require(['@/views/ip_coupon/ip_coupon_detail'], resolve) } },
        //数据的统计
        { path: 'audit_user_detail/:id', title: '用户渠道详情', name: 'audit_user_detail', component: resolve => { require(['@/views/audit_operation/audit_user/audit_user_detail'], resolve) } },
        { path: 'audit_service_detail/:id', title: '服务渠道详情', name: 'audit_service_detail', component: resolve => { require(['@/views/audit_operation/audit_service/audit_service_detail'], resolve) } },
        { path: 'audit_demand_detail/:id', title: '需求渠道详情', name: 'audit_demand_detail', component: resolve => { require(['@/views/audit_operation/audit_demand/audit_demand_detail'], resolve) } },
    ]
};

// //作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    { // b.第二种情况：有二级菜单
        path: '/statistics', // 必填
        icon: 'stats-bars', // 必填，同上
        name: "statistic", // 必填，同上
        title: '统计分析', // 必填，同上
        access: 1,
        component: Main, // 必填，同上
        children: [ // 必填，同上
            {
                path: 'index', // 必填，同上的
                name: 'statistics_transaction_list', // 必填，同上
                title: '交易统计', // 必填，将显示在左侧菜单栏二级菜单
                component: resolve => { require(['@/views/statistics/statistics_transaction/statistics_transaction_index'], resolve); }, // 必填
            }
        ]
    },
    { // b.第二种情况：有二级菜单
        path: '/user', // 必填
        icon: 'ios-person', // 必填，同上
        name: 'user', // 必填，同上
        title: '用户管理', // 必填，同上
        access: 1,
        component: Main, // 必填，同上
        children: [ // 必填，同上
            {
                path: 'user_query', // 必填，同上
                name: 'user_query', // 必填，同上
                title: '用户列表', // 必填，将显示在左侧菜单栏二级菜单
                component: resolve => { require(['@/views/user/index'], resolve); }, // 必填
            },
            {
                path: 'user_ability', // 必填，同上
                name: 'user_ability', // 必填，同上
                title: '权限管理', // 必填，将显示在左侧菜单栏二级菜单
                component: resolve => { require(['@/views/user/user_ability/user_ability_index'], resolve); }, // 必填
            }
        ]
    },
    {
        path: '/demand',
        icon: 'document-text',
        name: 'demand', 
        title: '需求管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'demand_audit', 
                icon: 'document-text', 
                name: 'demand_audit', 
                title: '需求列表', 
                component: resolve => { require(['@/views/request/index'], resolve); }, 
            }
        ]
    },
    {
        path: '/service',
        icon: 'clipboard',
        name: 'service', 
        title: '服务管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'service_audit', 
                icon: 'clipboard', 
                name: 'service_audit', 
                title: '服务列表', 
                component: resolve => { require(['@/views/service/index'], resolve); }, 
            }
        ]
    },
    {
        path: '/audit_operation',
        icon: 'ios-pie',
        name: 'audit_operation', 
        title: '数据统计', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'audit_operation_index', 
                name: 'audit_operation_index', 
                title: '审核统计', 
                component: resolve => { require(['@/views/audit_operation/audit_operation_index/audit_operation_index'], resolve); }, 
            },
            {
                path: 'audit_user', 
                name: 'audit_user', 
                title: '用户统计', 
                component: resolve => { require(['@/views/audit_operation/audit_user/audit_user_index'], resolve); }, 
            },
            {
                path: 'audit_service', 
                name: 'audit_service', 
                title: '服务统计', 
                component: resolve => { require(['@/views/audit_operation/audit_service/audit_service_index'], resolve); }, 
            },
            {
                path: 'audit_demand', 
                name: 'audit_demand', 
                title: '需求统计', 
                component: resolve => { require(['@/views/audit_operation/audit_demand/audit_demand_index'], resolve); }, 
            },
            {
                path: 'audit_order', 
                name: 'audit_order', 
                title: '订单统计', 
                component: resolve => { require(['@/views/audit_operation/audit_order/audit_order_index'], resolve); }, 
            }
        ]
    },
    {
        path: '/order',
        icon: 'ios-copy',
        name: 'order', 
        title: '订单管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'order_request', 
                name: 'order_request', 
                title: '需求订单', 
                component: resolve => { require(['@/views/order/order_demand_list/order_demand_list'], resolve); }, 
            },
            {
                path: 'order_service', 
                name: 'order_service', 
                title: '服务订单', 
                component: resolve => { require(['@/views/order/order_service_list/order_service_list'], resolve); }, 
            }
        ]
    },
    {
        path: '/expand',
        icon: 'network',
        name: 'expand',
        title: '拓展管理',
        access: 1,
        component: Main,
        children: [
            { path: 'expand_manage', title: '代理人管理', name: 'expand_manage', icon: 'document', component: resolve => { require(['@/views/expand/expand-manager/index'], resolve); } },
            { path: 'expand_order_audit', title: '返佣订单审核', name: 'expand_order_audit', icon: 'document', component: resolve => { require(['@/views/expand/expand-order-audit/index'], resolve); } },
            { path: 'expand_charge_list', title: '佣金结算', name: 'expand_charge_list', icon: 'document', component: resolve => { require(['@/views/expand/expand-charge-list/index'], resolve); } },            
            { path: 'expand_group', title: '代理组管理', name: 'expand_group', icon: 'document', component: resolve => { require(['@/views/expand/expand-group/index'], resolve); } }            
        ]
    },
    {
        path: '/balance',
        icon: 'cash',
        name: 'balance', 
        title: '结算管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'cash_flow_list', 
                name: 'cash_flow_list',     
                title: '资金流水', 
                component: resolve => { require(['@/views/cash/cash_flow_list/cash_flow_list'], resolve); }, 
            },
            {
                path: 'cash_withdraw_list', 
                name: 'cash_withdraw_list', 
                title: '提现申请', 
                component: resolve => { require(['@/views/cash/cash_withdraw_list/cash_withdraw_list'], resolve); }, 
            },
            {
                path: 'cash_refund_list', 
                name: 'cash_refund_list', 
                title: '保障金退还', 
                component: resolve => { require(['@/views/cash/cash_refund_list/cash_refund_list'], resolve); }, 
            }
        ]
    },
    {
        path: '/advert',
        icon: 'images',
        name: 'advert', 
        title: '广告管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'new_advert_list', 
                name: 'new_advert_list', 
                title: '广告列表', 
                component: resolve => { require(['@/views/advert/advert_new_list/advert_new_list'], resolve); }, 
            },
            {
                path: 'advert_new_bits_list', 
                name: 'advert_new_bits_list', 
                title: '广告位列表', 
                component: resolve => { require(['@/views/advert/advert_new_bits_list/advert_new_bits_list'], resolve); }, 
            },
            {
                path: 'advert_recommend_ip_set', 
                name: 'advert_recommend_ip_set', 
                title: '推荐IP设置', 
                component: resolve => { require(['@/views/advert/advert_recommend_ip_set/recommend_ip_set_index'], resolve); }, 
            }
        ]
    },
    {
        path: '/category',
        icon: 'compose',
        name: 'category', 
        title: '类目管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'category_general', 
                name: 'category_general', 
                title: '类目维护', 
                component: resolve => { require(['@/views/category/category_general/category_general_index'], resolve); }, 
            },
            {
                path: 'category_tab_general', 
                name: 'category_tab_general', 
                title: '标签维护', 
                component: resolve => { require(['@/views/category/category_tab_general/category_tab_general_index'], resolve); }, 
            }
        ]
    },
    {
        path: '/business',
        icon: 'person-stalker',
        name: 'business', 
        title: '商户管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'after_merchant_enter_list', 
                name: 'after_merchant_enter_list', 
                title: '入驻管理', 
                component: resolve => { require(['@/views/merchant/after_merchant_enter'], resolve); }, 
            },
            {
                path: 'after_merchant_enter_query', 
                name: 'after-merchant-enter-query', 
                title: '企业IP查询', 
                component: resolve => { require(['@/views/merchant/after_merchant_enter_query/after_merchant_enter_query'], resolve); }, 
            }
        ]
    },
    {
        path: '/locked',
        icon: 'locked',
        name: 'locked', 
        title: '权限管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'locked_user', 
                name: 'locked-user', 
                title: '用户管理', 
                component: resolve => { require(['@/views/locked/locked_user/locked_user_list'], resolve); }, 
            },
            {
                path: 'locked_role', 
                name: 'locked-role', 
                title: '角色管理', 
                component: resolve => { require(['@/views/locked/locked_role/locked_role_list'], resolve); }, 
            },
            {
                path: 'locked_resource', 
                name: 'locked_resource', 
                title: '资源管理', 
                component: resolve => { require(['@/views/locked/locked_resource/locked_resource_index'], resolve); }, 
            }
        ]
    },
    {
        path: '/sys',
        icon: 'gear-b',
        name: 'sys', 
        title: '系统配置', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'system_settings', 
                name: 'system_settings', 
                title: '系统变量管理', 
                component: resolve => { require(['@/views/system/system_settings/system_settings_index'], resolve); }, 
            }
        ]
    },
    {
        path: '/im',
        icon: 'android-chat',
        name: 'im', 
        title: 'IM', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'query_session_record_index', 
                name: 'query_session_record_index', 
                title: '查询会话记录', 
                component: resolve => { require(['@/views/im/query_session_record/query_session_record_index'], resolve); }, 
            }
        ]
    },
    {
        path: '/resources',
        icon: 'android-apps',
        name: 'resources', 
        title: '资源管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'app_list', 
                name: 'app_list', 
                title: '资源管理', 
                component: resolve => { require(['@/views/app/app_list/app_list_index'], resolve); }, 
            }
        ]
    },
    {
        path: '/after',
        icon: 'ios-telephone',
        name: 'after', 
        title: '售后管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'after_feedback_list', 
                name: 'after_feedback_list', 
                title: '用户反馈管理', 
                component: resolve => { require(['@/views/after_feedback/after_feedback_list/after_feedback_list'], resolve); }, 
            }
        ]
    },
    {
        path: '/ip_coupon',
        icon: 'social-yen',
        name: 'ip-coupon', 
        title: 'IP红包管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'ip_coupon_index', 
                name: 'ip-coupon-index', 
                title: 'IP红包查询', 
                component: resolve => { require(['@/views/ip_coupon/ip_coupon_index'], resolve); }, 
            }
        ]
    },
];


// let menus = []
// if (window.sessionStorage.getItem("menus")) {
//     let serializeMenus = JSON.parse(window.sessionStorage.getItem("menus"))
//     menus = Util.createMenus(serializeMenus)
//     //console.log(menus)
// }

//export const appRouter = menus

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];

// { // b.第二种情况：有二级菜单
    //     path: '/service', // 必填
    //     icon: 'social-buffer', // 必填，同上
    //     name: 'service', // 必填，同上
    //     title: '服务管理', // 必填，同上
    //     access: 1,
    //     component: Main, // 必填，同上
    //     children: [ // 必填，同上
    //         {
    //             path: 'index', // 必填，同上
    //             icon: 'ios-list', // 必填，同上
    //             name: 'service-index', // 必填，同上
    //             title: '服务列表', // 必填，将显示在左侧菜单栏二级菜单
    //             component: resolve => { require(['@/views/service/index'], resolve); } // 必填
    //         }
    //     ]
    // },
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/views/access/access-test.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: { i18n: 'international' },
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: { i18n: 'international' }, name: 'international_index', component: resolve => { require(['@/views/international/international.vue'], resolve); } }
    //     ]
    // },
     // { // b.第二种情况：有二级菜单
    //     path: '/service', // 必填
    //     icon: 'social-buffer', // 必填，同上
    //     name: 'service', // 必填，同上
    //     title: '服务管理', // 必填，同上
    //     access: 1,
    //     component: Main, // 必填，同上
    //     children: [ // 必填，同上
    //         {
    //             path: 'index', // 必填，同上
    //             icon: 'ios-list', // 必填，同上
    //             name: 'service-index', // 必填，同上
    //             title: '服务列表', // 必填，将显示在左侧菜单栏二级菜单
    //             component: resolve => { require(['@/views/service/index'], resolve); } // 必填
    //         }
    //     ]
    // },
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/views/access/access-test.vue'], resolve); } }
    //     ]
    // },
    //{
    //     path: '/international',
    //     icon: 'earth',
    //     title: { i18n: 'international' },
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: { i18n: 'international' }, name: 'international_index', component: resolve => { require(['@/views/international/international.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: resolve => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: resolve => { require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: resolve => { require(['@/views/my-components/image-editor/image-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: resolve => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve); }
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: resolve => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve); }
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: resolve => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve); }
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             component: resolve => { require(['@/views/my-components/count-to/count-to.vue'], resolve); }
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: resolve => { require(['@/views/form/article-publish/article-publish.vue'], resolve); } },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['@/views/form/work-flow/work-flow.vue'], resolve); } }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: resolve => { require(['@/views/tables/dragable-table.vue'], resolve); } },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => { require(['@/views/tables/editable-table.vue'], resolve); } },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: resolve => { require(['@/views/tables/searchable-table.vue'], resolve); } },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: resolve => { require(['@/views/tables/exportable-table.vue'], resolve); } },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => { require(['@/views/tables/table-to-image.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => { require(['@/views/advanced-router/mutative-router.vue'], resolve); } },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: resolve => { require(['@/views/advanced-router/argument-page.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
    //     ]
    // }