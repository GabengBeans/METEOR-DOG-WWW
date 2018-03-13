let base_uri = {
    //阿里云图片地址
    oss_url:  "http://dedc-statics.oss-cn-beijing.aliyuncs.com/",
    //用户地址
    userLogin       : "/admin/v1/oauth/token",

    //服务地址
    serviceList     : "admin/v1/service/search_services_for_page",
    serviceDetail   : "/admin/v1/service/detail/",
    categoryList    : "/admin/v1/categorys/query_two_level/",
    
    //用户分页信息
    user_search_for_page_url:"/admin/v1/user/search_user_for_page",
    //修改用户状态
    user_forbidden_user_url:"/admin/v1/user/forbidden_user/",
    //关注的用户
    user_search_attention_users_for_page_url:"/admin/v1/user/search_attention_users_for_page",
    //用户详细信息
    user_detail_url:"/admin/v1/user/detail/",
    //编辑用户
    user_edit_url:"/admin/v1/user/edit_user",

    //获取需求信息
    demand_search_demands_for_page_url:"/admin/v1/demand/search_demands_for_page/",
    demand_detail_url :"/admin/v1/demand/detail/",
    demand_update_url:"/admin/v1/demand/demand_update/",
    demand_undercarriage_url:"/admin/v1/demand/update/",
    demand_autit_url:"/admin/v1/demand/audit/",
    
    //获取服务信息
    service_search_services_page_url :"/admin/v1/service/search_services_for_page/",
    service_detail_url :"/admin/v1/service/detail/",
    service_undercarriage_url:"/admin/v1/service/update/",
    service_audit_url :"/admin/v1/service/audit/",
    service_update_url :"/admin/v1/service/service_update/",
    
    //二级品类
    category_query_two_level:"/admin/v1/categorys/query_two_level/",

    //订单
    order_search_orders_for_page_url :"/admin/v1/orders/search_orders_for_page/",
    order_detail_url :"/admin/v1/orders/detail/",
    order_drawback_detail_url :"/admin/v1/orders/drawback_detail/",
    order_audit_url :"/admin/v1/orders/audit/",

    //资金流水
    cash_search_account_log_url :"/admin/v1/cash/account_log/search_account_log_for_page",
    //保障金
    account_search_bond_for_page_url :"/admin/v1/cash/account/search_bond_for_page",
    //提现
    cash_search_withdraw_for_page_url :"/admin/v1/cash/withdraw/search_withdraw_for_page",
    cash_withdraw_audit_url :"/admin/v1/cash/withdraw/audit/",

    //商户入驻
    search_business_info_for_page_url:"/admin/v1/business_info/search_business_info_for_page",

    //广告
    new_advert_position_list_two_level_advert_position_url :"/admin/v1/new_advert_position/list_two_level_advert_position/",
    advert_query_advert_url:"/admin/v1/new_advert/query_adverts/",
    new_advert_edit_advert_url :"/admin/v1/new_advert/edit_advert/",
    new_advert_add_url :"/admin/v1/new_advert/add_advert/",
    new_advert_delete_advert_url:"/admin/v1/new_advert/delete_advert/",
    advert_position_search_for_page_url:"/admin/v1/advert_position/search_advert_position_for_page/",
    advert_position_add_url :"/admin/v1/advert_position/add_advert_position/",
    advert_position_delete_url:"/admin/v1/advert_position/delete_advert_position/",
    advert_position_detail_url :"/admin/v1/advert_position/detail/",
    advert_position_edit_url :"/admin/v1/advert_position/edit_advert_position/",
    // 拓展管理信息
     // 代理人管理
    extend_user_search_ex_userinfo_for_page:"/admin/v1/extend_user/search_ex_userinfo_for_page",
    extend_user_detail_url:"/admin/v1/extend_user/detail",
    extend_user_edit_extend_user:"/admin/v1/extend_user/edit_extend_user",
    // 返佣订单审核
    brokerage_order_search_for_page:"/admin/v1/extend_manager/brokerage_order/search_for_page",
    brokerage_order_detail:"/admin/v1/extend_manager/brokerage_order/detail",
    brokerage_order_audit:"/admin/v1/extend_manager/brokerage_order/audit",

    // 佣金结算
    brokerage_balance_search_for_page_url:"/admin/v1/extend_manager/brokerage_balance/search_for_page",
    brokerage_balance_detail_url: "/admin/v1/extend_manager/brokerage_balance/detail",
    brokerage_order_search_for_log_page_url: "/admin/v1/extend_manager/brokerage_order/search_for_log_page",

    // 代理组管理
    extend_group_search_ex_group_for_page: "/admin/v1/extend_group/search_ex_group_for_page",
    extend_group_detail:"/admin/v1/extend_group/detail",
    extend_group_update_group: "/admin/v1/extend_group/update_group",

    //售后管理
    after_feedback_query_for_page :"/admin/v1/after/feedback/search_feedback_for_page",

    //类别管理
    category_search_url :"/admin/v1/categorys/search_category_list",
    category_update_url :"/admin/v1/categorys/update_category/",
    category_delete_url :"/admin/v1/categorys/delete_category/",
    //标签管理
    label_search_label_list_url:"/admin/v1/lables/search_label_list/",
    label_add_lable_url :"/admin/v1/lables/add_lable/"
};

export default base_uri;