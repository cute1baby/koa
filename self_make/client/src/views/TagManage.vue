<template>
  <div class="outter">
    <div class="home">
        <div class="home_fixed">
            <div class="taglist df dfaic">
            <ul class="navlist df dfaic df1">
                <li 
                    :class="currentTag===1?'df dfaic active':'df dfaic'"
                    v-loading.fullscreen.lock="loading"
                    @click="handleTagChange(1)"
                >已关注标签</li>
                <li 
                    :class="currentTag===2?'df dfaic active':'df dfaic'"
                    v-loading.fullscreen.lock="loading"
                    @click="handleTagChange(2)"
                >全部标签</li>
            </ul>
            </div>
        </div>
    </div>

    <!-- 个人关注 -->
    <div class="tag-container" v-if="currentTag===1">
        <ul class="taglist">
            <li 
                v-for="(tag, i) in selfAttentionList" :key="i"
            >
                <div class="tag df dfdir dfaic">
                    <img :src="tag.tagIcon" alt="" class="tag-icon"/>
                    <h4 class="title">{{tag.title}}</h4>
                    <p class="all-data df dfc">
                        <span class="attention">{{tag.attentionNums}} 关注</span>
                        <span class="article">{{tag.articleNums}} 文章</span>
                    </p>
                    <span 
                        class="is-watch" 
                        v-if="tag.isFocus"
                        @click="handleNoAttention(tag.tagId)"    
                    >已关注</span>
                    <span 
                        class="no-watch" 
                        v-else
                        @click="handleAttention(tag.tagId)"
                    >关注</span>
                </div>
            </li>
        </ul>
    </div>

    <!-- 所有标签 -->
    <div class="tag-container" v-else> 
        <el-input 
            class="search-tag"
            v-model="searchTag" 
            placeholder="搜索标签"
            @keyup.native.enter="SearchTagsByName"
            v-loading.fullscreen.lock="loading">
        ></el-input>
        <ul class="taglist">
            <li 
                v-for="(tag, i) in tagList" :key="i"
            >
                <div class="tag df dfdir dfaic">
                    <img :src="tag.tagIcon" alt="" class="tag-icon"/>
                    <h4 class="title">{{tag.title}}</h4>
                    <p class="all-data df dfc">
                        <span class="attention">{{tag.attentionNums}} 关注</span>
                        <span class="article">{{tag.articleNums}} 文章</span>
                    </p>
                    <span 
                        class="is-watch" 
                        v-if="tag.isFocus"
                        @click="handleNoAttention(tag.tagId)"    
                    >已关注</span>
                    <span 
                        class="no-watch" 
                        v-else
                        @click="handleAttention(tag.tagId)"
                    >关注</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import {responseStatus} from '@/config' 
