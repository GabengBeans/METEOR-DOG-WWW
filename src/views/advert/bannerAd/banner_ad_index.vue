<template>
    <div>
        <div class="button">
            <Button type="success" @click="showCreate">新增广告</Button>
        </div>
        <banner-table :storeStatus="status" :currentPage="$store.state.app.user_page_info.currentPage" :totalPage="$store.state.app.user_page_info.totalPage">
        </banner-table>
        <banner-page></banner-page>

        <Modal v-model="showAdCreateModal" width="600">
            <p slot="header" style="text-align:center">
                <span>新增广告</span>
            </p>
            <div>
                <Form :label-width="80" label-position="right">

                    <FormItem label="广告类型">
                        <Select style="width:200px">
                            <Option></Option>
                        </Select>
                    </FormItem>

                    <FormItem label="序号">
                        <Input style="width:60%;min-width:200px" />
                        <span style="color:blue;margin-left:15px">序号越小位置越靠前</span>
                    </FormItem>

                    <FormItem label="服务ID">
                        <Input style="width:60%;min-width:200px" />
                        <Button type="info" style="margin-left:15px">服务详情</Button>
                    </FormItem>

                    <FormItem label="展示图片">
                        <Input style="width:60%;min-width:200px" />
                    </FormItem>

                </Form>
            </div>
            <div slot="footer" style="display:flex;justify-content:space-around">
                <Button type="success" size="large">保存</Button>
                <Button type="error" size="large">取消</Button>
            </div>
        </Modal>
    </div>

</template>
<script>
import bannerTable from "./banner_ad_table.vue";
import bannerPage from "@/views/public-components/changePage";
////import Cookies from "js-cookie";
export default {
  data() {
    return {
      status: "bannerAd",
      buttonName: "新增广告",
      showAdCreateModal: false
    };
  },
  methods: {
    showCreate() {
      this.showAdCreateModal = true;
    }
  },
  components: {
    bannerTable,
    bannerPage
  },
  created() {
    this.$store.commit("GET_USER_INFO", {
      data: this.$store.state.app.user_search_info,
      pageNo: this.$store.state.app.user_public_page
    });
  }
};
</script>
<style>
@import "../../../styles/public.less";
</style>
