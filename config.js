/***
 * author huijun
 * date 2017-11-16
 */
 export {login_url,
    menu_query_url,
    user_update_url,
    user_search_for_page_url,
    demand_search_demands_for_page_url,
    service_search_services_page_url,
    user_forbidden_user_url,
    user_detail_url,
    oss_url,
    user_search_attention_users_for_page_url
}
//配置地址
var img_upload_url = "https://lxg.91taogu.com/up/"
//var global_server_url="http://127.0.0.1:8822"
 var global_server_url= "http://39.106.51.236:8822"
var oss_url = "http://dedc-statics.oss-cn-beijing.aliyuncs.com/"
// var oss_upload_url = "https://lxg.91taogu.com/up/";

//==========类别===========
var category_search_url = global_server_url+"/admin/v1/categorys/search_category_list"
var category_delete_url = global_server_url+"/admin/v1/categorys/delete_category/"
var category_update_url = global_server_url+"/admin/v1/categorys/update_category/"
var category_batch_operate_url = global_server_url+"/admin/v1/categorys/batch_update_category/"
var category_detail_url = global_server_url+"/admin/v1/categorys/detail/"
var category_add_url = global_server_url+"/admin/v1/categorys/add_category/"
var category_query_two_link_data_url = global_server_url+"/admin/v1/categorys/query_two_link_data/"
var category_search_bind_label_url = global_server_url+"/admin/v1/categorys/search_bind_label_list/"
var category_bind_lable_url   = global_server_url+"/admin/v1/categorys/bind_lable/"
var category_query_two_level  = global_server_url+"/admin/v1/categorys/query_two_level/"
//==========订单===========
var order_search_order_url = global_server_url+"/admin/v1/orders/search_order_for_page/"
var order_audit_url = global_server_url+"/admin/v1/orders/audit/"
var order_detail_url = global_server_url+"/admin/v1/orders/detail/"
var order_search_orders_for_page_url = global_server_url+"/admin/v1/orders/search_orders_for_page/";

var order_drawback_detail_url = global_server_url+"/admin/v1/orders/drawback_detail/";
//==========标签===========
var label_search_label_list_url = global_server_url+"/admin/v1/lables/search_label_list/"
var label_delete_label_url = global_server_url+"/admin/v1/lables/delete_label/";
var label_update_label_url = global_server_url+"/admin/v1/lables/update_label/";
var label_detail_url = global_server_url+"/admin/v1/lables/detail/";
var label_add_lable_url = global_server_url+"/admin/v1/lables/add_lable/";
var label_query_two_link_data_url = global_server_url+"/admin/v1/lables/query_two_link_data/"
//==========需求===========
var demand_search_demands_for_page_url = global_server_url+"/admin/v1/demand/search_demands_for_page/"
var demand_autit_url = global_server_url+"/admin/v1/demand/audit/"
var demand_undercarriage_url = global_server_url+"/admin/v1/demand/update/"
var demand_update_url = global_server_url+"/admin/v1/demand/demand_update/"
var demand_detail_url = global_server_url+"/admin/v1/demand/detail/"
//==========服务===========
var service_search_services_page_url = global_server_url+"/admin/v1/service/search_services_for_page/"
var service_audit_url = global_server_url+"/admin/v1/service/audit/"
var service_undercarriage_url = global_server_url+"/admin/v1/service/update/"
var service_detail_url = global_server_url+"/admin/v1/service/detail/"
var service_update_url = global_server_url+"/admin/v1/service/service_update/"
//==========广告=================
var advert_add_url = global_server_url+"/admin/v1/advert/add_advert/"
var advert_edit_url = global_server_url+"/admin/v1/advert/edit_advert/"
var advert_delete_url = global_server_url+"/admin/v1/advert/delete_advert/"
var advert_search_advert_url = global_server_url+"/admin/v1/advert/search_advert_for_page/"
var advert_detail_url = global_server_url+"/admin/v1/advert/detail/"
//=================新广告需求================
var advert_query_advert_url = global_server_url+"/admin/v1/new_advert/query_adverts/"
var new_advert_add_url = global_server_url+"/admin/v1/new_advert/add_advert/"
var new_advert_position_list_two_level_advert_position_url = global_server_url+"/admin/v1/new_advert_position/list_two_level_advert_position/"
var new_advert_detail_url = global_server_url+"/admin/v1/new_advert/detail/"
var new_advert_edit_advert_url = global_server_url+"/admin/v1/new_advert/edit_advert/"
var new_advert_delete_advert_url = global_server_url+"/admin/v1/new_advert/delete_advert/"
//============广告位=======================
var advert_position_list_url = global_server_url+"/admin/v1/advert_position/list_advert_position/"
var advert_position_add_url = global_server_url+"/admin/v1/advert_position/add_advert_position/"
var advert_position_edit_url = global_server_url+"/admin/v1/advert_position/edit_advert_position/"
var advert_position_delete_url = global_server_url+"/admin/v1/advert_position/delete_advert_position/"
var advert_position_detail_url = global_server_url+"/admin/v1/advert_position/detail/"
var advert_position_search_for_page_url = global_server_url+"/admin/v1/advert_position/search_advert_position_for_page/"
//===============用户============
var user_search_for_page_url = global_server_url+"/admin/v1/user/search_user_for_page"
var user_search_attention_users_for_page_url = global_server_url+"/admin/v1/user/search_attention_users_for_page"
var user_forbidden_user_url = global_server_url+"/admin/v1/user/forbidden_user/"
var user_detail_url = global_server_url+"/admin/v1/user/detail/"
var user_update_url = global_server_url+"/admin/v1/user/update/"
var user_edit_url   = global_server_url+"/admin/v1/user/edit_user"
var user_certificate_detail_url = global_server_url+"/admin/v1/user/certificate_detail"

