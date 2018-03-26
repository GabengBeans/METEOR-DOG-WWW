<template>
    <div id="system_settings">
        <Search :data="data" :storeStatus="status"></Search>
        <Button type="primary" style="margin-left:16px" @click.native="showAddSystemFun()">新增系统变量</Button>
        <SystemTable></SystemTable>
        <Page :storeStatus="status" :currentPage="$store.state.app.system_settings_page_info.currentPage" :totalPage="$store.state.app.system_settings_page_info.totalPage"></Page>
        <Modal v-model="showAddSystem" width="360" @on-cancel="showAddSystem=false" @on-ok="addSystem()">
            <p slot="header" style="color:#f60;text-align:center">
                <span>新增系统变量</span>
            </p>
            <div style="text-align:center">
                <Form :label-width="40" label-position="left">
                    <FormItem label="键">
                        <Input clearable v-model="SystemData.key" />
                    </FormItem>
                    <FormItem label="值">
                        <Input clearable v-model="SystemData.value" />
                    </FormItem>
                    <FormItem label="描述">
                        <Input clearable v-model="SystemData.description" />
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import config from "../config";
import baseUri from "@/libs/base_uri";
import Util from "@/libs/util";
import Search from "@/views/public-components/search";
import SystemTable from "./system_settings_table";
import Page from "@/views/public-components/changePage";
export default {
  name: "system_settings",
  data() {
    return {
      SystemData: {
        key: "",
        value: "",
        description: ""
      },
      showAddSystem: false,
      data: config.systemSettingSearch,
      status: "systemSettingSearch"
    };
  },
  created() {
    this.$store.commit("GET_SYSTEM_SETTINGS_SEARCH_INFO", {
      data: {},
      pageNo: this.$store.state.app.system_settings_public_page
    });
  },
  methods: {
      showAddSystemFun(){
          this.showAddSystem = true
          this.SystemData.key = ""
          this.SystemData.value = ""
          this.SystemData.description = ""
      },
        addSystem() {
        Util.ajax({
            method: "post",
            url: baseUri.add_setting_url,
            data: {
            key: this.SystemData.key,
            value: this.SystemData.value,
            description: this.SystemData.description
            }
        })
            .then(res => {
            //console.log(res)
            if (res.data.success) {
                this.$store.commit("GET_SYSTEM_SETTINGS_SEARCH_INFO", {
                data: {},
                pageNo: 1
                });
                this.$Message.success("添加成功");
            }
            })
            .catch(error => {
            this.$Message.error(error);
            });
        }
  },
  components: {
    Search,
    SystemTable,
    Page
  }
};
</script>
<style>

</style>
