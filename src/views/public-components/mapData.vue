<template>
    <div id="all">

        <Input  type="text" element-id="suggestId" class="input_style" :is-show="isShow" v-show="isShow" @change="inputChange()" v-model="address"></Input><br/><br/>

        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>


        <div id="allmap" :style="mapStyle"></div>



    </div>
</template>
<script>
    import util from '@/libs/util.js';
    export default {
        name: 'b-map-component',
        data:function(){
            return{
                mapStyle:{
                    width:'70%',
                    height:this.mapHeight +'px'
                },
                address: '',

            }
        },
        props:{
            // 地图在该视图上的高度
            mapHeight:{
                type:Number,
                default:500
            },
            // 经度
            longitude:{
                type:Number,
                default:116.404
            },
            // 纬度
            latitude:{
                type:Number,
                default:39.915
            },
            isShow:{
                type: Boolean,
                default: false
            }

        },
        created: function(){
            this.init().then(BMap => {
                window.globalMap = BMap;
                this.createMap(BMap);
            });

        },
        methods:{
            init: function (){
                const BMap_URL  = util.getConfig.BMapUrl;
                return new Promise((resolve, reject) => {
                    // 如果已加载直接返回
                    if(typeof BMap !== "undefined") {
                        resolve(BMap);
                        return true;
                    }
                    // 百度地图异步加载回调处理
                    window.onBMapCallback = function () {
                        console.log("百度地图脚本初始化成功...");
                        resolve(BMap);
                    };

                    // 插入script脚本
                    let scriptNode = document.createElement("script");
                    scriptNode.setAttribute("type", "text/javascript");
                    scriptNode.setAttribute("src", BMap_URL+"&m="+Math.random());
                    document.body.appendChild(scriptNode);
                });
            },
            createMap: function(BMap){
                var map     = new BMap.Map("allmap");//在百度地图容器中创建一个地图
                var point   = new BMap.Point(this.longitude,this.latitude);//定义一个中心点坐标
                var marker  = new BMap.Marker(point);
                map.addOverlay(marker);
                map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中

                window.map = map;
            },
            inputMap: function(BMap){
                var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                    {"input" : "suggestId"
                        ,"location" : window.map
                    });

                ac.setInputValue(this.address);

                var myValue;

                ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
                    var _value = e.item.value;
                    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                    this.address = myValue;
                    setPlace();
                });

                function setPlace(){
                    map.clearOverlays();    //清除地图上所有覆盖物
                    function myFun(){
                        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                        map.centerAndZoom(pp, 18);
                        map.addOverlay(new BMap.Marker(pp));    //添加标注
                    }
                    var local = new BMap.LocalSearch(window.map, { //智能搜索
                        onSearchComplete: myFun
                    });

                    local.search(myValue);
                }

                console.log(this.lon)

            },
            addMapControl: function(){
                //向地图中添加缩放控件
                var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
                map.addControl(ctrl_nav);
                //向地图中添加缩略图控件
                var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
                map.addControl(ctrl_ove);
                //向地图中添加比例尺控件
                var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
                map.addControl(ctrl_sca);
            }
        },
        watch: {
            latitude: function(data){
               if(data <= 0){ return false;}
               this.createMap(window.globalMap);
            },
            address: function(data){
                this.address = data;
                this.inputMap(window.globalMap);
            }

        }
    }
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>