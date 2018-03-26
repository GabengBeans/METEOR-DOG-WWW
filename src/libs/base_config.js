let base_config = {
    //开发服务器地址
    devUrl: 'http://39.106.51.236:8822',
    //测试服务器地址
    testUrl: 'http://39.106.51.236:8822',
    //生产服务器地址
    //proUrl: 'http://39.106.51.236:8822',
    proUrl:'http://47.94.12.50:8824',
    //阿里图片服务器地址
    imgUrl: 'http://dedc-statics.oss-cn-beijing.aliyuncs.com',
    //百度地图地址
    BMapUrl: 'http://api.map.baidu.com/api?v=2.0&ak=sKkVhwaa0xKdBYPtGzAALEY5FEDL01g2&callback=onBMapCallback',

    //ajax超时时间
    ajaxOutTime: 30000,

    pageNo:     1,      //默认页数
    pageSize:   10     //每页显示最大条数

};

export default base_config;