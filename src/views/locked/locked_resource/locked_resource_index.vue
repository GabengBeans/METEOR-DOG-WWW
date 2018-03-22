<template>
  <div>
    <Card>
      <Button type="success" @click="showAddOne()">添加一级资源</Button>
    </Card>
    <Row>
      <Col span="12">
      <Card style="width:44vw;min-width:400px;">
        <Tree :data="$store.state.app.admin_resource_search_result" :render="renderContent"></Tree>
      </Card>
      </Col>
      <Col span="12" v-if="showResourceDetail">
      <Card style="width:44vw;min-width:400px;">
        <div style="text-align:center;font-size:18px;color:#f60">{{resourceDetailData.title}}</div>
        <br>
        <Form>
          <FormItem style="font-size:16px" label="资源ID：">
            <b>{{resourceDetailData.id}}</b>
          </FormItem>
          <FormItem label="资源名称：">
            <b>{{resourceDetailData.name}}</b>
          </FormItem>
          <FormItem label="资源模块名称：">
            <b>{{resourceDetailData.modelName}}</b>
          </FormItem>
          <FormItem label="创建时间：">
            <b>{{resourceDetailData.createTime}}</b>
          </FormItem>
          <FormItem label="更新时间：">
            <b>{{resourceDetailData.updateTime}}</b>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col span="12" v-if="showResourceEdit">
      <Card style="width:44vw;min-width:400px;">
        <div style="text-align:center;font-size:18px;color:#f60">{{resourceEditData.title}}</div>
        <br>
        <Form :label-width="100">
          <!-- <FormItem style="font-size:16px" label="资源ID：">
            <Input clearable v-model="resourceDetailData.id" />
          </FormItem> -->
          <!-- <FormItem label="父级资源名称：">
            <Input clearable v-model="resourceEditData.name" />
          </FormItem> -->
          <FormItem label="资源名称：">
            <Input clearable v-model="resourceEditData.name" />
          </FormItem>
          <FormItem label="资源模块名称：">
            <Input clearable v-model="resourceEditData.modelName" />
          </FormItem>
          <!-- <FormItem label="创建时间：">
            <Input clearable v-model="resourceDetailData.createTime" />
          </FormItem>
          <FormItem label="更新时间：">
            <Input clearable v-model="resourceDetailData.updateTime" />
          </FormItem> -->
        </Form>
        <br>
        <div style="text-align:center">
          <Button type="success" @click="saveResourceEdit()">保存</Button>
        </div>
      </Card>
      </Col>
      <Col span="12" v-if="showResourceAdd">
      <Card style="width:44vw;min-width:400px;">
        <div style="text-align:center;font-size:18px;color:#f60">{{reseourceAddData.title}}</div>
        <br>
        <Form :label-width="100">
          <FormItem label="父级资源名称：" v-if="reseourceAddData.parentId!=-1">
            <b>{{reseourceAddData.parentName}}</b>
          </FormItem>
          <FormItem label="资源名称：">
            <Input clearable v-model="reseourceAddData.name" />
          </FormItem>
          <FormItem label="资源模块名称：">
            <Input clearable v-model="reseourceAddData.modelName" />
          </FormItem>
        </Form>
        <br>
        <div style="text-align:center">
          <Button type="success" @click="saveResourceAdd()">添加</Button>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  data() {
    return {
      showResourceAdd: false,
      showResourceDetail: false,
      showResourceEdit: false,
      reseourceAddData: {
        title: "",
        name: "",
        modelName: "",
        parentId: -1,
        parentName: ""
      },
      resourceEditData: {},
      resourceDetailData: {}
    };
  },
  created() {
    this.$store.commit("GET_SEARCH_ADIMIN_RESOURCE_INFO");
  },
  methods: {
    showAddOne() {
      this.reseourceAddData.title = "添加一级资源";
      this.reseourceAddData.parentId = -1;
      this.showResourceAdd = true;
      this.showResourceDetail = false;
      this.showResourceEdit = false;
    },
    saveResourceAdd() {
      Util.ajax({
        method: "post",
        url: baseUri.add_admin_resource_url,
        data: {
          parentId: this.reseourceAddData.parentId,
          modelName: this.reseourceAddData.modelName,
          name: this.reseourceAddData.name
        }
      })
        .then(res => {
          if (res.data.success) {
            this.reseourceAddData.name = "";
            this.reseourceAddData.modelName = "";
            this.$store.commit("GET_SEARCH_ADIMIN_RESOURCE_INFO");
            this.$Message.success("添加成功");
          } else {
            this.$Message.error("添加失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveResourceEdit() {
      Util.ajax({
        method: "post",
        url: baseUri.update_admin_resource_url,
        data: {
          id: this.resourceEditData.id,
          modelName: this.resourceEditData.modelName,
          name: this.resourceEditData.name,
          orderNum: this.resourceEditData.orderNum
        }
      })
        .then(res => {
          if (res.data.success) {
            let obj = this.$store.state.app.admin_resource_search_result;
            for (let x = 0; x < obj.length; x++) {
              if (obj[x].id == this.resourceEditData.id) {
                obj[x].name = this.resourceEditData.name;
              } else {
                for (let y = 0; y < obj[x].children.length; y++) {
                  if (obj[x].children[y].id == this.resourceEditData.id) {
                    obj[x].children[y].name = this.resourceEditData.name;
                  }
                }
              }
            }
            this.$Message.success("保存成功");
          } else {
            this.$Message.error("保存失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h(
              "span",
              {
                style: {
                  fontSize: "16px"
                }
              },
              data.name
            )
          ]),
          h(
            "Button",
            {
              props: Object.assign({}, this.buttonProps, {
                type: "info"
              }),
              style: {
                marginRight: "8px",
                float: "right"
              },
              on: {
                click: () => {
                  let obj = data;
                  for (let x in obj) {
                    if (x == "createTime") {
                      this.$set(
                        this.resourceDetailData,
                        x,
                        Util.formatDate(new Date(obj[x]), "yyyy-MM-dd hh:mm:ss")
                      );
                    } else if (x == "updateTime") {
                      this.$set(
                        this.resourceDetailData,
                        x,
                        Util.formatDate(new Date(obj[x]), "yyyy-MM-dd hh:mm:ss")
                      );
                    } else {
                      this.$set(this.resourceDetailData, x, obj[x]);
                    }
                  }
                  this.$set(this.resourceDetailData, "title", "资源详情");
                  this.showResourceDetail = true;
                  this.showResourceEdit = false;
                  this.showResourceAdd = false;
                }
              }
            },
            "详情"
          ),
          h(
            "Button",
            {
              props: Object.assign({}, this.buttonProps, {
                type: "primary"
              }),
              style: {
                marginRight: "8px",
                float: "right"
              },
              on: {
                click: () => {
                  for (let x in data) {
                    this.$set(this.resourceEditData, x, data[x]);
                  }
                  this.$set(this.resourceEditData, "title", "资源编辑");
                  this.showResourceEdit = true;
                  this.showResourceDetail = false;
                  this.showResourceAdd = false;
                }
              }
            },
            "编辑"
          ),
          h(
            "Button",
            {
              props: Object.assign({}, this.buttonProps, {
                type: "success",
                disabled: data.status == 1 ? true : false
              }),
              style: {
                marginRight: "8px",
                float: "right"
              },
              on: {
                click: () => {
                  Util.ajax({
                    method: "post",
                    url: baseUri.enabling_admin_resource_url,
                    params: {
                      adminResourceId: data.id
                    }
                  })
                    .then(res => {
                      if (res.data.success) {
                        data.status = 1;
                        this.$Message.success("启用成功");
                      } else {
                        this.$Message.error("启用失败");
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
              }
            },
            "启用"
          ),
          h(
            "Button",
            {
              props: Object.assign({}, this.buttonProps, {
                type: "error",
                disabled: data.status == 1 ? false : true
              }),
              style: {
                marginRight: "8px",
                float: "right"
              },
              on: {
                click: () => {
                  Util.ajax({
                    method: "post",
                    url: baseUri.disable_admin_resource_url,
                    params: {
                      adminResourceId: data.id
                    }
                  })
                    .then(res => {
                      if (res.data.success) {
                        data.status = 0;
                        this.$Message.success("禁用成功");
                      } else {
                        this.$Message.error("禁用失败");
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
              }
            },
            "禁用"
          ),
          data.parentId == -1
            ? h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "8px",
                    float: "right"
                  },
                  on: {
                    click: () => {
                      this.reseourceAddData.title = "添加二级资源";
                      this.reseourceAddData.parentId = data.id;
                      this.reseourceAddData.parentName = data.name;
                      this.showResourceAdd = true;
                      this.showResourceDetail = false;
                      this.showResourceEdit = false;
                    }
                  }
                },
                "添加二级资源"
              )
            : ""
        ]
      );
    }
  }
};
</script>
<style>

</style>
