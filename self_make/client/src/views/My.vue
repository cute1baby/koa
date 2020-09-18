<template>
    <div class="container df">
        <div class="left df1">

        </div>
        <div class="right">
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
                <div class="more-item df dfjbw">
                    <div class="item-title">关注标签</div>
                    <div class="item-count">5</div>
                </div>
                <div class="more-item df dfjbw">
                    <div class="item-title">加入于</div>
                    <div class="item-count">2016-08-11</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.container{
    margin-top: 1.767rem;
    max-width: 960px;
    // width: 960px;
    .left{

    }
    .right{
        flex-basis: 20rem;
        margin-left: 2rem;
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
</style>