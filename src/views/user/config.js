const config = {

}

config.userSearch = {
    id: {
        tagName: "用户ID",
        value: ""
    },
    phone: {
        tagName: "手机号",
        value: ""
    },
    nickname: {
        tagName: "昵称",
        value: ""
    },
    realname: {
        tagName: "真实姓名",
        value: ""
    },
    status: {
        tagName: "有效状态",
        value: "-1",
        tag: {
            op1: {
                num: "-1",
                value: "全部"
            },
            op2: {
                num: "1",
                value: "正常"
            },
            op3: {
                num: "0",
                value: "禁用"
            }
        }
    },
    inviterCode: {
        tagName: "邀请码",
        value: ""
    },
    createTimeStart:{
        tagName:"注册时间",
        data:1
    },
    createTimeEnd:{
        tagName:"截止时间",
        data:1
    }
}

export default  config