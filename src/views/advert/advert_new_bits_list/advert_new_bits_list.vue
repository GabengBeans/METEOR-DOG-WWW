<template>
    <div>
        <br><br>
        <Row :gutter='16'>
            <Form label-position="right" :label-width="60">
                <Col :xs='13' :sm='13' :md='8' :lg='5'>
                <FormItem style="min-width:60px" :label="searchConfig.level.tagName">
                    <Select v-model="searchConfig.level.value">
                        <Option v-for="item in searchConfig.level.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Form>
            <Button style='margin-left:38px' type="primary" shape="circle" icon="ios-search" @click.native='search'>搜索</Button>
            <Button type="success" shape="circle" style='margin-left:38px' @click.native="showAddSubAdertBits=true">添加子广告位</Button>
        </Row>
        <br><br>
        <TableComponent :columns="advertNewBitsTableColumns" :data="$store.state.app.advert_position_search_result"></TableComponent>
        <br>
        <Page :storeStatus="status" :currentPage="$store.state.app.advert_position_page_info.currentPage" :totalPage="$store.state.app.advert_position_page_info.totalPage"></Page>
        <Modal v-model="showAddSubAdertBits" width="80vw">
            <p slot="header" style="color:#f60;text-align:center">
                <span>添加子广告位</span>
            </p>
            <div style="text-align:center">
                <AddSubAdvertBits :data="addSubAdvertBitsData" :selectData="searchConfig"></AddSubAdvertBits>
            </div>
            <div slot="footer">
                <Button type="success" @click.native="addSubAdertBits">保存</Button>
                <Button type="error" @click="showAddSubAdertBits=false">返回</Button>
            </div>
        </Modal>
        <Modal v-model="showEditSubAdertBits" width="80vw">
            <p slot="header" style="color:#f60;text-align:center">
                <span>编辑子广告位</span>
            </p>
            <div style="text-align:center">
                <AddSubAdvertBits :data="editSubAdvertBitsData" :selectData="searchConfig"></AddSubAdvertBits>
            </div>
            <div slot="footer">
                <Button type="success" @click.native="addSubAdertBits">保存</Button>
                <Button type="error" @click="showAddSubAdertBits=false">返回</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import config from "../config";
import search from "@/views/public-components/search";
import TableComponent from "@/views/public-components/table";
import Page from "@/views/public-components/changePage";
import AddSubAdvertBits from "./add_sub_advert_bits";
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
        showEditSubAdertBits:false,
      addSubAdvertBitsData: {
        positionName: "",
        userId: "",
        level: "1",
        adSort: ""
      },
      editSubAdvertBitsData:{},
      showAddSubAdertBits: false,
      status: "advertNewBits",
      searchConfig: config.advertNewBitsList,
      //columns : config.cashRefundColumns,
      advertNewBitsTableColumns: [
        {
          title: "广告位名称",
          key: "positionName"
        },
        {
          title: "位置级别",
          key: "level"
        },
        {
          title: "状态",
          key: "status"
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
                      Util.ajax({
                          method:"get",
                          url:baseUri.advert_position_detail_url,
                          params:{
                              advertPositionId:params.row.id
                          }
                      }).then((res)=>{
                          console.log(res)
                          if(res.data.success)
                          {
                              this.editSubAdvertBitsData = res.data.data
                              this.showEditSubAdertBits = true
                          }
                      })
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
                        adverPositionId: params.row.id
                      };
                      Util.ajax({
                        method: "post",
                        url: baseUri.advert_position_delete_url,
                        data: Util.formData(data)
                      })
                        .then(res => {
                          if (res.data.data == "SUCCESS") {
                            this.$Message.success("删除成功");
                            this.$store.commit(
                              "GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO",
                              {
                                data: { level: this.searchConfig.level.value },
                                pageNo: 1
                              }
                            );
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
    search() {
      let obj = {};
      for (let x in this.searchConfig) {
        if (this.searchConfig[x].value != "") {
          obj[x] = this.searchConfig[x].value;
        }
      }
      this.$store.commit("GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO", {
        data: obj,
        pageNo: 1
      });
    },
    addSubAdertBits: function() {
      for (let x in this.addSubAdvertBitsData) {
        if (!this.addSubAdvertBitsData[x]) {
          this.$Message.error("请补全信息");
          return false;
        }
      }
    //   if(!this.addSubAdvertBitsData.userId instanceof Number)
    //     {
    //         this.$Message.error("用户ID异常")
    //         return false
    //     }
      let data = {
        positionName: this.addSubAdvertBitsData.positionName,
        userId: this.addSubAdvertBitsData.userId,
        level: this.addSubAdvertBitsData.level,
        adSort: this.addSubAdvertBitsData.adSort
      };

      this.$Message.loading({
        content: "保存中...",
        duration: 0
      });
      Util.ajax({
        method: "post",
        url: baseUri.advert_position_add_url,
        data: Util.formData(data)
      })
        .then(res => {
          console.log(res);
          if (res.data.data == "SUCCESS") {
            this.$Message.destroy();
            this.$Message.success("保存成功");
            this.$store.commit("GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO", {
              data: { level: this.searchConfig.level.value },
              pageNo: 1
            });
            this.showAddSubAdertBits = false;
          }else {
            this.$Message.destroy();
            this.$Message.error("保存失败,请检查填写信息");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    search,
    TableComponent,
    Page,
    AddSubAdvertBits
  },
  created() {
    this.$store.commit("GET_ADVERT_POSITION_SEARCH_FOR_PAGE_INFO", {
      data: { level: "1" },
      pageNo: 1
    });
  }
};
</script>
<style>

</style>
