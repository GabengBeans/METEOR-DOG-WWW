<template>
<div class="BMap">
  <baidu-map :center="{lng: 116.403765, lat: 39.914850}" :zoom="15">
  <bm-view class="map"></bm-view>
   <bm-local-search :keyword="keyword" :panel="false" :autoViewport ="true"></bm-local-search>
</baidu-map>
</div>

</template>
<script>
export default {
  name: "BMap",
  data() {
    return {};
  },
  props: ["lat", "lon", "keyword"],
  methods: {
    handler({ BMap, map }) {
      //console.log(BMap, map)
      this.center.lng = this.lon || 116.404;
      this.center.lat = this.lat || 39.915;
      this.zoom = 15;
    }
  }
};
</script>
<style>
.map {
  width: 100%;
  min-height:600px;
  height: 40vh;
}
</style>
