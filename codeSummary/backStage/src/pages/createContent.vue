<template>
    <div>
        <h3 class="title df dfaic dfjbw">
            {{isCreate?'新增文章和视频':'编辑文章和视频'}}
            <span class="back" @click="$router.back()">返回上一步</span>
        </h3>
        <el-form 
            ref="ruleForm"
            class="rule-form"
            v-loading="isLoading"
            :model="ruleForm"
            :rules="rules" 
            label-width="120px"
        >
            <el-form-item label="资源标题" prop="resourceTitle">
                <el-input v-model="ruleForm.resourceTitle" placeholder="填写资源标题"></el-input>
            </el-form-item>
            <el-form-item label="资源描述" prop="resourceDesc">
                <el-input v-model="ruleForm.resourceDesc" placeholder="填写资源描述"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="填写链接地址"></el-input>
            </el-form-item>
            <el-form-item label="所属类型" prop="belongType">
                <div class="typeSelect df dfaic">
                    <span class="add" @click="handleModalChange">
                        <i class="iconfont">&#xe618;</i>
                    </span>
                    <el-select class="df1" v-model="ruleForm.belongType" placeholder="填写所属类型">
                        <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            
            <!-- 上传图片 -->
            <el-form-item class="qrcode_img" label="图片资源">
                <input 
                    style="display: none;"
                    class="uploadIpt df dfc"
                    @change="handleFileChange" 
                    type="file"  
                    name="file" 
                    multiple="multiple" 
                />
                <div class="df upload_out">
                    <span 
                        class="uploadPic df dfc"
                        @click="fileToUpload"    
                    >上传图片</span>
                    <div class="preview-div">
                        <img 
                            class="preview-img" 
                            :src="ruleForm.resourceImg" 
                            alt=""/>
                        <el-progress
                            v-if="progressRate && Number(progressRate) !== 100" 
                            class="img-progress"
                            type="circle" 
                            :percentage="progressRate" 
                            status="success"></el-progress>
                    </div>
                </div>
                <span class="img-upload-tip" v-if="imgUploadTip">请上传图片</span>
            </el-form-item>
            <div class="df dfjcc">
                <el-button 
                    type="primary"
                    class="submit-btn"
                    @click="submitForm('ruleForm')"
                >提交</el-button>
            </div>
        </el-form>

        <!-- 浮窗 拷贝训练营 -->
        <el-dialog 
            class="typeDialog"
            title="添加类型" 
            :visible.sync="typeVisible"
            top="4vh"
            width="400px" 
            append-to-body >
                <el-input v-model="addType" maxlength='12' placeholder="添加类型"></el-input>
                <p class="df dfjend">
                    <el-button type="primary" class="subType" @click="saveType">提交</el-button>
                </p>
        </el-dialog>
    </div>
</template>

