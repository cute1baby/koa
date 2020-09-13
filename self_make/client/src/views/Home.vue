<template>
<div>
    <div class="home">
        <div class="home_fixed">
            <div class="taglist df dfaic">
                <ul class="navlist df dfaic df1">
                    <li>
                        <span class="active">推荐</span>    
                    </li>
                    <li>
                        <span>关注</span>    
                    </li>
                </ul>
                <span class="tagmanager">标签管理</span>
            </div>
        </div>
    </div>

    <!-- 正文 -->
    <div class="container df dfjbw">
        <div class="left df1">
            <div class="navs df">
                <li><span class="active">热门</span></li>
                <li><span>最新</span></li>
                <li><span>热榜</span></li>
            </div>
            <div class="article_list">
                <div class="article df dfdir">
                    <p class="f_info">
                        <span class="name">3derff</span>
                        <span class="time">3derff</span>
                        <span class="tag">3derff</span>
                    </p>
                    <h4 class="title">iOS底层原理04：isa底层原理分析上</h4>
                    <div class="case df">
                        <p class="df dfc">
                            <span class="iconfont">&#xe616;</span>
                            <span class="nums">11</span>
                        </p>
                        <p class="df dfc">
                            <span class="iconfont">&#xe616;</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="billing df dfc">广告位</div>
            <div class="billing df dfc">广告位</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style lang="less" scoped>
@active: #007fff;

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
          margin-left: -1rem;
          li{
            padding: 0 1rem;
            span{
                font-size: 1.16rem;
                color: #71777c;
                cursor: pointer;
            }
            .active{
                color: @active;
            }
          }
          
      }
      .tagmanager{
        font-size: 1.16rem;
        color: #71777c;
        cursor: pointer;
        &:hover{
            color: @active;
        }
      }
    }
  }
}
.container{
    max-width: 960px;
    margin: auto;
    .left{
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        border-raiuds: 3px;
        .navs{
            padding: 1.3rem 1rem;
            border-bottom: 1px solid hsla(0,0%,59.2%,.1);
            li{
                font-size: 1.17rem;
                padding: 0 1.2rem;    
                border-right: 1px solid hsla(0,0%,59.2%,.2);
                span{
                    color: #909090;
                    cursor: pointer;
                }
                .active{
                    color: @active;
                }
                &:last-child{
                    border-right: none;
                }
            }
        }
        .article_list{
            .article{
                padding: 1.5rem 2rem;
                .f_info{
                    font-size: 1rem;
                    color: #b2bac2;
                    span{
                        position: relative;
                        &:after{
                            content: ' · ';
                        }
                        &:last-child:after{
                            content: '';
                        }
                    }
                }
                .title{
                    font-size: 1.4rem;
                    font-weight: 600;
                    // color: #909090;
                    color: #2e3135;
                    margin: .5rem 0 1rem;
                }
                .case{
                    border-left: 1px solid #edeeef;
                    p{
                        height: 2rem;
                        font-size: 1.083rem;
                        color: #b2bac2;
                        // color: #6cbd45;
                        vertical-align: middle;
                        padding: 0 .8rem;
                        border: 1px solid #edeeef;
                        border-left: none;
                        .nums{
                            margin-left: 3px;
                            vertical-align: middle;
                            line-height: 1;
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
    .right{
        flex-basis: 20rem;
        margin-left: 2rem;
        .billing{
            width: 100%;
            height: 200px;
            background: #999;
            font-size: 2rem;
            color: #fff;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
            border-radius: 2px;
            margin-bottom: 1.3rem;
        }
    }
}

@media screen and (max-width: 960px){
    .taglist{
        padding: 0 2rem;
    }
    .tagmanager{
        display: none;
    }
    .right{
        display: none;
    }
}
</style>
