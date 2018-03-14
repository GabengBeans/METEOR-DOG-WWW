<template>
  <div class="category">
    <Modal :loading="loading" v-model="data.showAddCategory" title="新增二级标签" @on-cancel="handleCandel" @on-ok="handleOk">
      <Form label-position="right" :label-width="80">
        <FormItem label="标签名称" width="20vw">
          <Input class="category_Input" clearable v-model="data.name" />
        </FormItem>
        <FormItem label="所属级别">
          <Select v-model="levelName" style="width:200px">
                <Option v-for="item in data.levelName" :value="item.id" :key="item.value">{{item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="data.status">
            <Radio :label=1>
              <span>启用</span>
            </Radio>
            <Radio :label=0>
              <span>禁用</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  props: ["data","categoryData"],
  data() {
    return {
      loading: true,
      levelName:""
    };
  },
  methods: {
    handleCandel() {
      this.data.showAddCategory = false;
    },
    handleOk() {
      Util.ajax({
        method: "post",
        url: baseUri.label_add_lable_url,
        data: {
          labelType:this.data.labelType,
          level:2,
          name:this.data.name,
          parentId:this.levelName
        }
      })
        .then(res => {
          if (res.data.success) {
            this.$store.state.app.category_tab_search_result.allLabels=""
            this.$store.state.app.categorys_tab_search_result.allLabels=""
            this.$store.commit("GET_LABEL_LIST_SEARCH_INFO", { lableType: 1 });
            this.$store.commit("GET_LABEL_LIST_SEARCH_INFO", { lableType: 2 });
            this.data.showAddCategory = false;
            this.$Message.success("新增成功");
          } else {
            this.loading = false;
            this.$Message.error(res.data.msg);
          }
        })
    }
  }
};
</script>
<style>
.category_Input {
  width: 10vw;
}
.demo-upload-lists {
  display: inline-block;
  width:150px;
  height:150px;
  min-width: 10vw;
  min-height: 15vh;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-lists img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-covers {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  line-height: 15vh;
}
.demo-upload-lists:hover .demo-upload-list-covers {
  display: block;
}
.demo-upload-list-covers i {
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
