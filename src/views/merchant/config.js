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

config.afterMerchantEnterCloumns = [
    {
        title:"公司名称",
        key:"companyName"
    },
    {
        title:"联系人",
        key:"contact"
    },
    {
        title:"联系电话",
        key:"contactNumber"
    },
    {
        title:"办公地址",
        key:"officeAddress"
    },
    {
        title:"主营业务",
        key:"mainBusiness"
    },
    {
        title:"提交时间",
        key:"createTime"
    }
]
export default config