<template>
  <header
    class="main-header"
  >
    <div class="head_fixed">
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
            <div class="df dfaic h_right">
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
                <span 
                    class="w_article df dfaic"   
                >写文章</span>
                <!-- <i class="iconfont notice">&#xe704;</i> -->
                <img v-if="userInfo.userId"
                    class="avatar" 
                    :src="userInfo.avatar" 
                    alt=""
                    @click="handleMenu"    
                >
                <button 
                    v-else
                    class="login"
                    @click="isLogin=true"
                >登录</button>

                <ul class="menulist"
                    v-if="isShowMenu">
                    <li class="df" @click="handleArticle">
                        <i class="iconfont">&#xe652;</i>写文章
                    </li>
                    <li class="df" @click="handleMyPage">
                        <i class="iconfont">&#xe607;</i>我的主页
                    </li>
                    <li class="df" @click="signOut">
                        <i class="iconfont">&#xe682;</i>登出
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <Login 
        :visible="isLogin"
        @closeModal="closeModal"
    />   

  </header>
</template>
<script>
import {mapState} from 'vuex'
import Login from '@/components/Login'
export default {
    data(){
        return {
            isLogin: false,
            isShowMenu: false,
            tabsList: [
                {
                    id: 1,
                    name: '首页',
                    link: '/'
                }
            ],
            currentTab: 1
        }
    },
    created() {
        document.addEventListener('click', (e) => {
            const user_avatar = this.$refs.user_avatar
            const parentNode = e.target.parentNode ? e.target.parentNode.className=== 'menulist' : false
            if(e.target.className=== 'menulist' || parentNode){
                return;
            }
            if(this.isShowMenu && e.target.className!== 'avatar'){
                this.isShowMenu = !this.isShowMenu
            }
        }, false)
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods:{
        closeModal(){
            this.isLogin = false
        },
        /**控制我的菜单显示隐藏状态 */
        handleMenu(){
            this.isShowMenu = !this.isShowMenu
        },
        // 写文章
        handleArticle(){
            this.isShowMenu=false
            console.log('跳转到写文章页面')
        },
        // 进入我的主页
        handleMyPage(){
            this.isShowMenu=false
            this.routerPath('/my')
            console.log('进入我的主页')
        },
        // 登出
        signOut(){
            this.isShowMenu=false
            console.log('登出')
        },
        routerPath(path, query){
            this.$router.push({path, query})
        }
    },
    components: {
        Login
    }
}
</script>
<style lang="less" scoped>
@base: #71777c;

.main-header{
    height: 5rem;
    .head_fixed{
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5;
        width: 100%;
        height: 5rem;
        color: #909090;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
        .container{
            max-width: 960px;
            margin: auto;
            box-sizing: border-box;
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
            .h_right{
                position: relative;
                z-index: 10;
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
                            user-select: none;
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
                .avatar{
                    width: 2.5rem;
                    height: 2.5rem;
                    vertical-align: middle;
                    border-radius: 50%;
                    background: #999;
                    cursor: pointer;
                    &[src=''] {
                        opacity: 0;
                    }
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
                .menulist{
                    position: absolute;
                    bottom: -10.5rem;
                    right: 0;
                    width: 13.1rem;
                    background-color: #fff;
                    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
                    border: 1px solid rgba(177,180,185,.45);
                    border-radius: 4px;
                    font-size: 1.2rem;
                    padding: 1rem 0;
                    li{
                        padding: .5rem 1rem;
                        font-size: 1.3rem;
                        color: #71777c;
                        cursor: pointer;
                        vertical-align: middle;
                        display: inline-block;
                        width: 100%;
                        box-sizing: border-box;
                        .iconfont{
                            margin-right: .8rem;
                            vertical-align: middle;
                            color: #b2bac2;
                        }
                        &:hover{
                            background: #ECF0F5;
                        }
                    }
                }
            }
            
        }
    }
}

@media screen and (max-width: 960px){
    .container{
        padding: 0 1.5rem;
    }
}
</style>
