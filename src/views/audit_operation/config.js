import { router } from '../../router/index';

const config = {}
config.auditOPerationTableColumns = [{
        title: "ID",
        key: "bussinessId"
    },
    {
        title: "类型",
        key: "bussinessTypeValue"
    },
    {
        title: "用户手机号",
        key: "bussinessUserPhone"
    },
    {
        title: "提交时间",
        key: "bussinessTime"
    },
    {
        title: "审核时间",
        key: "opertateTime"
    },
    {
        title: "审核人",
        key: "operaterName"
    },
    {
        title: "审核结果",
        key: "operateValue"
    },
    {
        title: "当前状态",
        key: "bussinessStatusValue"
    },

]
config.searchAuditUser = {
    beginTime: {
        tagName: "开始日期",
        value: "",
        data: "1"
    },
    endTime: {
        tagName: "截止日期",
        value: "",
        data: "1"
    }
}
config.searchAuditOrder = {
    beginTime: {
        tagName: "开始日期",
        value: "",
        data: "1"
    },
    endTime: {
        tagName: "截止日期",
        value: "",
        data: "1"
    }
}
config.searchAuditService = {
    beginTime: {
        tagName: "开始日期",
        value: "",
        data: "1"
    },
    endTime: {
        tagName: "截止日期",
        value: "",
        data: "1"
    }
}
config.searchAuditDemand = {
    beginTime: {
        tagName: "开始日期",
        value: "",
        data: "1"
    },
    endTime: {
        tagName: "截止日期",
        value: "",
        data: "1"
    }
}

config.auditUserTableColumns = [
    {
        title: "日期",
        key: "dateday",
    },
    {
        title: "新增用户",
        key: "unums",
    },
    {
        title: "注册用户总数",
        key: "tunums",
    },
    {
        title: "活跃用户数",
        key: "aunums",
    },
    {
        title: "活跃度/次",
        key: "anums",
    },
    {
        title: "累计活跃度/次",
        key: "tanums",
    },
    {
        title: "操作",
        key: "phone",
        width: 300,
        align: "center",
        render: (h, params) => {
            return h("div", [
                h(
                    "Button", {
                        props: {
                            type: "info",
                            size: "small",
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                router.push({
                                    name:"audit_user_detail",
                                    query:{date:params.row.dateday}
                                })
                            }
                        }
                    },
                    "渠道详情"
                ),
            ]);
        }
    }
]
config.auditServiceTableColumns = [
    {
        title: "日期",
        key: "dateday",
    },
    {
        title: "提交服务总数",
        key: "snums",
    },
    {
        title: "通过服务数",
        key: "sanums",
    },
    {
        title: "未通过服务数",
        key: "sdnums",
    },
    {
        title: "操作",
        key: "phone",
        width: 300,
        align: "center",
        render: (h, params) => {
            return h("div", [
                h(
                    "Button", {
                        props: {
                            type: "info",
                            size: "small",
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                router.push({
                                    name:"audit_service_detail",
                                    query:{date:params.row.dateday}
                                })
                            }
                        }
                    },
                    "渠道详情"
                ),
            ]);
        }
    }
]
config.auditDemandTableColumns = [
    {
        title: "日期",
        key: "dateday",
    },
    {
        title: "提交需求总数",
        key: "dnums",
    },
    {
        title: "通过需求数",
        key: "danums",
    },
    {
        title: "未通过需求数",
        key: "sdnums",
    },
    {
        title: "操作",
        key: "phone",
        width: 300,
        align: "center",
        render: (h, params) => {
            return h("div", [
                h(
                    "Button", {
                        props: {
                            type: "info",
                            size: "small",
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                router.push({
                                    name:"audit_demand_detail",
                                    query:{date:params.row.dateday}
                                })
                            }
                        }
                    },
                    "渠道详情"
                ),
            ]);
        }
    }
]
config.auditOrderTableColumns = [
    {
        title: "日期",
        key: "dateday",
    },
    {
        title: "服务订单数",
        key: "sonums",
    },
    {
        title: "需求订单数",
        key: "donums",
    },
    {
        title: "赞赏订单数",
        key: "ronums",
    },
    {
        title: "服务订单总支付金额",
        key: "sopay",
    },
    {
        title: "需求订单总支付金额",
        key: "dopay",
    },
    {
        title: "赞赏订单总支付金额",
        key: "ropay",
    },
]
config.auditUserDetailTableColumns = [
    {
        title:"平台",
        key:"description"
    },
    {
        title:"新增用户数",
        key:"unums"
    },
    {
        title:"注册用户总数",
        key:"tunums"
    },
    {
        title:"活跃度/次",
        key:"anums"
    },
    {
        title:"累计活跃度/次",
        key:"tanums"
    }
]
config.auditServiceDetailTableColumns = [
    {
        title:"平台",
        key:"description"
    },
    {
        title:"提交服务数",
        key:"snums"
    },
    {
        title:"通过服务数",
        key:"sanums"
    },
    {
        title:"未通过服务数",
        key:"sdnums"
    }
]
config.auditDemandDetailTableColumns = [
    {
        title:"平台",
        key:"description"
    },
    {
        title:"提交需求数",
        key:"dnums"
    },
    {
        title:"通过需求数",
        key:"danums"
    },
    {
        title:"未通过需求数",
        key:"ddnums"
    }
]

export default config