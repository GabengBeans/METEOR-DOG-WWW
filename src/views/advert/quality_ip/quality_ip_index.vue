<template>
    <div>
        <div class="button">
            <Button type="success" @click="showCreate">新增广告</Button>
        </div>
        <quality-table :storeStatus="status" :currentPage="$store.state.app.user_page_info.currentPage" :totalPage="$store.state.app.user_page_info.totalPage">
        </quality-table>
        <quality-page></quality-page>

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
import qualityTable from "./quality_ip_table.vue";
import qualityPage from "@/views/public-components/changePage";
////import Cookies from "js-cookie";
export default {
  data() {
    return {
      status: "qualityAd",
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
    qualityTable,
    qualityPage
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
