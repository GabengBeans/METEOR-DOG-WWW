let base_config = {
    //开发服务器接口地址
    devUrl: 'http://39.106.211.153:8890',//!!!!
    //devUrl:'http://39.106.212.226:9898',
    //devUrl:'http://192.168.100.160:9091',
    //devUrl:'http://192.168.100.139:8890',//静雨
    //devUrl:'http://192.168.100.35:8890',//李强
    //devUrl:"http://192.168.100.228:8890",//叶
    //devUrl:"http://192.168.100.160:8822",//慧
    //测试服务器接口地址
    testUrl: 'http://39.106.211.153:8890',
    //生产接口地址
    proUrl:'http://39.106.16.60:8822',
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