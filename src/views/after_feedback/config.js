const config = {

}

config.afterFeedBackListSearch = {
    content:{
        tagName:"内容",
        value:""
    },
    nickname:{
        tagName:"用户昵称",
        value:""
    },
    startTime:{
        tagName:"起始时间",
        value:"",
        data:1
    },
    endTime:{
        tagName:"截止时间",
        value:"",
        data:1
    },
}

config.afterFeedBackListTableColumns = [
    {
        title:"用户ID",
        key:"userId"
    },
    {
        title:"用户昵称",
        key:"nickname"
    },
    {
        title:"反馈内容",
        key:"content",
        ellipsis:"true"
    },
    {
        title:"联系方式",
        key:"phone"
    },
    {
        title:"留言日期",
        key:"createTime"
    }
]

export default config