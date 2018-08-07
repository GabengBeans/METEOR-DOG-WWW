const config = {}

config.lotterySetColumns = [{
        align: 'center',
        title: "奖品",
        value: "godff"
    },
    {
        align: 'center',
        title: "中奖概率",
        value: "aaaaa"
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
        value:"time",
    },
    {
        align: 'center',
        title:"用户ID",
        value:"userId",
    },
    {
        align: 'center',
        title:"用户昵称",
        value:"nickname",
    },
    {
        align: 'center',
        title:"手机号",
        value:"phone",
    },
    {
        align: 'center',
        title:"奖品名称",
        value:"time",
    }
]
export default config