<template>
  <div v-if="show">
    <div id="user_edit" style="background:#eee">
      <Card :bordered="false">
        <Upload style="display:inline-block;" :before-upload="handleBeforeUpload" :show-upload-list="false" :on-success="handleSuccess" :data="{
                    'type':'user'
                  }" :action="imgUrl">
          <p class="tip" style="margin-left:20px;">点击图片更换头像</p>
          <Avatar :src="aliyun + user_data.avatarUrl" shape="square" class="avatar" />
        </Upload>
        <div style="display:inline-block;">
          <Tag color="blue" v-for="item in user_data.selfAuthInfos" :key="item.key" class="tag-style">{{item}}</Tag>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">手机号</label>
          <span  style="width: 15vw;min-width:100px;" >{{user_data.phone}}</span>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">真实姓名</label>
          <Input clearable style="width: 15vw;min-width:100px;" v-model='user_data.realname' />
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">设置角色</label>
          <Select v-model="user_data.isExpandPeople" style="width:15vw; min-width:100px;" @on-change="changeRoleInfo(user_data.isExpandPeople)">
            <Option :value="0">普通用户</Option>
            <Option :value="1">代理人</Option>
          </Select>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">性别</label>
          <Select v-model="user_data.sex" style="width:15vw; min-width:100px;">
            <Option :value="1">男</Option>
            <Option :value="2">女</Option>
            <Option :value="3">不详</Option>
          </Select>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">昵称</label>
          <Input clearable style="width: 15vw;min-width:100px;" v-model='user_data.nickname' />
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">流星值</label>
          <span>{{user_data.meteorScore}}</span>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">余额</label>
          <span>{{user_data.account.amount}}</span>
        </div>
        <br>
        <div class="user_detail_div">
          <label class="from_label">住址</label>
          <AutoComplete clearable :value="user_data.address" @input="serach_place" style="width: 15vw;min-width:100px;">
            <Option v-for="item in arr" :value="item" :key="item.key"></Option>
          </AutoComplete>
        </div>
        <br>
        <div>
          <BMapComponent style="width:95%;margin:0 auto;" :lat="user_data.addressLat" :lon="user_data.addressLon" :keyword="user_data.address"></BMapComponent>
        </div>
        <br>
        
          <div class="user_detail_div">
            <label class="from_label">推荐人ID</label>
            <span>{{user_data.inviterId}}</span>
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">个人标签</label>
            <Input style="width: 5vw;min-width:100px;margin-right:1vw" v-model='tags' />
            <Tag closable @on-close="handleClose" color="blue" v-for="item in user_data.tags" :key="item.key" :name="item" class="tag-style">{{item}}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">个人简介</label>
            <Input v-model="user_data.resumes[3].content" type="textarea" style="width: 40vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">职业经历</label>
            <Input v-model="user_data.resumes[0].content" type="textarea" style="width: 40vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">教育背景</label>
            <Input v-model="user_data.resumes[2].content" type="textarea" style="width: 40vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">项目经验</label>
            <Input v-model="user_data.resumes[1].content" type="textarea" style="width: 40vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </div>
          <br>
          <div class="user_detail_div">
            <label class="from_label">认证证书</label>
            <Input v-model="user_data.certificates[0].content" type="textarea" style="width: 40vw;min-width:100px;" :autosize="{minRows: 2,maxRows: 5}" />
          </div>
          <br>

        <label class="from_label">上传图片</label>图片不能大于2M
        <UserEditImgList class="image-style" :change="true" :imgList="user_data.certificates[0].imageUrls" :upload="true"></UserEditImgList>
        <div style="text-align:center;">
          <Button class="btn-group" type="success" @click.native="saveInfo">保存修改</Button>
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
import util from "@/libs/util";
////import Cookies from "js-cookie";
import baseUri from "@/libs/base_uri";
//import $ from "jquery";
import BMapComponent from "../../public-components/BMapComponent";
import UserEditImgList from "@/views/public-components/upload_img";
export default {
  data() {
    return {
      imgUrl:baseUri.img_upload_url,
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
      if (this.user_data.tags.length >= 3) {
        this.$Message.error("最多添加3组标签");
      } else {
        if (this.tags == "") {
          this.$Message.error("请输入标签内容");
        } else {
          this.user_data.tags.push(this.tags);
          this.tags = "";
          console.log(this.user_data.tags);
        }
      }
    },
    handleClose: function(event, name) {
      //删除个人标签
      for (let i = 0; i < this.user_data.tags.length; i++) {
        if (this.user_data.tags[i]== name) {
          this.user_data.tags.splice(i, 1);
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
      if (this.user_data.certificates[0].imageUrls.length > 8) {
        this.$Notice.warning({
          title: "最多上传8张图片"
        });
        return;
      }
      this.$Message.loading({
        content: "保存中...",
        duration: 0
      });
      let imgList = [];
      for (
        let x = 0;
        x < this.user_data.certificates[0].imageUrls.length;
        x++
      ) {
        imgList.push(this.user_data.certificates[0].imageUrls[x]);
      }
      this.user_data.listTags = []
      for(let i in this.user_data.tags)
      {
        this.user_data.listTags.push({lableName:this.user_data.tags[i],id:-1})
      }
      console.log(this.user_data.listTags)
      util.ajax({
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
          address: this.user_data.address,
          addressLat: this.user_data.addressLat,
          addressLon: this.user_data.addressLon,
          tagList: this.user_data.listTags,
          certificate: imgList,
          certificateContent: this.user_data.certificates[0].content,
          resumeList: this.resumeList
        }
      })
        .then(res => {
          if (res.data.success) {
            this.$Message.destroy();
            this.$Message.success("保存成功");
          } else {
            this.$Message.destroy();
            this.$Message.success("保存失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeRoleInfo(value){
      util.ajax({
        method:'post',
        url:baseUri.convert_expand_type,
        params:{
          expandId:this.user_data.expandId
        }
      }).then(resp=>{
        if(resp.status==200 && resp.data.success)
        {
          this.$Message.success("修改成功")
        }else{
          this.$Message.error("修改失败")
        }
      }).catch(error=>{
        console.log(error)
      })
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
      return util.ajax({
        method: "get",
        url: baseUri.user_detail_url,
        params: {
          userId: This.$route.params.id
        }
      });
    }
    function getAttentionUser() {
      //console.log(user_search_attention_users_for_page_url)
      return util.ajax({
        method: "get",
        url: baseUri.user_search_attention_users_for_page_url,
        params: {
          userId: This.$route.params.id,
          pageNo: 1,
          pageSize: 10
        }
      });
    }
    function getInviterUsers() {
      return util.ajax({
        method: "post",
        url: baseUri.user_search_for_page_url,
        data: {
          inviterId: This.$route.params.id
        }
      });
    }
    axios.all([getUserInfo(), getAttentionUser(), getInviterUsers()]).then(
      axios.spread((response, response1, response2) => {
        //console.log(response)
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
            if (
              src_obj.certificates[0] &&
              src_obj.certificates[0].imageUrls.length > 2
            ) {
              new_obj.certificates[0].imageUrls = src_obj.certificates[0].imageUrls
                .replace(/[\["*"\]]/g, "")
                .split(",");
            } else {
              new_obj.certificates = [{}];
              new_obj.certificates[0].imageUrls = [];
            }
          }else {
            new_obj[x] = src_obj[x];
          }
        }
        attention_arr = response1.data.data.items;
        inviter_arr = response2.data.data.items;
        for (let j in inviter_arr) {
          inviter_arr[j].createTime = util.formatDate(
            new Date(inviter_arr[j].createTime),
            "yyyy-MM-dd hh:mm:ss"
          );
        }
        for (let i in attention_arr) {
          attention_arr[i].createTime = util.formatDate(
            new Date(attention_arr[i].createTime),
            "yyyy-MM-dd hh:mm:ss"
          );
        }
        //console.log(new_obj.listTags)
        this.user_data = new_obj;
        this.attention_arr = attention_arr;
        this.inviter_arr = inviter_arr;
        this.show = true;
        this.$Message.destroy();
      })
    ).catch(error => {
        this.$Message.error(error);
      });
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>

