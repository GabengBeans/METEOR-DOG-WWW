<template>

    <div>
        <ul>
            <li v-for="item in imgArr"  class="imgList" @click="previewImg(item)" :close = "close"  :style="{backgroundImage: 'url('+imgUrl + item.mediaUrl+')'}">
                <input type="checkbox" class="check-btn">
                <span class="del-btn" v-show="close" @click.stop="deleteImg($event)"><Icon type="close"></Icon></span>
            </li>
        </ul>

        <Modal width="60%" v-model="isModel">
           <img :src="urlName" :style="{width:'100%'}">
        </Modal>

    </div>
</template>


<script>
    import util from '@/libs/util.js';

    export default {
        name: 'show-img',
        props:{
            value: Array,
            close: {
                type:Boolean,
                default:false
            }
        },
        data: function(){
            return {
                imgUrl: '',
                isModel: false,
                urlName: '',
                imgArr: []



            }
        },
        created: function(){
            this.imgUrl = util.getConfig.imgUrl+'/';

        },
        methods:{
            previewImg: function(item){
                this.isModel = true;
                this.urlName = this.imgUrl + item.mediaUrl;
            },
            init:function () {
               this.imgArr=this.value
            },
            deleteImg: function (event) {
               let a = event.currentTarget;
               let li = a.parentNode;
               li.remove();

            }

        },
        watch:{
            value: function(data){
                this.init();
            }
        }
    };

</script>