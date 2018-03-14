<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee">
      <Card :bordered="false" style="height:85vh;overflow:auto;">
        <Upload :before-upload="handleBeforeUpload" :show-upload-list="false" :on-success="handleSuccess" :data="{
                    'type':'user'
                  }" action="https://lxg.91taogu.com/up/">
          <p>点击图片更换头像</p>
          <Avatar :src="aliyun + user_data.avatarUrl" shape="square" style="width:6vw;height:6vw" />
        </Upload>
        <br>
        <div>
          <Tag color="blue" v-for="item in user_data.selfAuthInfos" :key="item.key" style="line-height:3vh;min-width:5vw;min-height:3vh;text-align:center;">{{item}}</Tag>
        </div>
        <br>
        <Form>
          <FormItem>
            <label class="from_label">手机号</label>
            <Input clearable style="width: 15vw;min-width:100px;" v-model='user_data.phone' />
          </FormItem>
          <FormItem>
            <label class="from_label">真实姓名</label>
            <Input clearable style="width: 15vw;min-width:100px;" v-model='user_data.realname' />
          </FormItem>
          <FormItem>
            <label class="from_label">性别</label>
            <Select v-model="user_data.sex" style="width:15vw; min-width:100px;">
              <Option :value="1">男</Option>
              <Option :value="2">女</Option>
              <Option :value="3">不详</Option>
            </Select>
          </FormItem>
          <FormItem>
            <label class="from_label">昵称</label>
            <Input clearable style="width: 15vw;min-width:100px;" v-model='user_data.nickname' />
          </FormItem>
          <FormItem>
            <label class="from_label">流星值</label>
            <span>{{user_data.meteorScore}}</span>
          </FormItem>
          <FormItem>
            <label class="from_label">余额</label>
            <span>{{user_data.account.amount}}</span>
          </FormItem>
          <FormItem>
            <label class="from_label">住址</label>
            <AutoComplete clearable :value="user_data.address" @input="serach_place" style="width: 15vw;min-width:100px;">
              <Option v-for="item in arr" :value="item" :key="item.key"></Option>
            </AutoComplete>
          </FormItem>
        </Form>

        <div>
          <BMapComponent :lat="user_data.addressLat" :lon="user_data.addressLon" :keyword="user_data.address"></BMapComponent>
        </div>
        <br>
        <Form>
          <FormItem>
            <label class="from_label">推荐人ID</label>
            <span>{{user_data.inviterId}}</span>
          </FormItem>
          <FormItem>
            <label class="from_label">个人标签</label>
            <Input style="width: 5vw;min-width:100px;" v-model='tags' />
            <Tag closable @on-close="handleClose" color="blue" v-for="item in user_data.listTags" :key="item.key" :name="item.lableName" style="line-height:3vh;min-width:5vw;min-height:3vh;text-align:center;">{{item.lableName}}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
          </FormItem>
          <FormItem>
            <label class="from_label">认证证书</label>
            <Input v-model="user_data.resumes[3].content" type="textarea" style="width: 15vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </FormItem>
          <FormItem>
            <label class="from_label">职业经历</label>
            <Input v-model="user_data.resumes[0].content" type="textarea" style="width: 15vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </FormItem>
          <FormItem>
            <label class="from_label">教育背景</label>
            <Input v-model="user_data.resumes[2].content" type="textarea" style="width: 15vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </FormItem>
          <FormItem>
            <label class="from_label">项目经验</label>
            <Input v-model="user_data.resumes[1].content" type="textarea" style="width: 15vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </FormItem>
        </Form>
        <label class="from_label">上传图片</label>图片不能大于2M
        <UserEditImgList :change="true" :imgList="user_data.certificates[0].imageUrls" :upload="true"></UserEditImgList>
        <div style="text-align:center;border-top:1px solid gray;border-bottom:1px solid gray;padding:1vh">
          <Button type="success" @click.native="saveInfo">保存</Button>
        </div>
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
    BMapComponent,
    UserEditImgList
  },
  methods: {
    serach_place: function(event) {
      //搜索百度地图关联地点
      this.user_data.address = event;
      //console.log(this.userInfo.address)
      $.ajax({
        type: "GET",
        url:
          "http://api.map.baidu.com/place/v2/suggestion?query=" +
          event +
          "&region=" +
          event +
          "&output=json&ak=sKkVhwaa0xKdBYPtGzAALEY5FEDL01g2",
        dataType: "jsonp",
        jsonp: "callback"
        //jsonpCallback:"show",
      }).then(result => {
        this.arr = [];
        for (let i = 0; i < result.result.length; i++) {
          this.arr.unshift(result.result[i].name);
        }
      });
    },
    handleAdd: function() {
      //添加个人标签
      if (this.user_data.listTags.length >= 3) {
        this.$Message.error("最多添加3组标签");
      } else {
        if (this.tags == "") {
          this.$Message.error("请输入标签内容");
        } else {
          this.user_data.listTags.push({ lableName: this.tags, id: "-1" });
          this.tags = "";
          console.log(this.user_data.listTags);
        }
      }
    },
    handleClose: function(event, name) {
      //删除个人标签
      for (let i = 0; i < this.user_data.listTags.length; i++) {
        if (this.user_data.listTags[i].lableName == name) {
          this.user_data.listTags.splice(i, 1);
        }
      }
    },
    handleBeforeUpload: function() {
      this.$Message.loading({
        content: "正在上传...",
        duration: 0
      });
    },
    handleSuccess: function(res, file) {
      this.$Message.destroy();
      this.user_data.avatarUrl = res.result.file.innerUrl;
    },
    saveInfo: function() {
      console.log(this.resumeList);
      this.$Message.loading({
        content: "保存中...",
        duration: 0
      });
      let data = {};
      Util.ajax({
        method: "post",
        url: baseUri.user_edit_url,
        headers: {
          token: Cookies.get("token")
        },
        params: {
          userId: this.user_data.id
        },
        data: {
          avatarUrl: this.user_data.avatarUrl,
          phone: this.user_data.phone,
          realname: this.user_data.realname,
          sex: this.user_data.sex,
          nickname: this.user_data.nickname,
          adddress: this.user_data.address,
          lat: this.user_data.addressLat,
          lon: this.user_data.addressLon,
          tagList: this.user_data.listTags,
          certificate: this.user_data.certificates[0].imageUrls,
          resumeList: this.resumeList
        }
      }).then(response => {
        this.$Message.destroy();
        this.$Message.success("保存成功");
        console.log(response.data);
      });
    }
  },
  computed: {
    resumeList: function() {
      let obj = [];
      return (obj = [
        {
          type: 1,
          content: this.user_data.resumes[0].content
        },
        {
          type: 2,
          content: this.user_data.resumes[1].content
        },
        {
          type: 3,
          content: this.user_data.resumes[2].content
        },
        {
          type: 4,
          content: this.user_data.resumes[3].content
        }
      ]);
    }
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
        //console.log(response)
        console.log(Cookies.get("token"));
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
                .replace(/[\[*\]]/g, "")
                .split(",");
              //console.log(new_obj.certificates[0].imageUrl)
              // for (
              //   let i = 0;
              //   i < new_obj.certificates[0].imageUrls.length;
              //   i++
              // ) {
              //   new_obj.certificates[0].imageUrls[i] =
              //     baseUri.oss_url+ new_obj.certificates[0].imageUrls[i];
              // }
            } else if (x == "listTags") {
            } else {
              new_obj.certificates = [{}];
              new_obj.certificates[0].imageUrls = [];
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
.from_label {
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  margin-right: 10px;
  display: inline-block;
  min-width: 75px;
  min-height: 16px;
}
</style>

