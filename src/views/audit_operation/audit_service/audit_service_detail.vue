<template>
    <div>
        <auditUserDetailTable
        :columns="data"
        :data="result"
        ></auditUserDetailTable>
    </div>
</template>

<script>
import config from "../config"
import util from "@/libs/util"
import base_uri from "@/libs/base_uri"
import auditUserDetailTable from "@/views/public-components/table"
export default {
    data(){
        return{
            data:config.auditServiceDetailTableColumns,
            result:[]
        }
    },
    components:{
        auditUserDetailTable
    },
    created(){
        let data = {
            dateday:this.$route.query.date
        }
        console.log(data)
        util.ajax({
            method:'post',
            url:base_uri.search_statistics_channel_daily_info_url,
            data:data
        }).then(resp=>{
            console.log(resp)
            if(resp.data.success)
            {
                this.result = resp.data.data
            }else{
                this.$Message.error("信息获取失败")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style>

</style>
