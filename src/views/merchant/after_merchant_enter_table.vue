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
import Util from "@/libs/util";
import base_uri from "@/libs/base_uri";
export default {
  props: ["data"],
  data() {
    return {
      businessInfoId: "",
      btnStatus: true,
      ruleResult: false,
      showPhonePage: false,
      regPhone: "",
      columns: [
        {
          title: "公司名称",
          key: "companyName",
          ellipsis: "false"
        },
        {
          title: "联系人",
          key: "contact",
          ellipsis: "false"
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
                      this.businessInfoId = params.row.id;
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
      if (Util.isPoneAvailable(this.regPhone)) {
        Util.ajax({
          method: "post",
          url: base_uri.consent_business_enter_url,
          params: {
            businessInfoId: this.businessInfoId,
            phoneNo: this.regPhone
          }
        })
          .then(res => {
            if (res.data.success) {
              this.$Message.success("入驻成功!");
              this.showPhonePage = false;
              this.businessInfoId = "";
              this.$store.commit("GET_MERCHANT_ENTER_INFO", {
                data: this.$store.state.app.merchant_enter_search_info,
                pageNo: this.$store.state.app.merchant_enter_public_page
              });
            } else {
              this.$Message.error("手机号已注册!");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    ruleFun() {
      if (Util.isPoneAvailable(this.regPhone)) {
        this.ruleResult = false;
        this.btnStatus = false;
      } else {
        this.ruleResult = true;
        this.btnStatus = true;
      }
    },
    addNewMerchant() {
      this.$router.push("/after-merchant-enter-addnew/");
    }
  }
};

</script>
