<template>
    <div class="addSubAdvertBits">
        <Form label-position="right" :label-width="80">
            <Row>
                <Col :xs='13' :sm='13' :md='8' :lg='6'>
                <FormItem label="资源位名称">
                    <Input clearable v-model="data.positionName" />
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='6'>
                <FormItem label="用户ID" prop="userId">
                    <Input clearable v-model="data.userId" />
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='6'>
                <FormItem style="min-width:100px" label="广告位级别">
                    <Select v-model="data.level">
                        <Option v-for="item in selectData.level.tag" :key="item.key" :value="item.num">{{item.value}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col :xs='13' :sm='13' :md='8' :lg='6'>
                <FormItem label="序号">
                    <Input clearable v-model="data.adSort"></Input>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
  name: "addSubAdvertBits",
  props: ["data", "selectData"],
  data() {
    return {
    };
  }
};
</script>
<style>

</style>
