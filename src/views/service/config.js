const config={}
config.serviceSearch = {
    phone: {
        tagName: "手机号",
        value: ""
      },
      title: {
        tagName: "服务标题",
        value: ""
      },

      realname: {
        tagName: "真实姓名",
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
      nickname: {
        tagName: "昵称",
        value: ""
      }
}

export default config