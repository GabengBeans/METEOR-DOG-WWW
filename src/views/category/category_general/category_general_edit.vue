<template>
  <div class="category">
    <Modal :loading="loading" v-model="data.showEditCategory" :title="data.title" @on-cancel="handleCandel" @on-ok="handleOk" >
      <Form label-position="right" :label-width="80">
        <FormItem label="分类名称">
          <Input class="category_Input" clearable v-model="data.name" />
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
        <FormItem label="排序">
          <Input class="category_Input" clearable v-model="data.sort" />
        </FormItem>
        <FormItem label="">
          <Checkbox v-model="data.isRecommend">前端推荐</Checkbox>
          <Checkbox v-model="data.isHot">热门搜索</Checkbox>
        </FormItem>
        <FormItem label="上传图片">
          <template v-if="!data.avatarUrl">
            图片大小限制2M
            <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :format="['jpg','jpeg','png']" :max-size="2048" :data="{
                    'type':'user'
                  }" :action="imgUrl">
              <div>
                <Icon type="camera" size="40"></Icon>
              </div>
            </Upload>
          </template>
          <template v-if="data.avatarUrl">
            <div class="demo-upload-lists">
              <img :src="data.avatarUrl">
              <div class="demo-upload-list-covers">
                <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
              </div>
            </div>
          </template>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import Util from "@/libs/util";
import baseUri from "@/libs/base_uri";
export default {
  props: ["data"],
  data() {
    return {
      loading: true,
      imgUrl:baseUri.img_upload_url
    };
  },
  methods: {
    handleCandel() {
      this.data.showEditCategory = false;
    },
    handleOk() {
      Util.ajax({
        method: "post",
        url: baseUri.category_update_url,
        data: {
          avatarUrl: this.data.avatarUrl,
          id: this.data.id,
          isHot: this.data.isHot ? 1 : 0,
          isRecommend: this.data.isRecommend ? 1 : 0,
          level: this.data.level,
          name: this.data.name,
          sort: this.data.sort,
          status: this.data.status,
          type:this.data.type
        }
      })
        .then(res => {
          if (res.data.success) {
            this.$store.state.app.category_search_result=""
            this.$store.state.app.categorys_search_result=""
            this.$store.commit("GET_CATEGORY_SEARCH_INFO", { businessType: 1 });
            this.$store.commit("GET_CATEGORY_SEARCH_INFO", { businessType: 2 });
            this.data.showEditCategory = false;
            this.$Message.success("保存成功");
          } else {
            this.loading = false;
            this.$Message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSuccess(res) {
      //console.log(res);
      this.data.avatarUrl = res.result.file.outUrl;
      //console.log(this.data.imgUrl)
    },
    handleFormatError() {},
    handleMaxSize() {},
    handleBeforeUpload() {},
    handleRemove() {
      this.data.avatarUrl = "";
      //console.log(this.data)
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
