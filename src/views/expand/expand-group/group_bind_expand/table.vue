<template>
  <div id='user_table'>
      <div class="btns">
          <i-button class="btn" type="primary" @click="bindInGroup()">绑定到代理组</i-button>
      </div>
      <Table @on-select="select" @on-select-all="selectAll" highlight-row style="min-width:800px;margin:0 16px;" 
      border stripe :columns="columns" :data="$store.state.app.group_bind_search_result">
      </Table>
  </div>
   
</template>
<style>
  .btns{
    margin: 0 30px 15px;
  }
  .btns .btn{
    margin-right: 10px;
  }
</style>

<script>
import Util from '@/libs/util'
import baseUri from '@/libs/base_uri'
import Cookies from "js-cookie"
export default {
  name: "user_table",

  data() {
    return {
      ids: [],
      columns: [
        {
          width: 60,
          align: 'center',
          type: 'selection'
        },
        {
          title: "代理人id",
          key: "id",
          width: 100
        },
        {
          title: "代理人名称",
          key: "nickname"
        },
        {
          title: "代理人手机号",
          key: "phone"
        }
      ]
    };
  },
  created() {

  },
  methods: {
    select(selection,row) {
      //console.log(row)
      this.ids.push(row.id)
      //console.log(this.ids)
      
    },
    selectAll(selection) {
      for(let x in selection) {
        this.ids.push(selection[x].id)
      }
      //console.log(this.ids)
    },
    bindInGroup() {
      this.$Modal.confirm({
        title: "提示",
        content: '确定将所选代理人绑定到代理组吗？',
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          let arr = this.ids;
          let ids = [...new Set(arr)];
          Util.ajax({
            method: 'POST',
            url: baseUri.extend_group_bind_expand_in_group,
            data:{
              groupId:this.$route.params.id,
              expandIds:ids
            }
          }).then(res => {
            //console.log(res)
            if(res.data.success){
              this.$Message.success("绑定成功！");
            }else {
              this.$Message.error('绑定失败！');
            }
          })
        }
      })
    }
  }
};
</script>
