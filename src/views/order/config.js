const config = {}

config.orderDemandSerach = {
    orderNo: {
        tagName: "订单号",
        value: ""
    },
    phone: {
        tagName: "手机号",
        value: ""
    },

    userName: {
        tagName: "昵称",
        value: ""
    },
    title: {
        tagName: "需求标题",
        value: ""
    },
    beginCreateTime: {
        tagName: "下单日期",
        value: "",
        data: "1"
    },
    endCreateTime: {
        tagName: "截止日期",
        value: "",
        data: "1"
    },
    orderStatus: {
        tagName: "订单状态",
        value: "0",
        tag: {
            op1: {
                num: "0",
                value: "全部"
            },
            op2: {
                num: "1",
                value: "待支付"
            },
            op3: {
                num: "2",
                value: "待服务"
            },
            op4: {
                num: "3",
                value: "已完成"
            },
            op5: {
                num: "4",
                value: "已取消"
            },
            op6: {
                num: "5",
                value: "申请退款"
            },
            op7: {
                num: "6",
                value: "退款成功"
            },
            op8: {
                num: "7",
                value: "退款失败"
            },
            op9: {
                num: "9",
                value: "已付款"
            },
            op10: {
                num: "8",
                value: "已过期"
            }
        }
    },
}

config.orderServiceSerach = {
    orderNo: {
        tagName: "订单号",
        value: ""
    },
    phone: {
        tagName: "手机号",
        value: ""
    },

    userName: {
        tagName: "昵称",
        value: ""
    },
    title: {
        tagName: "需求标题",
        value: ""
    },
    beginCreateTime: {
        tagName: "下单日期",
        value: "",
        data: "1"
    },
    endCreateTime: {
        tagName: "截止日期",
        value: "",
        data: "1"
    },
    orderStatus: {
        tagName: "订单状态",
        value: "0",
        tag: {
            op1: {
                num: "0",
                value: "全部"
            },
            op2: {
                num: "1",
                value: "待支付"
            },
            op3: {
                num: "2",
                value: "待服务"
            },
            op4: {
                num: "3",
                value: "已完成"
            },
            op5: {
                num: "4",
                value: "已取消"
            },
            op6: {
                num: "5",
                value: "申请退款"
            },
            op7: {
                num: "6",
                value: "退款成功"
            },
            op8: {
                num: "7",
                value: "退款失败"
            },
            op9: {
                num: "9",
                value: "已付款"
            },
            op10: {
                num: "8",
                value: "已过期"
            }
        }
    }
}

export default config