import axios from '@/utils/fetch'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            currentTag: 1,
            loading: true,
            searchTag: '',
            isLock: false,
            selfAttentionList: [],
            tagList: [],
            pageNum: 1, // 当前页数
            pageSize: 20, // 每页显示条目个数
            total: 0
        }
    },
    created(){
        this.findSelfAttention() 
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.bindScroll, false);    //取消绑定滚动事件
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods:{
        handleTagChange(tag){
            this.currentTag = tag
            if(tag===1){
                document.removeEventListener("scroll", this.bindScroll, false);    //取消绑定滚动事件
                this.findSelfAttention()
            }else{
                this.handleSearchTags()
                this.$nextTick(() => {
                    document.addEventListener("scroll", this.bindScroll, false);    //绑定滚动事件
                })
            }
        },
        // 查找个人关注
        findSelfAttention(){
            const {userId} = this.userInfo
            this.loading = true
            axios.post('/api/findSelfAttention', {
                userId
            }).then(res => {
                const {status} = res.data
                if(status === responseStatus){
                    this.loading = false
                    this.selfAttentionList = res.data.data
                }
            }).catch(err => {
                console.log('查找个人关注接口出现问题：' + err)
            })
        },


        SearchTagsByName(){
            this.pageNum = 1
            this.tagList = []
            this.isLock = false
            this.handleSearchTags()
        },
        async handleSearchTags(){
            try {
                const {searchTag, pageNum, pageSize}  = this
                const {userId} = this.userInfo
                this.loading = true
                const res = await axios.post('/api/searchTags', {
                    userId,
                    searchName: searchTag,
                    pageNum,
                    pageSize
                })
                if(res.data.status === responseStatus){
                    this.loading = false
                    if(!res.data.data.length){
                        this.isLock = true
                    }
                    this.tagList = [...this.tagList, ...res.data.data]
                }
            } catch (error) {
                console.log('查询标签出现问题：' + error)
            } 
        },
        // 点击关注的函数
        handleAttention(tagId){
            const {userId} = this.userInfo
            axios.post('/api/addAttention', {
                userId,
                tagId
            }).then(res => {
                const {status} = res.data
                if(status === responseStatus){
                    this.$message({
                        type: 'success',
                        message: '关注成功'
                    })
                    this.tagList = this.tagList.map(item => {
                        if(item.tagId === tagId){
                            return {...item, isFocus: true}
                        }
                        return item
                    })
                }
            }).catch(err => {
                console.log('关注接口出现问题：' + err)
            })
        },
        // 点击取消关注的函数
        handleNoAttention(tagId){
            const {userId} = this.userInfo
            axios.post('/api/cancelAttention', {
                userId,
                tagId
            }).then(res => {
                const {status} = res.data
                if(status === responseStatus){
                    this.$message({
                        type: 'success',
                        message: '取消关注成功'
                    })
                    this.tagList = this.tagList.map(item => {
                        if(item.tagId === tagId){
                            return {...item, isFocus: false}
                        }
                        return item
                    })
                }
                console.log(res)
            }).catch(err => {
                console.log('取消关注接口出现问题：' + err)
            })
        },
        bindScroll(){
            //真实内容的高度
            var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
            //视窗的高度
            var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
            //隐藏的高度
            var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if(this.loading || this.isLock){
                return;
            }
            if(pageHeight - viewportHeight - scrollHeight < 10){
                this.pageNum++
                this.handleSearchTags()
            }
        }
    }
};
</script>

<style lang="less" scoped>
@active: #007fff;
.outter{
    background: #fff;
    // min-height: 100%;
    .home {
        height: 3.833rem;
        margin-bottom: 2rem;
        .home_fixed {
            position: fixed;
            left: 0;
            top: 5rem;
            z-index: 4;
            width: 100%;
            height: 3.833rem;
            background: #fff;
            box-sizing: border-box;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            color: #909090;
            .taglist {
                max-width: 960px;
                height: 100%;
                margin: auto;
                .navlist {
                    height: 100%;
                    margin-left: -0.25rem;
                    li {
                        height: 100%;
                        padding: 0 2.5rem;
                        font-size: 1.16rem;
                        color: #71777c;
                        cursor: pointer;
                        position: relative;
                        
                    }
                    .active{
                        color: @active;
                        &:after{
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 2px;
                            background: @active;
                        }
                    }
                }
                .tagmanager {
                    font-size: 1.16rem;
                    color: #71777c;
                    cursor: pointer;
                    &:hover {
                        color: @active;
                    }
                }
            }
        }
    }
    .tag-container{
        max-width: 960px;
        margin: auto;
        box-sizing: border-box;
        .search-tag{
            width: 15rem;
            margin-bottom: 2.5rem;
        }
        .taglist{
            padding-bottom: 3rem;
            li{
                width: 25%;
                display: inline-block;
                margin-bottom: 1.3rem;
                padding: 0 .7rem;
                box-sizing: border-box;
                .tag{
                    border: 1px solid #f1f1f1;
                    transition: border-color .3s;
                    text-align: center;
                    padding: 1.5rem 0;
                    .tag-icon{
                        height: 32px;
                        margin: 1rem auto;
                    }
                    .title{
                        font-size: 1.5rem;
                        line-height: 2rem;
                        color: #333;
                    }
                    .all-data{
                        font-size: 1.1rem;
                        color: #909090;
                        .article{
                            margin-left: 0.8rem;
                        }
                    }
                    .is-watch{
                        background-color: #37c700;
                        color: #fff;
                        border: 1px solid #37c700;
                        margin: 1rem auto;
                        font-size: 1.1rem;
                        padding: .5rem 1.3rem;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                    .no-watch{
                        background-color: #fff;
                        color: #37c700;
                        border: 1px solid #37c700;
                        margin: 1rem auto;
                        font-size: 1.1rem;
                        padding: .5rem 1.3rem;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 750px){
    .outter .tag-container .search-tag{
        display: none;
    }
    .outter .tag-container .taglist li{
        width: 50%;
    }
}
</style>
