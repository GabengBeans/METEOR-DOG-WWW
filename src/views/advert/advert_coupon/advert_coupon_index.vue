<template>
    <div>
        <Card>
            <Form>
                    <FormItem label="图片" :label-width="60">
                        <public-upload-img :imgUrl="image" :upload="true" :detail="true" :change="true"></public-upload-img>
                    </FormItem>
                <FormItem label="跳转地址" :label-width="60">
                    <Input class="coupon-class" clearable v-model="$store.state.app.search_advert_coupon_result.jump_url" />
                </FormItem>
                <FormItem label="类型" :label-width="60">
                    <Select v-model="$store.state.app.search_advert_coupon_result.type" class="coupon-type-class" >
                        <Option :value="1">H5</Option>
                        <Option :value="2">原生</Option>
                    </Select>
                </FormItem>
            </Form>
            <div class="coupon-button-class">
                <Button type="success" @click="saveAdvertCoupon">保存</Button>
            </div>
        </Card>
    </div>    
</template>
<script>
import util from "@/libs/util"
import base_uri from "@/libs/base_uri"
import publicUploadImg from "@/views/public-components/upload_single_img"
export default {
    data(){
        return {
            imgUrl:{
                imgUrl:""
            }
        }
    },
    created(){
        this.$store.commit("GET_ADVERT_COUPON_LIST")
    },
    computed:{
        image(){
            this.imgUrl.imgUrl = this.$store.state.app.search_advert_coupon_result.media_url
            return this.imgUrl
        }
    },
    components:{
        publicUploadImg
    },
    methods:{
        saveAdvertCoupon(){
            if(!this.imgUrl.imgUrl || !this.$store.state.app.search_advert_coupon_result.jump_url)
            {
                this.$Message.error("图片或地址不能为空")
                return 
            }
            util.ajax({
                method:"post",
                url:base_uri.edit_advert_coupon_url,
                params:{
                    media_url:this.imgUrl.imgUrl,
                    jump_url:this.$store.state.app.search_advert_coupon_result.jump_url,
                    type:this.$store.state.app.search_advert_coupon_result.type
                }
            }).then(resp=>{
                if(resp.data.success){
                    this.$Message.success("保存成功")
                }else{
                    this.$Message.error("保存失败")
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>
<style>
.coupon-class{
    width:60%;
    min-width: 500px;
}
.coupon-type-class{
    width:10%;
    min-width: 100px;
}
.coupon-button-class{
    text-align: center;
}
</style>
