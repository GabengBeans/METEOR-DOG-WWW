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
    advert_position_detail_url :"/admin/v1/advert_position/detail/"
};

export default base_uri;