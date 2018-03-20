const config = {

}
config.lockedUserSearch = {
    // id: {
    //     tagName: "用户ID",
    //     value: ""
    // },
    nickname: {
        tagName: "昵称",
        value: ""
    },
    username: {
        tagName: "账号",
        value: ""
    },
    status: {
        tagName: "状态",
        value: "-1",
        tag: {
            op1: {
                num: "-1",
                value: "全部"
            },
            op2: {
                num: "1",
                value: "有效"
            },
            op3: {
                num: "0",
                value: "无效"
            }
        }
    }
}
export default config