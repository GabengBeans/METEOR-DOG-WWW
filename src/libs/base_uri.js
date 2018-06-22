let base_uri = {
    //默认狗头图片
    img_url:"/images/user/5/4/548a2573b46cb1c8e90aee11bdfad978.png",
    //图片上传地址
    img_upload_url:"https://lxg.91taogu.com/up/",
    //img_upload_url:"/oss/v1/upload_img",
    //阿里云图片地址
    oss_url: "http://dedc-statics.oss-cn-beijing.aliyuncs.com/",
    //用户地址
    userLogin: "/admin/v1/oauth/token",
    //请求视频地址
    create_video_address_url:"/api/v1/video/create",
    get_play_url:"/api/v1/video/play_url",
    //服务地址
    serviceList: "admin/v1/service/search_services_for_page",
    serviceDetail: "/admin/v1/service/detail/",
    categoryList: "/admin/v1/categorys/query_two_level/",

    //password
    admin_update_password_url :"/admin/v1/admin_user/update_password",
    //当前用户菜单查询
    menu_query_url:"/admin/v1/menus/query_menus",

    //用户分页信息
    user_search_for_page_url: "/admin/v1/user/search_user_for_page",
    //修改用户状态
    user_forbidden_user_url: "/admin/v1/user/forbidden_user/",
    //关注的用户
    user_search_attention_users_for_page_url: "/admin/v1/user/search_attention_users_for_page",
    //用户详细信息
    user_detail_url: "/admin/v1/user/detail/",
    //编辑用户
    user_edit_url: "/admin/v1/user/edit_user",
    //用户权限
    search_user_ability_for_page_url:"/admin/v1/user/search_user_ability_for_page",
    get_user_ability_byid:"/admin/v1/user/get_user_ability_byid",
    update_user_ability_url:"/admin/v1/user/update_user_ability",
    convert_expand_type:"/admin/v1/user/convert_expand_type",
    //获取需求信息
    demand_search_demands_for_page_url: "/admin/v1/demand/search_demands_for_page/",
    demand_detail_url: "/admin/v1/demand/detail/",
    demand_update_url: "/admin/v1/demand/demand_update/",
    demand_undercarriage_url: "/admin/v1/demand/update/",
    demand_autit_url: "/admin/v1/demand/audit/",

    //获取服务信息
    service_search_services_page_url: "/admin/v1/service/search_services_for_page/",
    service_detail_url: "/admin/v1/service/detail/",
    service_undercarriage_url: "/admin/v1/service/update/",
    service_audit_url: "/admin/v1/service/audit/",
    service_update_url: "/admin/v1/service/service_update/",

    //二级品类
    category_query_two_level: "/admin/v1/categorys/query_two_level/",

    //订单
    order_search_orders_for_page_url: "/admin/v1/orders/search_orders_for_page/",
    order_detail_url: "/admin/v1/orders/detail/",
    order_drawback_detail_url: "/admin/v1/orders/drawback_detail/",
    order_audit_url: "/admin/v1/orders/audit/",

    //资金流水
    cash_search_account_log_url: "/admin/v1/cash/account_log/search_account_log_for_page",
    //保障金
    account_search_bond_for_page_url: "/admin/v1/cash/account/search_bond_for_page",
    audit_account:"/admin/v1/cash/account/audit",
    //提现
    cash_search_withdraw_for_page_url: "/admin/v1/cash/withdraw/search_withdraw_for_page",
    cash_withdraw_audit_url: "/admin/v1/cash/withdraw/audit/",

    //商户入驻
    search_business_info_for_page_url: "/admin/v1/business_info/search_business_info_for_page",
    consent_business_enter_url:"/admin/v1/business_info/consent_business_enter",
    //已入驻商户查询
    search_business_enter_for_page_url:"/admin/v1/business_info/search_business_enter_for_page",
    add_business_url:"/admin/v1/business_info/add_business",
    enable_or_disable_business_url:"/admin/v1/business_info/ enable_or_disable_business",
    get_business_info_url:"/admin/v1/business_info/get_business_info",
    update_business_info:"/admin/v1/business_info/update_business_info",
    //广告
    new_advert_position_list_two_level_advert_position_url: "/admin/v1/new_advert_position/list_two_level_advert_position/",
    advert_query_advert_url: "/admin/v1/new_advert/query_adverts/",
    new_advert_edit_advert_url: "/admin/v1/new_advert/edit_advert/",
    new_advert_add_url: "/admin/v1/new_advert/add_advert/",
    new_advert_delete_advert_url: "/admin/v1/new_advert/delete_advert/",
    advert_position_search_for_page_url: "/admin/v1/advert_position/search_advert_position_for_page/",
    advert_position_add_url: "/admin/v1/advert_position/add_advert_position/",
    advert_position_delete_url: "/admin/v1/advert_position/delete_advert_position/",
    advert_position_detail_url: "/admin/v1/advert_position/detail/",
    advert_position_edit_url: "/admin/v1/advert_position/edit_advert_position/",
        //推荐IP设置
    add_recommend_url:"/admin/v1/advert/add_recommend",
    search_recommend_for_page_url:"/admin/v1/advert/search_recommend_for_page",
    up_recommend_url:"/admin/v1/advert/up_recommend",
    del_recommend_url:"/admin/v1/advert/del_recommend",

    // 拓展管理信息
    extend_user_search_ex_userinfo_for_page: "/admin/v1/extend_user/search_ex_userinfo_for_page",
    extend_user_detail_url: "/admin/v1/extend_user/detail",
    extend_user_edit_extend_user: "/admin/v1/extend_user/edit_extend_user",
    expand_people_template_url: "http://dedc-statics.oss-cn-beijing.aliyuncs.com/files/expand-people.xls", // 下载代理人模板地址
    extend_user_import_url: "/admin/v1/extend_user/import", // 代理人导入地址
    extend_user_export_url: "/admin/v1/extend_user/expand_people_export",   // 代理人导出地址
    // 返佣订单审核
    brokerage_order_search_for_page:"/admin/v1/extend_manager/brokerage_order/search_for_page",
    brokerage_order_detail:"/admin/v1/extend_manager/brokerage_order/detail",
    brokerage_order_audit:"/admin/v1/extend_manager/brokerage_order/audit_compatible",
    brokerage_order_batch_update_order: "/admin/v1/extend_manager/brokerage_order/batch_update_order",

    // 佣金结算
    brokerage_balance_search_for_page_url:"/admin/v1/extend_manager/brokerage_balance/search_for_page",
    brokerage_balance_detail_url: "/admin/v1/extend_manager/brokerage_balance/detail",
    brokerage_order_search_for_log_page_url: "/admin/v1/extend_manager/brokerage_order/search_for_log_page",
    brokerage_balance_audit_url: "/admin/v1/extend_manager/brokerage_balance/audit",
    brokerage_balance_batch_update_order: "/admin/v1/extend_manager/brokerage_balance/batch_update_order",

    // 代理组管理
    extend_group_search_ex_group_for_page: "/admin/v1/extend_group/search_ex_group_for_page",
    extend_group_detail:"/admin/v1/extend_group/detail",
    extend_group_update_group: "/admin/v1/extend_group/update_group",
    extend_group_add_group: "/admin/v1/extend_group/add_group",    
    extend_group_delete_group: "/admin/v1/extend_group/delete_group",
    get_bind_expend_list_url:"/admin/v1/extend_user/get_bind_expend_list",//可绑定代理人列表
    get_group_expend_list_url:"/admin/v1/extend_group/get_group_expend_list",//解绑代理人列表
    extend_group_bind_expand_in_group: "/admin/v1/extend_group/bind_expand_in_group",//绑定到代理组
    extend_group_unbundind_expand_in_group: "/admin/v1/extend_group/unbundind_expand_in_group",

    //售后管理
    after_feedback_query_for_page: "/admin/v1/after/feedback/search_feedback_for_page",

    //类别管理
    category_search_url: "/admin/v1/categorys/search_category_list",
    category_update_url: "/admin/v1/categorys/update_category/",
    category_delete_url: "/admin/v1/categorys/delete_category/",
    categorys_bind_lable_url:"/admin/v1/categorys/bind_lable/",

    //标签管理
    label_search_label_list_url: "/admin/v1/lables/search_label_list/",
    label_add_lable_url: "/admin/v1/lables/add_lable/",
    label_update_label_url: "/admin/v1/lables/update_label/",
    label_delete_label_url: "/admin/v1/lables/delete_label/",
    search_bind_label_list:"/admin/v1/categorys/search_bind_label_list",
    
    //统计页
    order_statistics_query: "/admin/v1/order_statistics/query_statistics",

    //系统变量
    search_setting_info_for_page: "/admin/v1/setting_info/search_setting_info_for_page",
    add_setting_url: "/admin/v1/setting_info/add_setting/",
    edit_setting_url:"/admin/v1/setting_info/edit_setting/",
    enabling_setting_url:"/admin/v1/setting_info/enabling_setting/",
    delete_setting_url:"/admin/v1/setting_info/delete_setting/",

    //资源管理
    app_search_url:"/admin/v1/resources/app/search_for_page",
    app_add_url:"/admin/v1/resources/app/add",

    //权限管理
        //用户角色管理
    search_admin_user_info:"/admin/v1/admin_user/search_admin_user_info_for_page",
    disable_admin_user_url:"/admin/v1/admin_user/disable_admin_user",
    enabling_admin_user_url:"/admin/v1/admin_user/enabling_admin_user",
    admin_user_detail_url:"/admin/v1/admin_user/detail",
    find_grant_admin_role_url:"/admin/v1/admin_user/find_grant_admin_role",
    //get_roleList_url:"/admin/v1/admin_user/roleList",
    get_roleList_url:"/admin/v1/admin_user/role_list",
    edit_admin_user_url:"/admin/v1/admin_user/edit_admin_user",
    grant_admin_role_url:"/admin/v1/admin_user/grant_admin_role",
    add_admin_user:"/admin/v1/admin_user/add_admin_user",
        //角色管理
    search_admin_role_info:"/admin/v1/admin_role/search_admin_role_info_for_page",
    disable_admin_role_url:"/admin/v1/admin_role/disable_admin_role",
    enabling_admin_role_url:"/admin/v1/admin_role/enabling_admin_role",
    admin_role_detail_url:"/admin/v1/admin_role/detail",
    find_grant_admin_resource_url:"/admin/v1/admin_role/find_grant_admin_resource",
    add_admin_role_url:"/admin/v1/admin_role/add_admin_role",
    edit_grant_admin_resource_url:"/admin/v1/admin_role/grant_admin_resource",
        //资源管理
    search_admin_resource_list:"/admin/v1/admin_resource/search_admin_resource_list",
    disable_admin_resource_url:"/admin/v1/admin_resource/disable_admin_resource",
    enabling_admin_resource_url:"/admin/v1/admin_resource/enabling_admin_resource",
    resource_detail_url:"/admin/v1/admin_resource/detail",
    update_admin_resource_url:"/admin/v1/admin_resource/update_admin_resource",
    add_admin_resource_url:"/admin/v1/admin_resource/add_admin_resource",

    //审核统计
    get_adminUserLis_url:"/admin/v1/audit_operation_log/adminUserList",
    search_audit_operation_log_for_page_url:"/admin/v1/audit_operation_log/search_audit_operation_log_for_page",
    search_statistics_system_daily_info_for_page_url:"/admin/v1/statistics_system_daily/search_statistics_system_daily_info_for_page",
    search_statistics_channel_daily_info_url:"/admin/v1/statistics_channel_daily/search_statistics_channel_daily_info",

    //IM
    search_chatlog_for_page_url:"/admin/v1/chatlog/search_chatlog_for_page",
    query_session_detail:"/admin/v1/chatlog/detail",

    //ip红包查询
    search_coupon_for_page_url:"/admin/v1/coupon/search_coupon_for_page",
    search_usercoupon_for_page_url:"/admin/v1/coupon/search_usercoupon_for_page",
    update_coupon_status:"/admin/v1/coupon/update_coupon_status",

    //红包广告
    search_advert_coupon_for_page_url:"/admin/v1/advert/search_advert_coupon_for_page",
    edit_advert_coupon_url:"/admin/v1/advert/edit_advert_coupon",

    //动态
    search_dynamic_for_page_url:"/admin/v1/dynamic/search_dynamic_for_page",//动态查询
    dynamic_detail_url:"/admin/v1/dynamic/detail",
    dynamic_audit:"/admin/v1/dynamic/audit",
};

export default base_uri;