<template>
    <div>
       <input 
            style="display: none;"
            ref="uploadIpt"
            class="uploadIpt df dfc"
            @change="handleFileChange" 
            type="file"  
            name="file" 
            multiple="multiple" 
        />
        <div class="df upload_out">
            <div 
                class="uploadPic df dfdir dfc"
                @click="fileToUpload"    
            >
                <i class="el-icon-plus"></i>
                上传图片
            </div>
            <div class="preview-div">
                <img 
                    class="preview-img" 
                    :src="qrcodeImg" 
                    alt=""/>
                <el-progress
                    v-if="progressRate && Number(progressRate) !== 100" 
                    class="img-progress"
                    type="circle" 
                    :percentage="progressRate" 
                    status="success"></el-progress>
            </div>
        </div> 
    </div>
</template>

<script>
/**
 * 使用方法，不用传参数，传一个自定义方法fileUploadSucess用来接收白山的文件链接
 */
import {hostAddress} from '@/config/index.js'
import { uploadPic, uploadVideo } from '@/utils/upload.js'
import axios from '@/utils/fetch'
export default {
    props: {
        picurl: {
            type: String,
            default: ''
        },
    },
    data(){
        return {
            progressRate: 0, //图片上传进度
            qrcodeImg: this.picurl  //二维码图片
        }
    },
    watch: {
        picurl(newVal, oldVal) {
            this.qrcodeImg = newVal;
        },
    },
    methods: {
        fileToUpload(){
            // const uploadIpt = document.querySelector('.uploadIpt')
            const uploadIpt = this.$refs.uploadIpt
            uploadIpt.click()
        },
        // 文件改变时的操作
        handleFileChange(e){
            // const input = e.target;
            const files = e.target.files;
            // 上传图片
            uploadPic(files, progress => {
                // 进度
                this.progressRate = progress
            }, params => {
                this.qrcodeImg = params.address
                this.$emit('fileUploadSucess', params.address)
            })
        },
    }
}
</script>

<style lang="less" scoped>
.upload_out{
    margin-top: 4px;
    .uploadPic{
        width: 128px;
        height: 128px;
        font-size: 16px;
        color: #111C2A;
        cursor: pointer;
        background: #ECF0F5;
        border: 1px solid #B9C1C9;
        border-radius: 2px;
        .el-icon-plus{
            margin-bottom: 10px;
            font-size: 32px;
            color: #6D767E;
        }
    }
    .preview-div{
        margin-left: 20px;
        width: 130px;
        // height: 130px;
        border-radius: 4px;
        // background: #eee;
        position: relative;
        .preview-img{
            width: 100%;
            display: block;
        }
        .img-progress{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            /deep/ .el-progress-circle{
                width: 100% !important;
                height: 100% !important;
            }
        }
    }
} 
</style>