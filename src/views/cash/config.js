const config = {

}

config.cashFlow = {
    userName: {
        tagName: "用户名",
        value: ""
    },
    phone: {
        tagName: "手机号",
        value: ""
    },
    orderNo: {
        tagName: "订单号",
        value: ""
    },
    chargeId: {
        tagName: "支付ID",
        value: ""
    },
    chargeStatus: {
        tagName: "交易状态",
        value: "-1",
        tag: {
            op1: {
                num: "-1",
                value: "全部"
            },
            op2: {
                num: "0",
                value: "未成功"
            },
            op3: {
                num: "1",
                value: "成功"
            }
        }
    },
    startTime:{
        tagName:"交易日期",
        value:"",
        data:1
    },
    endTime:{
        tagName:"截止日期",
        value:"",
        data:1
    },
    tradeType:{
        tagName:"交易类型",
        value:"0",
        tag:{
            op1:{
                num:"0",
                value:"全部"
            },
            op2:{
                num:"1",
                value:"服务"
            },
            op3:{
                num:"2",
                value:"需求"
            },
            op4:{
                num:"3",
                value:"手续费"
            },
            op5:{
                num:"4",
                value:"提现"
            },
            op6:{
                num:"5",
                value:"退款"
            },
            op7:{
                num:"6",
                value:"佣金"
            },
            op8:{
                num:"7",
                value:"保障金"
            },
            op9:{
                num:"8",
                value:"退还保障金"
            }
        }
    }
}

export default config