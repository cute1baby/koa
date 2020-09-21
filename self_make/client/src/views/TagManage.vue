<template>
  <div class="outter">
    <div class="home">
        <div class="home_fixed">
            <div class="taglist df dfaic">
            <ul class="navlist df dfaic df1">
                <li 
                    :class="currentTag===1?'df dfaic active':'df dfaic'"
                    @click="handleTagChange(1)"
                >已关注标签</li>
                <li 
                    :class="currentTag===2?'df dfaic active':'df dfaic'"
                    @click="handleTagChange(2)"
                >全部标签</li>
            </ul>
            </div>
        </div>
    </div>
    <!-- 正文 -->
    <div class="tag-container"> 
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
                    <span class="no-watch" v-if="true">关注</span>
                    <span class="is-watch" v-else>已关注</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import {responseStatus} from '@/config' 
import axios from '@/utils/fetch'
export default {
    data(){
        return {
            currentTag: 2,
            loading: false,
            searchTag: '',
            isLock: false,
            tagList: [],
            pageNum: 1, // 当前页数
            pageSize: 20, // 每页显示条目个数
            total: 0
        }
    },
    created(){
        this.handleSearchTags()
    },
    mounted() {
        this.monitorScroll()
    },
    methods:{
        handleTagChange(tag){
            this.currentTag = tag
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
                this.loading = true
                const res = await axios.get('/api/searchTags', {
                    params:{
                        searchName: searchTag,
                        pageNum,
                        pageSize
                    }
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
        monitorScroll(){
            const bindScroll = () => {
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

            document.addEventListener("scroll", bindScroll, false);    //绑定滚动事件
        }
    }
};
</script>

<style lang="less" scoped>
@active: #007fff;
.outter{
    background: #fff;
    min-height: 100%;
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
        }
        .taglist{
            margin-top: 2.5rem;
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
    .outter .tag-container .taglist li{
        width: 50%;
    }
}
</style>
