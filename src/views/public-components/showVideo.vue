<template>

    <div>
        <ul>

            <li class="imgList">
                <div v-show="video.videoPhotoUrl ? true : false" @click="previewVideo()" :style="{backgroundImage:'url('+video.videoPhotoUrl+')'}"></div>
                <span class="del-btn" v-show="video.videoPhotoUrl ? close : false" @click.stop="deleteVideo($event)"><Icon type="close"></Icon></span>
            </li>
        </ul>


        <Modal width="30%" v-model="isModel">
            <video webkit-playsinline playsinline controls  style="width:100%;" :src="video.videoPlayUrl" ></video>
        </Modal>

    </div>
</template>


<script>
    export default {
        name: 'show-video',
        props:{
            value: Object,
            close:{
                type:Boolean,
                default:false
            }
        },
        data: function(){
            return {
                isModel: false,
                video: {},
            }
        },
        methods:{
            previewVideo: function(){
                this.isModel = true;
            },
            init:function () {
                this.video      = this.value;
            },
            deleteVideo: function (event) {
                let node = event.currentTarget.parentNode;
                node.remove();
            }

        },
        watch:{
            value: function(data){
                this.init();
            }
        }
    };

</script>