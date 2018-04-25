<template>
    <div>
        <Form :label-width="90">
            <FormItem label="用户角色:">
                <Input clearable v-model="data.roleName" />
            </FormItem>
            <FormItem label="角色授权信息:">
            </FormItem>
        </Form>
        <DetailTree :trees="data.tree"></DetailTree>
    </div>
</template>
<script>
import DetailTree from "./locked_role_detail_tree";
export default {
  props: ["data"],
  components: {
    DetailTree
  }
};
</script>
<style>

</style>