//登录
var login_url = global_server_url+"/admin/v1/oauth/token"
var login_check_token_url = global_server_url+"/admin/v1/oauth/check_token"
var admin_update_password_url = global_server_url+"/admin/v1/admin_user/update_password"
//查询当前用户下的菜单资源
var menu_query_url = global_server_url+"/admin/v1/menus/query_menus"
var query_current_page_menus = global_server_url+"/admin/v1/menus/query_current_page_menus"

//===========================资金结算=============================
var cash_search_account_log_url = global_server_url+"/admin/v1/cash/account_log/search_account_log_for_page"
var cash_search_withdraw_for_page_url = global_server_url+"/admin/v1/cash/withdraw/search_withdraw_for_page"
var cash_withdraw_audit_url = global_server_url+"/admin/v1/cash/withdraw/audit/"
//================================================拓展管理
var extend_brokerage_order_page_url = global_server_url+"/admin/v1/extend_manager/brokerage_order/search_for_page"
var extend_brokerage_log_order_page_url = global_server_url+"/admin/v1/extend_manager/brokerage_order/search_for_log_page"


var extend_brokerage_order_detail_url = global_server_url+"/admin/v1/extend_manager/brokerage_order/detail"

var extend_brokerage_audit_url = global_server_url+"/admin/v1/extend_manager/brokerage_order/audit"
var extend_brokerage_batch_audit_url = global_server_url+"/admin/v1/extend_manager/brokerage_order/batch_update_order"
var extend_user_for_page_url = global_server_url+"/admin/v1/extend_user/search_ex_userinfo_for_page"
var extend_user_detail_url = global_server_url+"/admin/v1/extend_user/detail"
var extend_user_edit_url = global_server_url+"/admin/v1/extend_user/edit_extend_user"
var extend_user_import_url = global_server_url+"/admin/v1/extend_user/import"
var extend_user_download_url = global_server_url+"/admin/v1/extend_user/download"
//==============================结算
var extend_brokerage_balance_for_page_url = global_server_url+"/admin/v1/extend_manager/brokerage_balance/search_for_page"
var extend_brokerage_balance_audit_url = global_server_url+"/admin/v1/extend_manager/brokerage_balance/audit"
var extend_brokerage_balance_detail_url = global_server_url+"/admin/v1/extend_manager/brokerage_balance/detail"
var extend_brokerage_balance_batch_audit_url = global_server_url+"/admin/v1/extend_manager/brokerage_balance/batch_update_order"
// ============================================资源管理
var resources_search_for_page_url = global_server_url+"/admin/v1/resources/app/search_for_page"
var resources_add_url = global_server_url+"/admin/v1/resources/app/add"
//保障金
var account_search_bond_for_page_url = global_server_url+"/admin/v1/cash/account/search_bond_for_page"
var account_bond_audit_url = global_server_url+"/admin/v1/cash/account/audit"
/*******************************统计分析*************************************/
var order_statistics_query = global_server_url+"/admin/v1/order_statistics/query_statistics";
var query_statistics_by_category = global_server_url+"/admin/v1/order_statistics/query_statistics_by_category";

/**********************************售后*************************************/
var after_feedback_query_for_page = global_server_url+"/admin/v1/after/feedback/search_feedback_for_page";
//===================资源服务器
var resource_server = "http://39.106.51.236:9091/"


