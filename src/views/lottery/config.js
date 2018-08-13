const config = {}

config.lotterySetColumns = [{
        align: 'center',
        title: "奖品",
        key: "prizesName"
    },
    {
        align: 'center',
        title: "中奖概率(%)",
        key: "myPrizesRate"
    }
]
config.winningRecordingSearch = {
    userId: {
        tagName: "用户ID",
        value: ""
    },
    nickename: {
        tagName: "用户昵称",
        value: ""
    },
    phone: {
        tagName: "手机号",
        value: ""
    },
    startTime: {
        tagName: "开始时间",
        value: "",
        data: 1
    },
    endTime: {
        tagName: "截止时间",
        vaule: "",
        data: 1
    }
}
config.winningRecordingColumns =[
    {
        align: 'center',
        title:"抽奖时间",
        key:"createTime",
    },
    {
        align: 'center',
        title:"用户ID",
        key:"userId",
    },
    {
        align: 'center',
        title:"用户昵称",
        key:"nickname",
    },
    {
        align: 'center',
        title:"手机号",
        key:"phone",
    },
    {
        align: 'center',
        title:"奖品名称",
        key:"prizesName",
    }
]
export default config