const config={

}
config.userAbilitySearch = {
    nickname: {
        tagName: "用户昵称",
        value: ""
    },
    phone: {
        tagName: "手机号",
        value: ""
    },
    ability01:{
        tagName:"权限类别",
        value:"null",
        tag:{   
            op1: {
                num: "null",
                value: "全部"
            },
            op2: {
                num: "1",
                value: "已有创建IP红包权限"
            },
            op3: {
                num: "0",
                value: "暂无创建IP红包权限"
            }
        }
    }
}
export default config