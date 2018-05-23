<template>
    <div>
        <div class="search">
            <Row>
                <Col span="12">
                <Form label-position="right" :label-width="75">
                    <FormItem style="min-width:100px" label="选择日期">
                        <DatePicker type="date" 
                        :value="$route.query.date" 
                        placeholder="选择日期" 
                        style="width: 200px"
                        @on-change="changeDate"
                        ></DatePicker>
                    </FormItem>
                </Form>
                </Col>
            </Row>
        </div>
        <auditUserDetailTable :columns="data" :data="result"></auditUserDetailTable>
    </div>
</template>

<script>
import config from "../config";
import util from "@/libs/util";
import base_uri from "@/libs/base_uri";
import auditUserDetailTable from "@/views/public-components/table";
export default {
  data() {
    return {
      data: config.auditUserDetailTableColumns,
      result: []
    };
  },
  components: {
    auditUserDetailTable
  },
  methods:{
      changeDate(date){
         let data = {
      dateday: date
    };
    //console.log(data);
    util
      .ajax({
        method: "post",
        url: base_uri.search_statistics_channel_daily_info_url,
        data: data
      })
      .then(resp => {
        //console.log(resp);
        if (resp.data.success) {
          this.result = resp.data.data;
        } else {
          this.$Message.error("信息获取失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
      }
  },
  created() {
    let data = {
      dateday: this.$route.query.date
    };
    //console.log(data);
    util
      .ajax({
        method: "post",
        url: base_uri.search_statistics_channel_daily_info_url,
        data: data
      })
      .then(resp => {
        //console.log(resp);
        if (resp.data.success) {
          this.result = resp.data.data;
        } else {
          this.$Message.error("信息获取失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
@import "../../../styles/public.less";
</style>
