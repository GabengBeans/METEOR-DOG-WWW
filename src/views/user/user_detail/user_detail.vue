<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee">
      <Card :bordered="false">
        <Avatar class="avatar" :src="aliyun + user_data.avatarUrl" shape="square"/>
        <Tag class="tag-style" color="blue" v-for="item in user_data.selfAuthInfos" :key="item.key">{{item}}</Tag>

        <div class="user_detail_div">
          <label class="from_label">手机号</label>
          <b>{{user_data.phone}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">真实姓名</label>
          <b>{{user_data.realname}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">性别</label>
          <b>{{user_data.sex}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">昵称</label>
          <b>{{user_data.nickname}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">流星值</label>
          <b>{{user_data.meteorScore}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">余额</label>
          <b>{{user_data.account.amount}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">住址</label>
          <b>{{user_data.address}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">推荐人ID</label>
          <b>{{user_data.inviterId}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">个人标签</label>
          <Tag color="blue" v-for="item in user_data.listTags" :key="item.key">{{item.lableName}}</Tag>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">认证证书</label>
          <b>{{user_data.resumes[3].content}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">职业经历</label>
          <b>{{user_data.resumes[0].content}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">教育背景</label>
          <b>{{user_data.resumes[2].content}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">项目经验</label>
          <b>{{user_data.resumes[1].content}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">相关图片</label>
          <!-- <Avatar v-for="item in user_data.certificates[0].imageUrls" :src="aliyun + item" :key="item.key" shape="square"  style="width:8vw;height:8vw;margin-bottom:4px" /> -->
          <UserEditImgList :change="true" :imgList="user_data.certificates[0].imageUrls"></UserEditImgList>
        </div>
        <br>
        <!-- <div class="user_detail_div">
                <label class="from_label">相关视频</label>
  
                  </div>
                  <br> -->
        <div class="user_detail_div">
          <label class="from_label">持卡人</label>
          <b>{{user_data.accountHolder}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">开户行</label>
          <b>{{user_data.openingBank}}</b>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">银行卡</label>
          <b>{{user_data.accountNo}}</b>
        </div>
        <br>
        <div>
          <Tabs value="name1">
            <TabPane label="邀请用户" name="name1">
              <Table border stripe :columns="invite_user_columns" :data="inviter_arr"></Table>
            </TabPane>
            <TabPane label="关注用户" name="name2">
              <Table border stripe :columns=" attention_user_columns" :data="attention_arr"></Table>
            </TabPane>
          </Tabs>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Util from "@/libs/util";
import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
import axios from "axios";
import $ from "jquery";
import BMapComponent from "../../public-components/BMapComponent";
import UserEditImgList from "../../public-components/user_edit_img_list";
export default {
  data() {
    return {
      aliyun: baseUri.oss_url,
      arr: [],
      show: false,
      tags: "",
      user_data: {},
      attention_arr: [],
      inviter_arr: [],
      invite_user_columns: [
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "姓名",
          key: "realname"
        },
        {
          title: "注册时间",
          key: "createTime"
        }
      ],
      attention_user_columns: [
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "关注时间",
          key: "createTime"
        }
      ]
    };
  },
  components: {
    UserEditImgList
  },

  created() {
    this.$Message.loading({
      content: "读取中...",
      duration: 0
    });
    let This = this;
    function getUserInfo() {
      return Util.ajax.get(baseUri.user_detail_url, {
        params: {
          userId: This.$route.params.id
        }
      });
    }
    function getAttentionUser() {
      //console.log(user_search_attention_users_for_page_url)
      return Util.ajax.get(baseUri.user_search_attention_users_for_page_url, {
        params: {
          userId: This.$route.params.id,
          pageNo: 1,
          pageSize: 10
        }
      });
    }
    function getInviterUsers() {
      return Util.ajax.post(baseUri.user_search_for_page_url, {
        data: {
          inviterId: This.$route.params.id
        }
      });
    }
    axios.all([getUserInfo(), getAttentionUser(), getInviterUsers()]).then(
      axios.spread((response, response1, response2) => {
        //console.log(response);
        //console.log(Cookies.get("token"));
        let src_obj = response.data.data;
        let new_obj = {};
        let inviter_arr = [];
        let attention_arr = [];
        for (let x in src_obj) {
          new_obj[x] = src_obj[x];
          if (x == "meteorScore") {
            new_obj[x] = (parseInt(src_obj[x]) / 10).toFixed(1) + "分";
          } else if (x == "account") {
            //console.log(src_obj.account.amount)
            new_obj[x].amount =
              (parseInt(src_obj[x].amount) / 100).toFixed(2) + "元";
          } else if (x == "resumes") {
            new_obj.resumes = [{}, {}, {}, {}];
            for (let i = 0; i < 4; i++) {
              if (src_obj.resumes[i]) {
                new_obj.resumes[i].content = src_obj.resumes[i].content;
              } else {
                new_obj.resumes[i].content = "";
              }
            }
          } else if (x == "certificates") {
            //console.log(src_obj.certificates[0].imageUrls)
            if (
              src_obj.certificates[0] &&
              src_obj.certificates[0].imageUrls.length > 2
            ) {
              //console.log(src_obj.certificates[0].imageUrls.replace(/[\[*\]]/g,'').split(','))
              //console.log(src_obj[x])
              new_obj.certificates[0].imageUrls = src_obj.certificates[0].imageUrls
                .replace(/[\["*"\]]/g, "")
                .split(",");
            } else {
              new_obj.certificates = [{}];
              new_obj.certificates[0].imageUrls = [];
            }
          } else if (x == "sex") {
            new_obj[x] = src_obj[x] == 1 ? "男" : "女";
            if (src_obj[x] == 3) {
              new_obj[x] = "不详";
            }
          } else {
            new_obj[x] = src_obj[x];
          }
        }
        attention_arr = response1.data.data.items;
        inviter_arr = response2.data.data.items;
        for (let j in inviter_arr) {
          inviter_arr[j].createTime = Util.formatDate(
            new Date(inviter_arr[j].createTime),
            "yyyy-MM-dd hh:mm:ss"
          );
        }
        for (let i in attention_arr) {
          attention_arr[i].createTime = Util.formatDate(
            new Date(attention_arr[i].createTime),
            "yyyy-MM-dd hh:mm:ss"
          );
        }
        // next(vm =>{
        //   vm.show = true
        //   vm.user_data = new_obj
        //   vm.attention_arr = attention_arr
        //   vm.inviter_arr = inviter_arr
        // })
        //console.log(new_obj.listTags)
        //console.log(new_obj);
        this.user_data = new_obj;
        this.attention_arr = attention_arr;
        this.inviter_arr = inviter_arr;
        this.show = true;
        this.$Message.destroy();
      })
    );
    //   .catch(error => {
    //     this.$Message.error(error);
    //   });
  }
};
</script>
<style>
 @import "../../../styles/public.less";
</style>

