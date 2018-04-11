const config = {

}


config.afterMerchantEnter = {
    contact:{
        tagName:"联系人",
        value:""
    },
    contactNumber:{
        tagName:"联系电话",
        value:""
    },
    beginCreateTime:{
        tagName:"发布日期",
        value:"",
        data:1
    },
    endCreateTime:{
        tagName:"截止日期",
        value:"",
        data:1
    }
}
config.afterMerchantEnterQuerySearch={
    userId:{
        tagName:"企业ID",
        value:""
    },
    phone:{
        tagName:"手机号",
        value:""
    },
    nickName:{
        tagName:"昵称",
        value:"",
    }
}

export default config