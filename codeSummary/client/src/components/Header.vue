<template>
<div class="app-header">
    <div data-v-260b209e="" class="header-main df">
        <p class="header-logo df dfaic">
            <img 
                src="http://img.familyli.cn/avatar.png" 
                class="avatar" 
                @click="toHome"
            />
        </p>
        <ul class="header-nav df dfaic df1">
            <li :class="isClass(nav, currentPath)"
                v-for="nav in navList" :key="nav.id"
                @click="changeNav(nav)"
            >{{nav.name}}</li>
        </ul>
        <!-- pc端 -->
        <div class="header-search df dfaic">
            <input type="text" class="ipt-search" placeholder="输入关键词搜索" @keyup.enter="showSearch"/>
            <button class="btn-search" @click="showSearch">
                <i class="iconfont">&#xe66d;</i>
            </button>
        </div>
        <!-- 移动端 -->
        <div class="btn-search-phone df dfaic dfjend df1">
            <i class="iconfont" @click="showSearch">&#xe66d;</i>
        </div>
        <p class="concat df dfaic">联系我
            <img src="http://img.familyli.cn/myWechat.jpg" alt="" class="wechatImg" />
        </p>
    </div>
    <div class="df dfc bgMsg" v-if="isTips">
      <p class="message">{{tips}}</p>
    </div>
</div>
</template>
<script>
export default {
    props: ['currentPath'],
    data(){
        return {
          tips: '',
          isTips: false,
          navList: [
              {id: 1, name: '前端', isOpen: true, path: '/front', belongList:['/front', '/frontDetails']},
              // {id: 2, name: '产品', isOpen: false, path: '/production', belongList:['/production'] }
              {id: 2, name: '产品', isOpen: true, path: '/production', belongList:['/production']}
          ]
        }
    },
    created() {
        // console.log(this.$route)
    },
    methods: {
        isClass(nav, cPath){
            if(!nav.isOpen){
                return 'disabled'
            }else{
                return nav.belongList.includes(cPath)?'navActive' : ''
            }
        },
        changeNav(nav){
            const {path} = this.$route
            if(!nav.isOpen){
                return
            }
            if(path === nav.path){
                return
            }
            this.$emit('handlePathChange', nav.path)
            // this.currentPath = nav.path
            this.toPath(nav.path)
        },
        toHome(){
            const { path } = this.$route
            this.$emit('handlePathChange', '')
            // this.currentPath = ''
            if(path !== '/'){
                this.toPath('/')
            }
        },
        /**
         * 路由调整
         * @param path 路由地址
         */
        toPath(path) {
            this.$router.push(path);
        },
        sayMessage(msg, timer=2000){
          this.isTips = true
          this.tips = msg;
          setTimeout(() => {
            this.isTips = false
            this.tips = ''
          }, timer)
        },
        showSearch(){
          this.sayMessage('功能未开放，敬请期待');
        }
    },
}
</script>
<style lang="less" scoped>
.app-header{
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 18px rgba(0,0,0,.06);
    border-bottom: 1px solid hsla(210,8%,51%,.09);
    .header-main{
        height: 100%;
        margin: 0 auto;
        .header-logo{
            flex:0 0 200px;
            height: 100%;
            .avatar{
                width: 48px;
                height: 48px;
                vertical-align: middle;
                border-radius: 50%;
                cursor: pointer;
            }
        }
        .header-nav{
            li{
                line-height: 60px;
                font-size: 16px;
                color: #1F2D3D;
                padding: 0 18px;
                cursor: pointer;
                &:hover, &.navActive{
                    color: #50a1ff;
                }
            }
            .disabled{
                color: #ccc;
                cursor: default;
                &:hover{
                    color: #ccc;
                }
            }
        }
        .header-search{
            flex:0 0 360px;
            position: relative;
            margin-right: 30px;
            .ipt-search{
                width: 100%;
                height: 40px;
                font-size: 16px;
                color: #1F2D3D;
                display: block;
                border: 1px solid hsla(210,8%,51%,.09);
                padding: 5px 25px;
                border-radius: 40px;
                outline: none;
                box-sizing: border-box;
                background-color: transparent;
                transition: all .3s ease-out;
                &:focus{
                    border-color: #50a1ff;
                    box-shadow: 0 1px 5px rgba(80,161,255,.1);
                }
                &::-webkit-input-placeholder{color: #757575;}    /* 使用webkit内核的浏览器 */
                &:-moz-placeholder{color: #757575;}                  /* Firefox版本4-18 */
                &::-moz-placeholder{color: #757575;}                  /* Firefox版本19+ */
                &:-ms-input-placeholder{color: #757575;} 
            }
            .btn-search{
                position: absolute;
                right: 10px;
                top: 11px;
                padding: 0;
                font-size: 12px;
                width: 38px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                background: transparent;
                z-index: 2;
                border: none;
                outline: none;
                cursor: pointer;
                .iconfont{
                    font-size: 16px;
                    color: #1F2D3D;
                    &:hover{
                        color: #50a1ff;
                    }
                }
            }
        }
        .btn-search-phone{
            display: none;
        }
        .concat{
            font-size: 16px;
            color: #1F2D3D;
            cursor: pointer;
            position: relative;
            .wechatImg{
                display: none;
            }
            &:hover{
                color: #50a1ff;
                .wechatImg{
                    display: block;
                    position: absolute;
                    right: -20px;
                    bottom: -146px;
                    width: 140px;
                    height: 140px;
                    display: block;
                    z-index: 100;
                }
            }
        }
    }

    .bgMsg{
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      .message{
        font-size: 16px;
        color: #fff;
        padding: 6px 16px;
        background: rgba(0,0,0,.6);
        border-radius: 6px;

      }
    }
}

@media (min-width: 1500px){
    .app-header{
        .header-main{
            width: 1410px;
            min-width: 1410px;
        }
    }
}
@media (min-width: 1260px) and (max-width: 1500px){
    .app-header{
        .header-main{
            width: 1170px;
            min-width: 1170px;
            .header-logo{
                flex:0 0 140px;
            }
        }
    }
}
@media (min-width: 992px) and (max-width: 1260px){
    .app-header{
        .header-main{
            width: 962px;
            min-width: 962px;
            .header-logo{
                flex:0 0 100px;
            }
        }
    }
}
@media (min-width: 768px) and (max-width: 992px){
    .app-header{
        .header-main{
            width: 738px;
            min-width: 738px;
            .header-logo{
                flex:0 0 70px;
            }
        }
    }
}
@media (max-width: 768px){
    .app-header{
        .header-main{
            margin: 0 2rem;
            .header-logo{
                flex:0 0 70px;
            }
            .header-nav, .concat, .header-search{
                display: none;
            }
            .btn-search-phone{
                display: flex;
                .iconfont{
                    display: block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 2rem;
                    font-size: 1.8rem;
                    color: #757575;
                }
            }
        }
    }
}
</style>