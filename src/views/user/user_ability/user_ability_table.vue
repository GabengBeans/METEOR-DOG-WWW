<template>
    <div id='user_table' class="table">
        <Table style="min-width:800px;margin:0 16px;" border stripe :columns="columns" :data="data">
        </Table>
        <Modal v-model="showAbilityModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>权限管理</span>
            </p>
            <div style="height:30vh">
                <CheckboxGroup v-model="userAbilityArr">
                    <Checkbox label="ability01">
                        <span>IP红包权限</span>
                    </Checkbox>
                    <Checkbox label="ability02">
                        <span>动态审核权限</span>
                    </Checkbox>
                </CheckboxGroup>
            </div>
            <div slot="footer">
                <Button type="error" @click="showAbilityModal=false">取消</Button>
                <Button type="success" @click="saveAbility">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  name: "user_table",
  props: ["data"],
  data() {
    return {
      IP_ABILITY_CODE: 1,
      showAbilityModal: false,
      userAbilityArr: [],
      userId: "",
      columns: [
        {
          title: "用户昵称",
          key: "nickname",
          ellipsis: "false",
           width: 150,
        },
        {
          title: "手机号",
          key: "phone",
           width: 150,
        },
        {
          title: "拥有权限",
          key: "showStr"
        },
        {
          title: "操作",
          key: "phone",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.userAbilityArr = []
                      Util.ajax({
                        methods: "post",
                        url: baseUri.get_user_ability_byid,
                        params: {
                          userId: params.row.userId
                        }
                      }).then(res => {
                        if (res.data.success && res.data.code == "100") {
                          let obj = res.data.data;
                          for (let x in obj) {
                            if (x.indexOf("ability") != -1 && obj[x] == "1") {
                              this.userAbilityArr.push(x);
                            }
                          }
                        }
                        console.log(this.userAbilityArr)
                        this.userId = params.row.userId;
                        this.showAbilityModal = true;
                      });
                    }
                  }
                },
                "权限管理"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    saveAbility() {
      let abilityValue = 0;
      for (let x = 0; x < this.userAbilityArr.length; x++) {
        if (this.userAbilityArr[x] == "ability01") {
          abilityValue = 1;
        }
      }
      Util.ajax({
        method: "post",
        url: baseUri.update_user_ability_url,
        params: {
          userId: this.userId,
          abilityCode: this.IP_ABILITY_CODE,
          abilityValue: abilityValue
        }
      }).then(res => {
        if (res.data.success && res.data.code == "100") {
          this.$Message.success("授权成功");

          this.$store.commit("GET_USER_ABILITY_LIST", {
            data: this.$store.state.app.user_ability_search_info,
            pageNo: this.$store.state.app.user_ability_public_page
          });
          this.showAbilityModal = false;
        }else{
            this.showAbilityModal = false;
            this.$Message.error("授权失败")
        }
      }).catch(err=>{
          console.log(err)
      })
    }
  }
};
</script>
