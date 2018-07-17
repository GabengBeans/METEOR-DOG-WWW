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
    },
    roleId:{
        tagName:"用户角色",
        value:"-1",
        tag:{
            op0:{
                num:"-1",
                value:"全部"
            }
        }
    }
}
config.lockedRoleSearch = {
    roleName: {
        tagName: "角色名称",
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
config.icons = [
    "ios-person",
    "document-text",
    "clipboard",
    "ios-copy",
    "compose",
    "images",
    "ios-telephone",
    "cash",
    "gear-b",
    "android-chat",
    "person-stalker",
    "network",
    "locked",
    "ios-pie",
    "help-buoy",
    "search",
    "gear-b",
    "star",
    "trash-a",
    "scissors",
    "paper-airplane",
    "link",
    "upload",
    "cloud",
    "calendar",
    "pinpoint",
    "pin",
    "key",
    "unlocked",
    "map",
    "mouse",
    "soup-can",
    "coffee",
    "android-apps",
    "android-search",
    "android-cloud-outline",
    "social-yen",
    "aperture",
    "social-bitcoin"
]
export default config