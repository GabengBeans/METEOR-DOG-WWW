<template>
  <div>
    <br><br>
    <Row :gutter='16'>
      <Form label-position="right" :label-width="60">
        <Col :xs='13' :sm='13' :md='8' :lg='5'>
        <FormItem style="min-width:60px" label="广告位">
          <Select v-model="level">
            <Option v-for="item in tags" :key="item.key" :value="item.level">{{item.positionName}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col :xs='13' :sm='13' :md='8' :lg='5'>
        <FormItem style="min-width:60px" label="子广告位" >
          <Select v-model="id">
            <Option v-for="item in name" :key="item.key" :value="item.id">{{item.positionName}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Form>
      <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click.native='search'>搜索</Button>
      <Button :disabled="btn" style='margin-left:38px' type="success" shape="circle" @click.native='addAdverNewBtn'>添加广告</Button>
    </Row>
    <br><br>
    <TableComponent :columns="advertNewListColumns" :data="$store.state.app.advert_new_search_result"></TableComponent>
    <br>
    <Page :storeStatus="status" :currentPage="$store.state.app.advert_new_page_info.currentPage" :totalPage="$store.state.app.advert_new_page_info.totalPage"></Page>
    <Modal v-model="showAdvertEdit" width="80vw">
      <p slot="header" style="color:#f60;text-align:center">
        <span>广告编辑</span>
      </p>
      <div style="text-align:center">
        <Deatil :data="advertDetail"></Deatil>
      </div>
      <div slot="footer">
        <Button type="success" @click="saveAdverNew">保存</Button>
        <Button type="error" @click="showAdvertEdit=false">返回</Button>
      </div>
    </Modal>
    <Modal v-model="showAddAdvert" width="80vw">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加广告</span>
      </p>
      <div style="text-align:center">
        <AddAdverNew :data="addAdverNewdata"></AddAdverNew>
      </div>
      <div slot="footer">
        <Button type="success" @click="addAdverNew">保存</Button>
        <Button type="error" @click="showAddAdvert=false">返回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
import config from "../config";
import TableComponent from "@/views/public-components/table";
import Page from "@/views/public-components/changePage";
import Deatil from "./advert_new_edit";
import AddAdverNew from "./advert_new_add";
export default {
  data() {
    return {
      btn: true,
      addAdverNewdata: {
        adName:"",
        mediaType:1,
        imgUrl:""
      },
      showAdvertEdit: false,
      showAddAdvert: false,
      advertDetail: {},
      tags: [],
      level: "",
      names: [],
      id: "",
      status: "advertNewList",
      advertNewListColumns: [
        {
          title: "广告名称",
          key: "adName"
        },
        {
          title: "上传时间",
          key: "updateTime"
        },
        {
          title: "操作",
          key: "id",
          width: 300,
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
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let arr = this.$store.state.app.advert_new_search_result;
                      for (let x = 0; x < arr.length; x++) {
                        if (params.row.id == arr[x].id) {
                          this.advertDetail = arr[x];
                          this.showAdvertEdit = true;
                          //console.log(arr[x])
                        }
                      }
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let data = {
                        advertId: params.row.id
                      };
                      Util.ajax({
                        method: "post",
                        url: baseUri.new_advert_delete_advert_url,
                        data: Util.formData(data)
                      })
                        .then(res => {
                          if (res.data.data == "SUCCESS") {
                            this.$Message.success("删除成功");
                            this.$store.commit("GET_ADVERT_NEW_INFO", {
                              data: { level: this.level, positionId: this.id },
                              pageNo: 1
                            });
                          } else {
                            this.$Message.error("删除失败，请联系管理员");
                          }
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    search: function() {
      let obj = {};
      obj.level = this.level;
      obj.positionId = this.id;
      this.$store.commit("GET_ADVERT_NEW_INFO", { data: obj, pageNo: 1 });
    },
    addAdverNewBtn: function() {
      for (let x in this.addAdverNewdata) {
        if (x == "positionId"  || x== "mediaType" || x=="imgUrl") {
          
        }else{
          this.addAdverNewdata[x] = "";
        }
      }
      this.showAddAdvert = true;
    },
    addAdverNew: function() {
      //console.log(this.addAdverNewdata);
      for (let x in this.addAdverNewdata) {
        if (!this.addAdverNewdata[x]) {
          this.$Message.error("请补全信息");
          return false;
        }
      }
      let data = {
        adName: this.addAdverNewdata.adName,
        positionId: this.addAdverNewdata.positionId,
        businessId: this.addAdverNewdata.businessId,
        adType: this.addAdverNewdata.adType,
        mediaType: this.addAdverNewdata.mediaType,
        adSort: this.addAdverNewdata.adSort,
        imgUrl: this.addAdverNewdata.imgUrl
      };
      this.$Message.loading({
        content: "保存中...",
        duration: 0
      });
      Util.ajax({
        method: "post",
        url: baseUri.new_advert_add_url,
        data: Util.formData(data)
      })
        .then(res => {
          if (res.data.data == "SUCCESS") {
            this.$Message.destroy();
            this.$Message.success("保存成功");
            this.$store.commit("GET_ADVERT_NEW_INFO", {
              data: { level: this.level, positionId: this.id },
              pageNo: 1
            });
            this.showAddAdvert = false;
          } else {
            this.$Message.erros("保存失败，请联系管理员");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveAdverNew: function() {
      for (let x in this.advertDetail) {
        //console.log(this.advertDetail[x])
        if (!this.advertDetail[x]) {
          this.$Message.error("请补全信息");
          return false;
        }
      }
      let data = {
        adName: this.advertDetail.adName,
        id: this.advertDetail.id,
        businessId: this.advertDetail.businessId,
        adType: this.advertDetail.adType,
        mediaType: this.advertDetail.mediaType,
        adSort: this.advertDetail.adSort,
        imgUrl: this.advertDetail.imgUrl
      };
      this.$Message.loading({
        content: "保存中...",
        duration: 0
      });
      Util.ajax({
        method: "post",
        url: baseUri.new_advert_edit_advert_url,
        data: Util.formData(data)
      })
        .then(res => {
          if (res.data.data == "SUCCESS") {
            this.$Message.destroy();
            this.$Message.success("保存成功");
            this.$store.commit("GET_ADVERT_NEW_INFO", {
              data: { level: this.level, positionId: this.id },
              pageNo: 1
            });
            this.showAdvertEdit = false;
          } else {
            this.$Message.error("保存失败，请联系管理员");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    name: function() {
      let arr = [];
      //console.log(this.level)
      if (this.level) {
        for (let x = 0; x < this.names.length; x++) {
          if (this.level == this.names[x].level) {
            arr.push(this.names[x]);
          }
        }
        this.id = arr[0].id;
      }
       //console.log(arr)
      // if (arr.length) {
        
      // }
      //console.log(this.id)
      return arr;
    }
  },
  components: {
    TableComponent,
    Page,
    Deatil,
    AddAdverNew
  },
  created() {
    Util.ajax({
      method: "get",
      url: baseUri.new_advert_position_list_two_level_advert_position_url
    })
      .then(res => {
        //console.log(res.data.data)
        if (res.data.success) {
          let objLevel = [];
          let objName = [];
          let objNames = [];
          let arr = res.data.data;
          let subArr
          for (let x = 0; x < arr.length; x++) {
            objLevel[x] = {};
            //objLevel[x].id = arr[x].id
            objLevel[x].positionName = arr[x].positionName;
            objLevel[x].level = arr[x].level;
            subArr = arr[x];
            //console.log(subArr)
            for (let y = 0; y < subArr.subPositionResults.length; y++) {
              objName[y] = {};
              objName[y].level = subArr.subPositionResults[y].level;
              objName[y].id = subArr.subPositionResults[y].id;
              objName[y].positionName =
                subArr.subPositionResults[y].positionName;
              objNames.push(objName[y]);
            }
          }
          this.tags = objLevel;
          this.names = objNames;
          this.id = objNames[0].id;
          this.level = objLevel[0].level;
          this.btn = false;
          this.$store.commit("GET_ADVERT_NEW_INFO", {
            data: { level: this.level, positionId: this.id },
            pageNo: 1
          });
        } else {
          this.$Message.error("获取信息失败");
        }
      })
      .catch(error => {
        console.log(error);
      });
    //this.$store.state.app.advert_new_search_info =
  }
};
</script>
<style>

</style>
