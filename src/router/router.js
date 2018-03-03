import Main from '@/views/Main.vue';

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
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        //{ path: 'order/:order_id', title: '订单详情', name: 'order-info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } }, // 用于展示动态路由
        //{ path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } },

        //{ path: 'service-detail/:id', title: '服务详情', name: 'service-detail', component: resolve => { require(['@/views/service/detail'], resolve); } },
        //{ path: 'service-edit/:id', title: '服务修改', name: 'service-edit', component: resolve => { require(['@/views/service/edit'], resolve); } },
       //用户
        { path: 'user-role/:id', title: '修改用户角色', name: 'user-role', component: resolve => { require(['@/views/user/modify_user_role/modify_user_role'], resolve) } },
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
        //服务订单详情
        { path: 'order-service-detail/:id', title: '服务订单详情', name: 'order-service-detail', component: resolve => { require(['@/views/order/order_service_list/order_service_detail/order_service_detail'], resolve) } }
    ],
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    { // b.第二种情况：有二级菜单
        path: '/user', // 必填
        icon: 'ios-person', // 必填，同上
        name: 'user', // 必填，同上
        title: '用户管理', // 必填，同上
        access: 1,
        component: Main, // 必填，同上
        children: [ // 必填，同上
            {
                path: 'index', // 必填，同上
                icon: 'ios-list', // 必填，同上
                name: 'user-index', // 必填，同上
                title: '用户列表', // 必填，将显示在左侧菜单栏二级菜单
                component: resolve => { require(['@/views/user/index'], resolve); }, // 必填
            }
        ]
    },
    {
        path: '/request',
        icon: 'document-text',
        name: 'request', 
        title: '需求管理', 
        access: 1,
        component: Main, 
        children: [ 
            {
                path: 'index', 
                icon: 'document-text', 
                name: 'request-index', 
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
                path: 'index', 
                icon: 'clipboard', 
                name: 'service-index', 
                title: '服务列表', 
                component: resolve => { require(['@/views/service/index'], resolve); }, 
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
                path: 'order-demand-list', 
                name: 'order-demand-list', 
                title: '需求订单', 
                component: resolve => { require(['@/views/order/order_demand_list/order_demand_list'], resolve); }, 
            },
            {
                path: 'order-service-list', 
                name: 'order-service-list', 
                title: '服务订单', 
                component: resolve => { require(['@/views/order/order_service_list/order_service_list'], resolve); }, 
            }
        ]
    },
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
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/views/access/access-test.vue'], resolve); } }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: { i18n: 'international' },
        name: 'international',
        component: Main,
        children: [
            { path: 'index', title: { i18n: 'international' }, name: 'international_index', component: resolve => { require(['@/views/international/international.vue'], resolve); } }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: Main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: resolve => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve); }
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: resolve => { require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve); }
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: resolve => { require(['@/views/my-components/image-editor/image-editor.vue'], resolve); }
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: resolve => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve); }
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: resolve => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve); }
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: resolve => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve); }
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                component: resolve => { require(['@/views/my-components/count-to/count-to.vue'], resolve); }
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: Main,
        children: [
            { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: resolve => { require(['@/views/form/article-publish/article-publish.vue'], resolve); } },
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['@/views/form/work-flow/work-flow.vue'], resolve); } }

        ]
    },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [
            { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: resolve => { require(['@/views/tables/dragable-table.vue'], resolve); } },
            { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => { require(['@/views/tables/editable-table.vue'], resolve); } },
            { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: resolve => { require(['@/views/tables/searchable-table.vue'], resolve); } },
            { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: resolve => { require(['@/views/tables/exportable-table.vue'], resolve); } },
            { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => { require(['@/views/tables/table-to-image.vue'], resolve); } }
        ]
    },
    {
        path: '/advanced-router',
        icon: 'ios-infinite',
        name: 'advanced-router',
        title: '高级路由',
        component: Main,
        children: [
            { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => { require(['@/views/advanced-router/mutative-router.vue'], resolve); } },
            { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: resolve => { require(['@/views/advanced-router/argument-page.vue'], resolve); } }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
        ]
    }
];

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
