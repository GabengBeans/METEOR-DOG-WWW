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
        tagName: "审核状态",
        value: 0,
        tag:{
            op1: {
                num: 0,
                value: "全部"
            },
            op2: {
                num: 1,
                value: "待审核"
            },
            op3: {
                num: 2,
                value: "通过"
            },
            op4: {
                num: 3,
                value: "驳回"
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