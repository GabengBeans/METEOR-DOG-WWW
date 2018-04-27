const config = {}

config.ipCouponSearch = {
  createTimeStart: {
    tagName: "创建时间",
    value: "",
    data: "1"
  },
  createTimeEnd: {
    tagName: "截止时间",
    value: "",
    data: "1"
  },
  userPhone: {
    tagName: "手机号",
    value: "",
  },
  userNickname: {
    tagName: "创建者昵称",
    value: "",
  },
  couponStatusCode: {
    tagName: "红包状态",
    value: "-1",
    tag: {
      op1: {
        num: "-1",
        value: "全部"
      },
      op2: {
        num: "1",
        value: "未开始"
      },
      op3: {
        num: "2",
        value: "发放中"
      },
      op4: {
        num: "3",
        value: "商户停用"
      },
      op5: {
        num: "4",
        value: "已经过期"
      },
      op6: {
        num: "5",
        value: "已领取完"
      },
      op7: {
        num: "6",
        value: "商户删除"
      },
      op8: {
        num: "7",
        value: "平台禁用"
      },
      op9: {
        num: "8",
        value: "系统删除"
      }
    }
  }
}
config.ipCouponDetailSearch = {
  createTimeStart: {
    tagName: "创建时间",
    value: "",
    data: "1"
  },
  createTimeEnd: {
    tagName: "截止时间",
    value: "",
    data: "1"
  },
  ownerUserPhone: {
    tagName: "手机号",
    value: "",
  },
  ownerUserNickname: {
    tagName: "领取人昵称",
    value: "",
  },
  useStatus: {
    tagName: "使用状态",
    value: "-1",
    tag: {
      op1: {
        num: "-1",
        value: "全部"
      },
      op2: {
        num: "0",
        value: "没有使用"
      },
      op3: {
        num: "1",
        value: "使用中"
      },
      op4: {
        num: "2",
        value: "已经使用"
      },
      op5: {
        num: "3",
        value: "已经过期"
      }
    }
  }
}
config.ipCouponDetailColumns = [
  {
    title:"领取人昵称",
    key:"ownerUserNickname",
    ellipsis: "false"
  },
  {
    title:"领取时间",
    key:"createTime",
    ellipsis: "false"
  },
  {
    title:"手机号",
    key:"ownerUserPhone",
  },
  {
    title:"使用状态",
    key:"useStatus",
    ellipsis: "false"
  },
  {
    title:"订单号",
    key:"orderNo",
    ellipsis: "false"
  },

]
export default config