import Cookies from 'js-cookie';
import util from '@/libs/util.js';

export const serviceUrl = util.getConfig.imgUrl;

export const serviceResult = {
    address: '',
    businessStatus: 0,
    categoryIds: [],
    categoryName: '',
    categoryParentId: 0,
    createTime: 0,
    auditTime: 0,
    deposit: 0,
    desc: '',
    mediaList: [],
    modeType: [1,2],
    modeTypeData: '',
    nickname: '',
    periodTypes: [],
    phone: '',
    positionType: 0,
    price: 0,
    priceType: 0,
    realname: '',
    restrictions: '',
    score: 0,
    status: 0,
    title: '',
    userId: 0,
    userLat: 0,
    userLon: 0,
    user:{
        meteorScore: 0,
        tags: []

    }
};

export const serviceData = function(id){

    return new Promise((resolve, reject) => {
        let url = util.getConfigUri.serviceDetail+"?serviceId="+id;
        util.ajax.get(url,
            {
                headers: {
                    'token': Cookies.get('token')
                }
            }).then(response => {
            if (response.data.success) {
                resolve(response.data.data);
            }
        })
    });
}

export const categoryList = function(){
    return new Promise((resolve, reject) => {
        let url = util.getConfigUri.categoryList;
        util.ajax.get(url,
            {
                headers: {
                    'token': Cookies.get('token')
                }
            }).then(response => {
            if (response.data.success) {
                resolve(response.data.data);
            }
        })
    });
}

const serviceObject = {
    serviceResult:  serviceResult,
    serviceData:    serviceData,
    serviceUrl:     serviceUrl,
    categoryList:   categoryList
}



export default serviceObject;