<script>
import {hostAddress} from '@/config/index.js'
import { uploadPic, uploadVideo } from '@/utils/upload.js'
import axios from '@/utils/fetch'
export default {
    data(){
        const validateResourceTitle = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写资源标题'));
            } else {
            callback(); 
            }
        }
        const validateResourceDesc = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写资源描述'));
            } else {
                callback();
            }
        }
        const validateAddress = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写链接地址'));
            } else {
                callback();
            }
        }
        return {
            isLoading: false,
            isCreate: true,
            imgUploadTip: false,  //上传图片的提示
            progressRate: 0, //图片上传进度
            currentId: '',
            typeList: [
                { value: '选项1', label: '黄金糕' }
            ],
            typeVisible: false,
            addType: '',  // 添加类型
            ruleForm: {
                resourceTitle: '',
                resourceDesc: '',
                address: '',
                belongType: '',
                resourceImg: ''  //二维码图片
            },
            rules: {
                resourceTitle: [
                    { validator: validateResourceTitle, trigger: 'blur' }
                ],
                resourceDesc: [
                    { validator: validateResourceDesc, trigger: 'blur' }
                ],
                address: [
                    { validator: validateAddress, trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        const {id} = this.$route.params
        // 判断是新增还是编辑
        if(id !== 'new'){
            const query = this.$route.query
            this.currentId = id
            this.isCreate = false
            this.ruleForm = {...query}
        }
    },
    methods: {
        handleModalChange(){
            this.typeVisible = !this.typeVisible
        },
        fileToUpload(){
            const uploadIpt = document.querySelector('.uploadIpt')
            uploadIpt.click()
        },
        // 文件改变时的操作
        handleFileChange(e){
            const { ruleForm } = this
            const input = e.target;
            const files = e.target.files;
            // 上传图片
            uploadPic(files, progress => {
                // 进度
                this.progressRate = progress
            }, params => {
                this.ruleForm = {...ruleForm, resourceImg: params.address}
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.ruleForm.resourceImg){
                        this.imgUploadTip = true
                        return
                    }
                    this.imgUploadTip = false
                    this.submitData()
                } else {
                    console.log('提交参数错误');
                    return false;
                }
            });
        },
        routerPath(path, query){
            this.$router.push({path, query})
        },
        submitData(){
            console.log('提交数据')
            // const that = this
            // const {
            //     resourceTitle, 
            //     resourceDesc, 
            //     address,
            //     belongType,
            //     resourceImg
            // } = this.ruleForm;
            // const resetForm = {
            //     resourceTitle: '',
            //     resourceDesc: '',
            //     address: '',
            //     belongType: '',
            //     resourceImg: ''
            // }
            // const id = this.currentId
            // if(this.isLoading){
            //     return;
            // }
            // this.isLoading = true
            // axios.post(hostAddress + '/wechat/wechat.info/save', {
            //     id,
            //     resourceTitle: resourceTitle.trim(),
            //     resourceDesc: resourceDesc.trim(),
            //     address: address.trim(),
            //     belongType: belongType.trim(),
            //     resourceImg
            // })
            // .then(function (res) {
            //     const data = res.data;
            //     if(res.status === 200){
            //         that.isLoading = false
            //         that.$message({
            //             type: 'success',
            //             message: '保存成功'
            //         })
            //         setTimeout(() => {
            //             that.routerPath('/home/manage')
            //         }, 500)
            //     }
            // })
            // .catch(function (error) {
            //     console.log('新增或修改公众号信息出错：' + error);
            // })
        },
        // 保存类型
        saveType(){
            console.log('保存类型>>>>>')
        }
    }
}
</script>

<style lang="less" scoped>
.title{
    font-size: 20px;
    font-weight: bold;
    color: #111C2A;
    margin: 10px 0 20px;
    .back{
        font-size: 14px;
        color: #06609A;
        cursor: pointer;
    }
}
.rule-form{
    /deep/ .el-form-item__label{
        color: #1F2D3D;
        font-weight: 600;
    }
    .typeSelect{
        width: 100%;
        .add{
            width: 60px;
            height: 36px;
            text-align: center;
            border-radius: 4px;
            background: #06609A;
            margin-right: 24px;
            cursor: pointer;
            .iconfont{
                line-height: 36px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
    .qrcode_img{
        /deep/ .el-form-item__content{
            line-height: 1;
        }
        .upload_out{
            margin-top: 4px;
            .uploadPic{
                width: 100px;
                height: 30px;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                background: #06609A;
                border-radius: 4px;
            }
            .preview-div{
                margin-left: 20px;
                width: 80px;
                height: 80px;
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
    }
    .img-upload-tip{
        color: #F56C6C;
        font-size: 12px;
    }
    
}

.typeDialog{
    .subType{
        margin-top: 24px;
    }
}

// 提交按钮
.subType, .submit-btn{
    background: #06609A;
    border-color: #06609A;
    &:hover{
        background: #097dc7;
        border-color: #097dc7;
    }
}

</style>