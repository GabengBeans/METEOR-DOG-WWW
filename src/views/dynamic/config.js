const config={}

config.dynamicSearch = {
    phone: {
        tagName: "手机号",
        value: ""
    },
    realname: {
        tagName: "真实姓名",
        value: ""
    },
    nickname: {
        tagName: "昵称",
        value: ""
    },
    businessStatus: {
        tagName: "状态",
        value: 0,
        tag:{
            op1: {
                num: 0,
                value: "全部"
            },
            op2: {
                num: 2,
                value: "已发布"
            },
            op3: {
                num: 5,
                value: "管理员已删除"
            },
            op4:{
                num:4,
                value:"用户已删除"
            }
        }
    },
    startTime:{
        tagName:"发布日期",
        data:1
    },
    endTime:{
        tagName:"截止日期",
        data:1
    }
}

export default config