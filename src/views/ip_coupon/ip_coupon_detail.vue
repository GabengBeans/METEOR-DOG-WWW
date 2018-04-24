<template>
  <div>
    <CouponDetailSearch :data="searchConfig" :storeStatus="status" :searchData="$route.params.id"></CouponDetailSearch>
    <div class="couponDetailDiv">
      <Row :gutter='16'>
        <Col :xs='8' :sm='8' :md='8' :lg='8'>
        <span class="keySpan">红包名称</span>
        <span class="valueSpan">{{$store.state.app.ip_coupon_detail_query_search_result.couponInfo.title}}</span>
        </Col>
        <Col :xs='8' :sm='8' :md='8' :lg='8'>
        <span class="keySpan">创建人昵称</span>
        <span class="valueSpan">{{$store.state.app.ip_coupon_detail_query_search_result.couponInfo.userNickName
}}</span>
        </Col>
        <Col :xs='8' :sm='8' :md='8' :lg='8'>
        <span class="keySpan">红包金额</span>
        <span class="valueSpan">{{$store.state.app.ip_coupon_detail_query_search_result.couponInfo.saleDecrease}}</span>
        </Col>
      </Row>
      <br/>
      <Row :gutter='16'>
        <Col :xs='8' :sm='8' :md='8' :lg='8'>
        <span class="keySpan">使用门槛</span>
        <span class="valueSpan">{{$store.state.app.ip_coupon_detail_query_search_result.couponInfo.saleEvery}}</span>
        </Col>
        <Col :xs='8' :sm='8' :md='8' :lg='8'>
        <span class="keySpan">每人限领个数</span>
        <span class="valueSpan">{{$store.state.app.ip_coupon_detail_query_search_result.couponInfo.userLimit}}</span>
        </Col>
        <Col :xs='8' :sm='8' :md='8' :lg='8'>
        <span class="keySpan">使用有效期</span>
        <span class="valueSpan">{{$store.state.app.ip_coupon_detail_query_search_result.couponInfo.beginTime}}至{{$store.state.app.ip_coupon_detail_query_search_result.couponInfo.endTime}}</span>
        </Col>
      </Row>
    </div>
    <CouponDetailTable :columns="columns" :data="$store.state.app.ip_coupon_detail_query_search_result.items"></CouponDetailTable>
    <CouponDetailPage :storeStatus="status" :currentPage="$store.state.app.ip_coupon_query_page_info.currentPage" :totalPage="$store.state.app.ip_coupon_query_page_info.totalPage"></CouponDetailPage>
  </div>
</template>
<script>
import config from "./config";
import CouponDetailSearch from "@/views/public-components/search";
import CouponDetailTable from "@/views/public-components/table";
import CouponDetailPage from "@/views/public-components/changePage";
export default {
  data() {
    return {
      status: "ipCouponDetail",
      searchConfig: config.ipCouponDetailSearch,
      columns: config.ipCouponDetailColumns
    };
  },
  components: {
    CouponDetailSearch,
    CouponDetailTable,
    CouponDetailPage
  },
  created() {
    this.$store.state.app.ip_coupon_detail_query_search_info = {
      couponId: this.$route.params.id
    };
    this.$store.commit("GET_IP_COUPON_DETAIL_QUERY_LIST", {
      data: this.$store.state.app.ip_coupon_detail_query_search_info,
      pageNo: this.$store.state.app.ip_coupon_detail_query_public_page
    });
  }
};
</script>
<style>
@import "../../styles/public.less";
.couponDetailDiv {
  background: #ffffff;
  padding: 1vh 4vw;
}
.keySpan {
  margin-right: 10px;
}
.valueSpan {
  color: cornflowerblue;
}
</style>
