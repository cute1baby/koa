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
            <el-form-item label="链接类型" prop="linkType">
                <el-radio v-model="ruleForm.linkType" :label="1">视频</el-radio>
                <el-radio v-model="ruleForm.linkType" :label="2">文章</el-radio>
            </el-form-item>
            <el-form-item label="所属类型" prop="belongTypeId">
                <div class="typeSelect df dfaic">
                    <span class="add" @click="routerPath('/home/addArtType')">
                        <i class="iconfont">&#xe618;</i>
                    </span>
                    <el-select class="df1" 
                        filterable
                        clearable
                        v-model="ruleForm.belongTypeId" 
                        placeholder="选择所属类型">
                        <el-option
                            v-for="item in typeList"
                            :key="item.typeId"
                            :label="item.title"
                            :value="item.typeId">
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
            </el-form-item>
            <div class="df dfjcc">
                <el-button 
                    type="primary"
                    class="submit-btn"
                    @click="submitForm('ruleForm')"
                >提交</el-button>
            </div>
        </el-form>

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
            progressRate: 0, //图片上传进度
            currentId: '',
            typeList: [],
            ruleForm: {
                resourceTitle: '',
                resourceDesc: '',
                address: '',
                linkType: 1,  //链接类型（'1':视频,'2':文章）
                belongTypeId: '',
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
            this.ruleForm = {...query, linkType: Number(query.linkType)}
        }
        this.findTypeList()
    },
    methods: {
        findTypeList(){
            const {pageNum, pageSize} = this
            axios.get('/qianduan/getArticleTypeList', {
                params: {
                    pageNum: 1, 
                    pageSize: 100, 
                    typeName: ''
                }
            }).then(res => {
                const {status, data} = res.data
                if(!status){
                    const {counts, list} = data
                    this.typeList = list
                }
            }).catch(err => {
                console.log('获取类型列表接口出现问题：' + err)
            })
        },
        fileToUpload(){
            // const uploadIpt = document.querySelector('.uploadIpt')
            // uploadIpt.click()
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
            const { ruleForm, currentId,  } = this
            const {
                resourceTitle,
                resourceDesc,
                address,
                linkType,
                belongTypeId,
                resourceImg
            } = ruleForm
            const ruleFormClone = {
                resourceTitle: '',
                resourceDesc: '',
                address: '',
                linkType: 1,
                belongTypeId: '',
                resourceImg: ''  //二维码图片
            }
            axios.post('/qianduan/addArticleData', {
                articleId: currentId,
                title: resourceTitle,
                desc: resourceDesc,
                address,
                linkType,
                typeId: belongTypeId,
                picLink: resourceImg
            }).then(res => {
                const {status} = res.data
                if(!status){
                    const conWrapper = document.querySelector('.conWrapper')
                    conWrapper.scrollTo(0, 0)
                    this.ruleForm = ruleFormClone
                    this.$message({
                        type: 'success',
                        message: '文章|视频添加成功'
                    })
                    if(currentId){
                        this.$router.back()
                    }
                }
            }).catch(err => {
                console.log('文章（视频）接口出现问题：' + err)
            })
        },
        
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

</style>