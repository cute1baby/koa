<template>
    <div class="df dfdir" style="min-height: 100%;">
        <div class="top df">
            <el-input 
                class="title df1"
                v-model="title" 
                placeholder="请输入标题"
            ></el-input>
            <div class="df dfaic dfjend up-bottom">
                <label for="">选择标签：</label>
                <el-select 
                    class="up-select"
                    clearable
                    filterable
                    v-model="tagId" 
                    placeholder="选择标签"
                >
                    <el-option
                    v-for="item in tagList"
                    :key="item.tagId"
                    :label="item.title"
                    :value="item.tagId">
                    </el-option>
                </el-select>
                <el-button 
                    class="up-submit"
                    @click="submitData"
                >确定并发布</el-button>
            </div>
        </div>
        <mavon-editor 
            class="m-editor df1"
            v-model="content"
            :toolbars="toolbars" 
        />
    </div>
</template>

<script>
import {responseStatus} from '@/config' 
import axios from '@/utils/fetch'
import { mapState } from 'vuex'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    data(){
        return {
            title: '',
            content: '',
            tagList: [],
            tagId: '',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                mark: true, // 标记
                superscript: true, // 上角标
                quote: true, // 引用
                ol: true, // 有序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                help: true, // 帮助
                code: true, // code
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                /* 1.3.5 */
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true // 导航目录
            }
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created(){
        this.controlHead('.main-header', 'none')
        this.handleSearchTags()
    },
    destroyed() {
        this.controlHead('.main-header', 'block')
    },
    methods: {
        controlHead(oDiv, status){
            const oDivDom = document.querySelector(oDiv)
            if(oDivDom){
                oDivDom.style.display = status
            }
        },
        // 获取标签
        async handleSearchTags(){
            try {
                const {searchTag, pageNum, pageSize}  = this
                const {userId} = this.userInfo
                const res = await axios.post('/juejin/searchTags', {
                    userId,
                    searchName: '',
                    pageNum: 1,
                    pageSize: 60
                })
                if(res.data.status === responseStatus){
                    this.tagList = res.data.data
                }
            } catch (error) {
                console.log('查询标签出现问题：' + error)
            } 
        },
        routerPath(path, query){
            this.$router.push({path, query})
        },
        validate(){
            const {tagId, title, content} = this
            if(!title){
                this.$message('请填写文章标题')
                return false
            }
            if(!content){
                this.$message('请填写文章内容')
                return false
            }
            if(!tagId){
                this.$message('请选择一个标签')
                return false
            }
            return true
        },
        // 提交数据
        async submitData(){
            if(this.validate()){
                try {
                    const $dom = document.querySelector('.v-show-content')
                    const w_content = $dom.innerHTML
                    const {title, tagId}  = this
                    const {userId} = this.userInfo
                    console.log('内容：' + $dom.innerHTML)
                    const res = await axios.post('/juejin/createAndSaveArticle', {
                        userId,
                        tagId,
                        title,
                        content: w_content
                    })
                    if(res.data.status === responseStatus){
                        this.$message({
                            type: 'success',
                            message: '文件创建并发布成功'
                        })
                        setTimeout(() => {
                            this.routerPath('/')
                        }, 500)
                        
                    }
                } catch (error) {
                    console.log('文章保存接口出现问题：' + error)
                } 


            }
        }
    },
    components: {
        mavonEditor
    }
}
</script>

<style lang="less" scoped>
.top{
    height: 64px;
    background: #fff;
    .title{
        /deep/ .el-input__inner{
            font-size: 2rem;
            color: #333;
            height: 64px;
            border: none;
        }
    }
    .up-bottom{
        flex-basis: 350px;
        margin-right: 30px;
        label{
            font-size: 14px;
            color: #2c3e50;
        }
        .up-select{
            flex-basis: 130px;
            margin-right: 30px;
        }
        .up-submit{
            border: 1px solid #007fff;
            color: #007fff;
        }
    }

}
.m-editor{
    min-height: 100%;
}

</style>