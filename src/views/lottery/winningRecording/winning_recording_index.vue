<template>
    <div>
        <winning-recording-search :data="search"></winning-recording-search>
        <winning-recording-table :columns="columns"></winning-recording-table>
        <winning-recording-change-page></winning-recording-change-page>
    </div>
</template>

<script>
import config from "../config"
import winningRecordingSearch from "@/views/public-components/search"
import winningRecordingTable from "@/views/public-components/table"
import winningRecordingChangePage from "@/views/public-components/changePage"
export default {
    components:{
        winningRecordingSearch,
        winningRecordingTable,
        winningRecordingChangePage
    },
    data(){
        return {
            search:config.winningRecordingSearch,
            mark:"winningRecording",
            columns:config.winningRecordingColumns
        }
    }
}
</script>
<style>
@import "../../../styles/public.less"
</style>
