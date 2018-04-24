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
        value: "发行中"
      },
      op4: {
        num: "3",
        value: "已结束"
      },
      op5: {
        num: "4",
        value: "用户禁用"
      },
      op6: {
        num: "5",
        value: "平台禁用"
      },
      op7: {
        num: "6",
        value: "已删除"
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
  couponStatusCode: {
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
    key:"useOrderId",
    ellipsis: "false"
  },

]
export default config