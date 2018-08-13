<template>
    <div>
        <winning-recording-search :data="search"></winning-recording-search>
        <winning-recording-table :columns="columns" :data="$store.state.app.winning_recording_search_result"></winning-recording-table>
        <winning-recording-change-page
            :storeStatus="mark"
            :currentPage ="$store.state.app.winning_recording_page_info.currentPage"
            :totalPage="$store.state.app.winning_recording_page_info.totalPage"
        ></winning-recording-change-page>
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
    },
    created(){
    this.$store.commit("GET_WINNING_RECORDING_LIST",{
        data:this.$store.state.app.winning_recording_search_info,
        pageNo:this.$store.state.app.winning_recording_public_page})        
    }
}
</script>
<style>
@import "../../../styles/public.less"
</style>
