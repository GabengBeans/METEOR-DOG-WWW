<template>
    <div id='user_table' class="table">
        <Button type="success" style="margin-left:16px;" @click="addNewMerchant()">新增企业IP</Button>
        <br><br>
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="data">
        </Table>
        <Modal v-model="showPhonePage" width="300" title="输入注册手机号">
            <Input clearable :maxlength="11" v-model="regPhone" placeholder="请输入该企业IP的注册手机号" @on-change="ruleFun()" />
            <div style="margin-top:4px" v-if="ruleResult">
                <Icon type="close-circled" color="red" style="margin-right:6px"></Icon>
                <span style="color:red">请输入正确的手机号</span>
            </div>
            <div slot="footer">
                <Button :disabled="btnStatus" type="success" size="large" long @click="savaMerchantData">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      btnStatus: true,
      ruleResult: false,
      showPhonePage: false,
      regPhone: "",
      columns: [
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "联系人",
          key: "contact"
        },
        {
          title: "联系电话",
          key: "contactNumber"
        },
        {
          title: "办公地址",
          key: "officeAddress"
        },
        {
          title: "主营业务",
          key: "mainBusiness"
        },
        {
          title: "提交时间",
          key: "createTime"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.init();
                    }
                  }
                },
                "同意入驻"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    init() {
      this.btnStatus = true;
      this.ruleResult = false;
      this.showPhonePage = true;
      this.regPhone = "";
    },
    savaMerchantData() {
      if (isPoneAvailable(this.regPhone)) {
        this.showPhonePage = false;
      }
    },
    ruleFun() {
      if (isPoneAvailable(this.regPhone)) {
        this.ruleResult = false;
        this.btnStatus = false;
      } else {
        this.ruleResult = true;
        this.btnStatus = true
      }
    },
    addNewMerchant(){
    this.$router.push("/after-merchant-enter-addnew/")
    }
  }
};
function isPoneAvailable($poneInput) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test($poneInput.toString())) {
    return false;
  } else {
    return true;
  }
}
</script>
