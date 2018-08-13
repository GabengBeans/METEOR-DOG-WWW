const config = {}

config.requestSearch = {
  id: {
    tagName: "需求id",
    value: ""
  },
    phone: {
        tagName: "手机号",
        value: ""
      },
      title: {
        tagName: "需求标题",
        value: ""
      },

      realname: {
        tagName: "真实姓名",
        value: ""
      },
      nickname: {
        tagName: "昵称",
        value: ""
      },
      businessStatus: {
        tagName: "审核状态",
        value: "0",
        tag: {
          op1: {
            num: "0",
            value: "全部"
          },
          op2: {
            num: "1",
            value: "编辑中"
          },
          op3: {
            num: "2",
            value: "审核中"
          },
          op4: {
            num: "3",
            value: "已发布"
          },
          op5: {
            num: "4",
            value: "已过期"
          },
          op6: {
            num: "5",
            value: "审核未通过"
          },
          op7: {
            num: "6",
            value: "取消发布"
          },
          op8: {
            num: "7",
            value: "已下架"
          },
          op9: {
            num: "8",
            value: "已删除"
          }
        }
      },
      status: {
        tagName: "有效状态",
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
      beginCreateTime: {
        tagName: "发布日期",
        value: "",
        data: "1"
      },
      endCreateTime: {
        tagName: "截止日期",
        value: "",
        data: "1"
      },
      desc: {
        tagName: "需求介绍",
        value: "",
        desc:"1"
      }
}

export default config