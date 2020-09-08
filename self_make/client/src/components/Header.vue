<template>
  <header
    class="main-header"
  >
    <div class="container df dfjbw">
        <div class="df1 df">
            <router-link to="/" class="imgLink df dfc">
                <img
                    src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/logo.a7995ad.svg"
                    alt="掘金"
                    class="logo-img"/>
            </router-link>
            <ul class="tabs df">
                <li class="df dfaic" v-for="tab in tabsList" :key="tab.id">
                    <router-link 
                        :class="Number(tab.id)===currentTab?'baseLink active':'baseLink'"
                        :to="tab.link">{{tab.name}}</router-link>
                </li>
            </ul>
        </div>
        <div class="df dfaic">
            <div class="searchForm">
                <input 
                    type="input" 
                    class="search_input" 
                    placeholder="搜索文字/标签/用户"    
                />
                <span class="search_btn">
                    <i class="iconfont">&#xe616;</i>
                </span>
            </div>
            <span class="w_article df dfaic">写文章</span>
            <!-- <i class="iconfont notice">&#xe704;</i> -->
            <button class="login">登录</button>
        </div>
    </div>
  </header>
</template>
<script>
export default {
    data(){
        return {
            tabsList: [
                {
                    id: 1,
                    name: '首页',
                    link: '/'
                },
                {
                    id: 2,
                    name: '沸点',
                    link: '/'
                },
                {
                    id: 3,
                    name: '话题',
                    link: '/'
                },
                {
                    id: 4,
                    name: '小册',
                    link: '/'
                },
                {
                    id: 5,
                    name: '活动',
                    link: '/'
                } 
            ],
            currentTab: 1
        }
    }
    
}
</script>
<style lang="less" scoped>
@base: #71777c;

.main-header{
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    color: #909090;
    height: 5rem;
    z-index: 250;
    .container{
        max-width: 960px;
        margin: auto;
        /**左半部分 */
        .imgLink{
            min-width: 98px;
            margin-right: 2rem;
            img{
                width: 100%;
                display: block;
            }
        }
        .tabs{
            li{
                padding: 0 1.5rem;
                height: 5rem;
                .baseLink{
                    font-size: 1.33rem;
                    color: @base;
                }
                .active{
                    color: #007fff;
                }
            }

        }
        /**右半部分 */
        .searchForm{
            border: 1px solid hsla(0,0%,59.2%,.2);
            background-color: rgba(227,231,236,.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 2px;
            margin-right: 1.2rem;
            .search_input{
                border: none;
                width: 11rem;
                padding: .6rem 0 .6rem 1rem;
                box-shadow: none;
                outline: none;
                font-size: 1.1rem;
                color: #666;
                box-sizing: border-box;
                background-color: transparent;
            }
            .search_btn{
                .iconfont{
                    padding: .5rem;
                    cursor: pointer;
                    font-size: 1.25rem;
                    color: @base;
                }
                
            }
        }
        .w_article{
            margin: 0 1.2rem;
            height: 2.666667rem;
            background-color: #007fff;
            border-radius: 3px;
            padding: 0 .9rem;
            font-size: 1.167rem;
            color: #fff;
            cursor: pointer;
        }
        .login{
            font-size: 1.333333rem;
            border: 1px solid #007fff;
            background-color: #fff;
            padding: .3rem 1.6rem;
            color: #007fff;
            line-height: 1.9rem;
            cursor: pointer;
            outline: 0;
        }
    }
    
}
</style>
