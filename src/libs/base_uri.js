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
    //二级品类
    category_query_two_level:"/admin/v1/categorys/query_two_level/",

    // 拓展管理信息
     // 代理人管理
    extend_user_search_ex_userinfo_for_page:"/admin/v1/extend_user/search_ex_userinfo_for_page",
    extend_user_detail_url:"/admin/v1/extend_user/detail",
    extend_user_edit_extend_user:"/admin/v1/extend_user/edit_extend_user",
    // 返佣订单审核
    brokerage_order_search_for_page:"/admin/v1/extend_manager/brokerage_order/search_for_page",
    brokerage_order_detail:"/admin/v1/extend_manager/brokerage_order/detail"

};

export default base_uri;