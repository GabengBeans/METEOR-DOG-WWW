const config = {}

config.budgetDetailSearch = {
    userId: {
        tagName: "用户ID",
        value: ""
    },
    incomeExpenditure: {
        tagName: "类型",
        value: "0",
        tag: {
            op0: {
                num: "0",
                value: "全部"
            },
            op1: {
                num: "1",
                value: "支出"
            },
            op2: {
                num: "2",
                value: "收入"
            }
        }
    }
}

config.budgetDetailTableColumns = [{
        title: "用户ID",
        key: "userId",
        width:160,
        align:"center"
    },
    {
        title: "IP昵称",
        key: "nickname",
        width:160,
        align:"center"
    },
    {
        title: "时间",
        key: "createTime",
        width:180,
        align:"center"
    },
    {
        title: "类型",
        key: "type",
        width:90,
        align:"center"
    },
    {
        title: "详情",
        render: (h, params) => {
            return h("div",{style:{
                height:"60px",
                boxSizing:"border-box",
                padding:"15px 0 15px 30px",
                textAlign:"left"
            }},[
                h("p", params.row.userRuleype),
                h("p", params.row.detailContent)
            ]);
        },
        align:"center"
    },
    {
        title: "流星钻数(克拉)",
        width:160,
        render:(h,params)=>{
            return h("div",[
                h("span",{style:{color:params.row.isIncoming==1?"red":"green",fontWeight:"1000"}},params.row.isIncoming==1?"- ":"+ "),
                h("span",params.row.diamondCount)
          ])
        },
        align:"center"
    },
]

config.statisticsSearch = {
    userId:{
        tagName:"用户ID",
        value:""
    },
    meteorDiamondSort:{
        tagName:"排序",
        value:"0",
        tag:{
            op0:{
                num:"0",
                value:"全部"
            },
            op1:{
                num:"1",
                value:"按累计流星钻从高到低"
            },
            op2:{
                num:"2",
                value:"按累计流星钻从低到高"
            }
        }
    }
}

config.searchConfig={
    userId:{
        tagName:"用户ID",
        value:""
    },
    nickname:{
        tagName:"用户昵称",
        value:""
    },
    businessStatus:{
        tagName:"发货状态",
        value:"-1",
        tag:{
            op1:{
                num:'-1',
                value:"全部"
            },
            op2:{
                num:"1",
                value:"未发货"
            },
            op3:{
                num:"2",
                value:"已发货"
            }
        }
    }
}

export default config