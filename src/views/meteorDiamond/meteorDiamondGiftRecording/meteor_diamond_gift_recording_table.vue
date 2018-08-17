<template>
  <div id='user_table' class="table">
    <Table style="margin:0 16px;" border stripe :columns="columns" :data="$store.state.app.gift_recording_search_result">
    </Table>
    <Modal v-model="showAddModal" width="500s">
      <p slot="header" style="text-align:center">
        <span>填写发货信息</span>
      </p>
      <div>
        <Form ref="deliveryInfo" :model="deliveryInfo" :rules="ruleInline" :label-width="90">
          <FormItem label="物流公司" prop="companyName">
            <Input clearable v-model="deliveryInfo.companyName" style="min-width:200px;" />
          </FormItem>
          <FormItem label="运单编号" prop="companyNo">
            <Input clearable v-model="deliveryInfo.companyNo" style="min-width:200px;" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" @click="showAddModal = false">取消</Button>
        <Button type="success" @click="saveDeliveryInfo('deliveryInfo')">保存</Button>
      </div>
    </Modal>
  </div>

</template>
<script>
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import uploadSingleImg from "@/views/public-components/upload_single_img";
export default {
  components: {
    uploadSingleImg
  },
  data() {
    return {
      giftRecordingId:"",
      showAddModal: false,
      deliveryInfo: {
        companyName: "",
        companyNo: ""
      },
      ruleInline: {
        companyName: [
          { required: true, message: "物流公司名称不能为空", trigger: "blur" }
        ],
        companyNo: [
          { required: true, message: "编号不能为空", trigger: "blur" }
        ]
      },
      columns: [
        {
          title: "兑换时间",
          key: "createTime",
          align: "center",
          width: 160
        },
        {
          title: "用户信息",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.nickname
              ),
              h(
                "div",
                params.row.userId
              )
            ]);
          }
        },
        {
          title: "礼品名称",
          key: "exchangeGoodName",
          align: "center",
          width: 160
        },
        {
          title: "兑换数量",
          key: "exchangeCount",
          align: "center",
          width: 160
        },
        {
          title: "收件人信息",
          align: "center",
          width: 160,
           render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.addressee
              ),
              h(
                "div",
                params.row.addresseePhone
              ),
              h(
                "div",
                params.row.addresseeProvince+" "+params.row.addresseeCity+" "+params.row.addresseeCounty+" "+params.row.addresseeAddress
              )
            ]);
          }
        },
        {
          title: "实付流星钻",
          key: "payPrice",
          align: "center",
          width: 160
        },
        {
          title: "留言备注",
          key: "remark",
          align: "center",
          width: 160
        },
        {
          title: "状态",
          key: "businessStatus",
          align: "center",
          width: 160
        },
        {
          title: "发货信息",
          align: "center",
          width: 160,
           render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.logisticsCompany
              ),
              h(
                "div",
                params.row.logisticsNo
              )
            ]);
          }
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
                    type: "primary",
                    size: "small",
                    disabled:params.row.businessStatus=="已发货"?true:false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.giftRecordingId = params.row.id
                      this.showAddModal = true;
                    }
                  }
                },
                "发货"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    init() {
      this.giftAddInfo.sort = "";
      this.giftAddInfo.giftName = "";
      this.giftAddInfo.meteorDiamondAmount = "";
      this.giftAddInfo.invertory = "";
      this.giftAddInfo.desc = "";
      this.giftAddInfo.imgUrl = "";
    },
    openAddModal() {
      this.init();
      this.modalName = "新增礼品";
      this.showAddModal = true;
    },
    saveDeliveryInfo(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {
            userExchangeGoodId: this.giftRecordingId,
            logisticsCompany: this.deliveryInfo.companyName,
            logisticsNo: this.deliveryInfo.companyNo
          };
          util
            .ajax({
              method: "post",
              url: base_uri.deliver_user_exchange_good_url,
              params: params
            })
            .then(resp => {
              if (resp.data.success) {
                this.$store.commit("GET_GIFT_RECORDING_LIST", {
                  data: this.$store.state.app.gift_recording_search_info,
                  pageNo: this.$store.state.app.gift_recording_public_page
                });
                this.$Message.success("保存成功!");
                this.deliveryInfo.companyName = ""
                this.deliveryInfo.companyNo=""
                this.showAddModal = false
              }else{
                this.$Message.error(resp.data.msg)
              }
            });
        }
      });
    }
  }
};
</script>
<style>
</style>
