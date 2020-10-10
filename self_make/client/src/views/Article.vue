<template>
    <div class="container df">
        <div class="left df1">
            <div class="article-area df dfjbw dfaic" v-if="articleInfo.user">
                <div class="df df1">
                    <img src="http://img.familyli.cn/juejin_defdault.png" alt="" class="avatar">
                    <div class="df dfdir dfjbw">
                        <span class="username">{{articleInfo.user.username}}</span>
                        <div class="desc">
                            <span class="createtime">{{formatTime(articleInfo.createTime)}}</span>
                            阅读<span class="readnum">433</span>
                        </div>
                    </div>
                </div>
                <span class="attention df dfc">关注</span>
            </div>
            <h3 class="article-title">{{articleInfo.title}}</h3>
            <div v-if="articleInfo.content">
                <pre class="art-content" v-html="articleInfo.content"></pre>
            </div>
            <!-- 更多标签 -->
            <div class="tag-list-title">
                <p>关注下面的标签，发现更多相似文章</p>
                <span class="v-tag df dfc" v-if="articleInfo.tagInfo">
                    <img :src="articleInfo.tagInfo.tagIcon" alt="" />
                    <span class="name">{{articleInfo.tagInfo.title}}</span>
                </span>
            </div>
        </div>
        <div class="right">
            <div class="rightinner">
                <div class="stat-block">
                    <h3 class="block-title">关于作者</h3>
                    <div class="block-body">
                        <div class="stat-item df" v-if="articleInfo.user">
                            <img class="avatar" src="http://img.familyli.cn/juejin_defdault.png" alt="">
                            <p class="df dfdir dfjbw">
                                <span class="name">{{articleInfo.user.username}}</span>
                                <span class="position">{{articleInfo.user.position || '-'}}</span>
                            </p>
                        </div>
                        <div class="stat-item df dfaic">
                            <i class="iconfont">&#xe60c;</i>
                            <span class="content">获得点赞 29</span>
                        </div>
                        <div class="stat-item df dfaic">
                            <i class="iconfont">&#xe67a;</i>
                            <span class="content">文章被阅读 29</span>
                        </div>
                    </div>
                </div>

                <div class="stat-block" 
                    v-if="articleInfo.articleList && articleInfo.articleList.length">
                    <h3 class="block-title">相关文章</h3>
                    <div class="block-body">
                        <div class="stat-item df article-hover" 
                            v-for="article in articleInfo.articleList"
                            :key="article.articleId"
                        >
                            <h3 class="title">{{article.title}}</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import axios from '@/utils/fetch'
import {responseStatus} from '@/config' 
import moment from 'moment'
import {mapState} from 'vuex'
import NullBox from '@/components/NullBox'
export default {
    data(){
        return {
            currentTab: 1,
            articleInfo: {}
        }
    },
    created() {
        const {id} = this.$route.params
        this.articleId = id
        this.findArticleList()
        console.log(id)
    },
    computed:{
        ...mapState(['userInfo']),
        joinTime(){
            const timer = this.userInfo.createTime
            return moment(timer).format('YYYY-MM-DD')
        }
    },
    methods:{
        formatTime(date){
            return moment(date).format('YYYY-MM-DD')
        },
        findArticleList(){
            const {articleId} = this
            axios.post('/api/findArticleDetails', {
                articleId
            }).then(res => {
                const {status} = res.data
                if(status === responseStatus){
                    this.articleInfo = res.data.data
                }
            }).catch(err => {
                console.log('查找接口详情接口出现问题：' + err)
            })
        },
        // 路由跳转
        routerPath(path, query){
            this.$router.push({path, query})
        },
        // tab切换
        handleTab(tab){
            this.currentTab = tab
        },
        // 获取动态信息
        handleDynamic(tab){
            this.handleTab(tab)
        },
        // 获取文章信息
        handleArticle(tab){
            this.handleTab(tab)
        },
        // 获取点赞信息
        handleLike(tab){
            this.handleTab(tab)
        },
        // 获取收藏集信息
        handleCollectClump(tab){
            this.handleTab(tab)
        },
        // 获取关注信息
        handleAttention(tab){
            this.handleTab(tab)
        },
    },
    components: {
        NullBox
    }
}
</script>
<style lang="less" scoped>
.container{
    margin: 1.767rem auto;
    // height: 100%;
    max-width: 960px;
    // width: 960px;
    .left{
        padding: 2rem;
        margin-bottom: 3rem;
        background: #fff;
        .article-area{
            // margin-bottom: 1.5rem;
            .avatar{
                width: 3.333rem;
                height: 3.333rem;
                margin-right: 1rem;
                border-radius: 50%;
                background: #ccc;
            }
            .username{
                font-size: 1.3rem;
                color: #333;
            }
            .desc{
                font-size: 1.1rem;
                color: #909090;
                .createtime{
                    margin-right: 0.5rem;
                }
                .readnum{
                    margin-left: 0.5rem;
                }
            }
            .attention{
                width: 55px;
                height: 26px;
                font-size: 13px;
                border: 1px solid #6cbd45;
                color: #6cbd45;
                background-color: #fff;
                cursor: pointer;
                &:hover{
                    opacity: .8;
                }
            }
        }
        .article-title{
            margin: .67em 0;
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1.5;
        }
        .art-content{
            word-break: break-word;
            line-height: 1.5;
            font-weight: 400;
            font-size: 15px;
            /deep/ img{
                max-width: 100%;
                display: block;
            }
        }
        .tag-list-title{
            margin: 3rem 0 2rem;
            p{
                margin-bottom: 2rem;
                padding-left: 2rem;
                font-size: 1.25rem;
                font-weight: 600;
                color: #000;
                border-left: 6px solid #ddd;
            }
            .v-tag{
                width: 78px;
                box-sizing: border-box;
                padding: .167rem;
                background-color: #fff;
                border: 1px solid #e3e3e3;
                border-radius: 2px;
                img{
                    width: 1.75rem;
                    height: 1.75rem;
                    border-radius: 2px;
                }
                .name{
                    padding: 0 .75rem;
                    font-size: 1rem;
                    line-height: 1.75rem;
                    color: #919191;
                }
            }
        }
    }
    .right{
        flex-basis: 20rem;
        margin-left: 2rem;
        .rightinner{
            // position: fixed;
            width: 20rem;
            .stat-block{
                background: #fff;
                margin-bottom: 1rem;
                .block-title{
                    padding: 1.333rem;
                    font-size: 1.333rem;
                    font-weight: 600;
                    color: #31445b;
                    border-bottom: 1px solid rgba(230,230,231,.5);
                }
                .block-body{
                    padding: 1.333rem;
                    .stat-item{
                        margin-bottom: .8rem;
                        font-size: 1.25rem;
                        color: #000;
                        .title{
                            font-size: 1.16rem;
                            color: #333;
                            padding: 1rem 0;
                        }
                        .avatar{
                            margin-right: 1rem;
                            width: 4.167rem;
                            height: 4.167rem;
                            border-radius: 50%;
                        }
                        .position{
                            font-size: 1.25rem;
                            color: #72777b;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .name{
                            font-size: 1.333rem;
                            font-weight: 600;
                            color: #000;
                        }
                        .iconfont{
                            font-size: 1.5rem;
                            color: #7BB9FF;
                        }
                        .content{
                            margin-left: 0.8rem;
                        }
                    
                    }
                    .article-hover{
                        margin-bottom: 0;
                        &:hover{
                            background-color: hsla(0,0%,85.1%,.1);
                        }        
                    }
                }
            }

        }
        
    }
}


</style>