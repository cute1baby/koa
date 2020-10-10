<template>
    <div class="container df">
        <div class="left df1">
            <div class="user-info-block df">
                <img class="avatar" :src="userInfo.avatar" alt="">
                <div class="base-info df1 df dfdir">
                    <h4 class="name">{{userInfo.username}}</h4>
                    <ul class="desclist">
                        <li class="df dfaic">
                            <i class="iconfont">&#xe639;</i>{{userInfo.position || '-'}}
                        </li>
                        <li class="df dfaic">
                            <i class="iconfont">&#xe62c;</i>{{userInfo.selfIntroduction || '-'}}
                        </li>
                    </ul>
                </div>
                <div class="attach-info df dfdir dfjbw dfaie">
                    <div class="set-contact">
                        <i class="iconfont">&#xe608;</i>
                        <i class="iconfont">&#xe600;</i>
                        <i class="iconfont">&#xe759;</i>
                    </div>
                    <span 
                        class="edit-info df dfc"
                        @click="routerPath('/self-setting')"
                    >编辑个人资料</span>
                </div>
            </div>

            <!-- 左侧主体内容 -->
            <div class="main-content">
                <ul class="header-content df">
                    <li 
                        :class="currentTab===1?'df dfc active':'df dfc'"
                        @click="handleDynamic(1)"
                    >动态</li>
                    <li 
                        :class="currentTab===2?'df dfc active':'df dfc'"
                        @click="handleArticle(2)"
                    >文章</li>
                    <li 
                        :class="currentTab===3?'df dfc active':'df dfc'"
                        @click="handleLike(3)"
                    >点赞 17</li>
                    <li 
                        :class="currentTab===4?'df dfc active':'df dfc'"
                        @click="handleCollectClump(4)"
                    >收藏集</li>
                    <li 
                        :class="currentTab===5?'df dfc active':'df dfc'"
                        @click="handleAttention(5)"
                    >关注</li>
                </ul>
                <div class="list-body">

                    <!-- 空状态 -->
                    <NullBox />
                    <!-- <div class="empty-box df dfdir dfaic">
                        <i class="iconfont">&#xe631;</i>
                        <p class="empty-text">这里什么都没有</p>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="right">
            <div class="rightinner">
                <div class="stat-block">
                    <h3 class="block-title">个人成就</h3>
                    <div class="block-body">
                        <div class="stat-item df dfaic">
                            <i class="iconfont">&#xe60c;</i>
                            <span class="content">获得点赞 29</span>
                        </div>
                        <div class="stat-item df dfaic">
                            <i class="iconfont">&#xe67a;</i>
                            <span class="content">文章被阅读 29</span>
                        </div>
                        <div class="stat-item df dfaic">
                            <i class="iconfont">&#xe653;</i>
                            <span class="content">掘力值 29</span>
                        </div>
                    </div>
                </div>

                <div class="follow-block df">
                    <div class="follow-item df1">
                        <div class="item-title">关注了</div>
                        <div class="item-count">22</div>
                    </div>
                    <div class="follow-item df1">
                        <div class="item-title">关注者</div>
                        <div class="item-count">13</div>
                    </div>
                </div>

                <div class="more-block">
                    <div class="more-item df dfjbw">
                        <div class="item-title">收藏集</div>
                        <div class="item-count">18</div>
                    </div>
                    <div class="more-item df dfjbw"
                        @click="routerPath('/tagManage')"
                    >
                        <div class="item-title">关注标签</div>
                        <div class="item-count">{{userInfo.attentionLabels}}</div>
                    </div>
                    <div class="more-item df dfjbw" style="cursor: default;">
                        <div class="item-title">加入于</div>
                        <div class="item-count">{{joinTime}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import {mapState} from 'vuex'
import NullBox from '@/components/NullBox'
export default {
    data(){
        return {
            currentTab: 1
        }
    },
    computed:{
        ...mapState(['userInfo']),
        joinTime(){
            const timer = this.userInfo.createTime
            return moment(timer).format('YYYY-MM-DD')
        }
    },
    methods:{
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
        .user-info-block{
            padding: 2.5rem;
            background: #fff;
            .avatar{
                margin-right: 2.4rem;
                width: 7.5rem;
                height: 7.5rem;
                background-color: #f9f9f9;
                border-radius: 50%;
            }
            .base-info{
                .name{
                    font-size: 2.167rem;
                    font-weight: 600;
                    line-height: 1.2;
                    color: #000;
                }
                .desclist{
                    margin-top: 1rem;
                    li{
                        font-size: 1.25rem;
                        line-height: 1.5;
                        color: #72777b;
                        .iconfont{
                            font-size: 1.333333rem;
                            margin-right: .6rem;
                        }
                    }
                }
            }
            .attach-info{
                flex-basis: 9.834rem;
                width: 9.834rem;
                .set-contact{
                    margin-left: -1rem;
                    .iconfont{
                        font-size: 1.5rem;
                        color: #909090;
                        margin-left: 1rem;
                        // cursor: pointer;
                    }
                }
                .edit-info{
                    width: 100%;
                    height: 2.834rem;
                    font-size: 1.333rem;
                    color: #007fff;
                    font-weight: 500;
                    line-height: 1.2;
                    border: 1px solid #007fff;
                    background-color: #fff;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }

        .main-content{
            margin-top: 1rem;
            .header-content{
                height: 4.167rem;
                background-color: #fff;
                border-radius: .2rem .2rem 0 0;
                border-bottom: 1px solid #ebebeb;
                z-index: 100;
                li{
                    width: 7.5rem;
                    height: 100%;
                    font-size: 1.333rem;
                    color: #31445b;
                    font-weight: 500;
                    cursor: pointer;
                    position: relative;
                }
                .active{
                    color: #3780f7;
                    box-shadow: inset 0 -2px 0 #3780f7;
                    // &:after{
                    //     content: '';
                    //     position: absolute;
                    //     left: 0;
                    //     bottom: 0;
                    //     width: 100%;

                    // }
                }
            }

            .list-body{
                
            }
        }
    }
    .right{
        flex-basis: 20rem;
        margin-left: 2rem;
        .rightinner{
            position: fixed;
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
                        .iconfont{
                            font-size: 1.333333rem;
                        }
                        .content{
                            margin-left: 1.2rem;
                        }
                    }
                }
            }
            .follow-block{
                position: relative;
                margin-bottom: 1rem;
                background: #fff;
                .follow-item{
                    padding: 1.333rem 0;
                    text-align: center;
                    color: #31445b;
                    cursor: pointer;
                    .item-title{
                        font-size: 1.333rem;
                    }
                    .item-count{
                        margin-top: .5rem;
                        font-size: 1.25rem;
                    }
                }
                &:after{
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 1px;
                    height: 50%;
                    background-color: #f3f3f4;
                    transform: translate(-50%,-50%);
                }
            }

            .more-block{
                .more-item{
                    padding: 1.25rem .417rem;
                    font-size: 1.25rem;
                    color: #000;
                    cursor: pointer;
                    border-top: 1px solid rgba(230,230,231,.5);
                }
            }
        }
        
    }
}


</style>