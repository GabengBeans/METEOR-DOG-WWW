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
    cash_search_account_log_url :"/admin/v1/cash/account_log/search_account_log_for_page"
};

export default base_uri;