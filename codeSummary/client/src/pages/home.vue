<template>
    <div class="home">
        <div class="swiper-container"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide df dfaic" 
                  @click="routerPath(poster.jumpUrl)"
                  v-for="(poster, index) in posterList" 
                  :key="index">
                    <div class="bg-holder">
                        <img src="http://img.familyli.cn/shape-56.svg" class="shape1">
                        <img src="http://img.familyli.cn/shape-58.svg" class="shape2">
                        <img src="http://img.familyli.cn/shape-60.svg" class="shape3">
                        <img src="http://img.familyli.cn/shape-57.svg" class="shape4">
                        <img src="http://img.familyli.cn/shape-10.svg" class="shape5">
                        <img src="http://img.familyli.cn/shape-56.svg" class="shape6">
                    </div>
                    <div class="pos">
                        <h3 class="title">{{poster.title}}</h3>
                        <p class="desc">{{poster.desc}}</p>
                    </div>
                    <img class="cover" 
                        :src="poster.imgAddr" alt=""
                    >
                </div>
            </div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev" v-if="posterList.length > 1"></div>
            <div class="swiper-button-next" v-if="posterList.length > 1"></div>
            <div class="swiper-pagination" v-if="posterList.length > 1"></div>
        </div>
        <ul class="mode">
            <li class="df dfc" @click="routerPath('/front')">
                <i class="iconfont">&#xe61c;</i>
                <span>前端整理</span>
            </li>
            <!-- disabled -->
            <li class="df dfc" @click="routerPath('/production')">
                <i class="iconfont">&#xe6ab;</i>
                <span>我的产品</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
        posterList: [
            {
                title: '干净、整洁，无广告',
                desc: '打造最干净、整洁和极简化的前端学习网站。对自己前端知识进行归纳和整合，也为他人创造价值。',
                imgAddr: 'http://img.familyli.cn/line.png',
                jumpUrl: '/front'
            },
            {
                title: '日复一日，做专业的事',
                desc: '接受不完美的自己，接纳残缺，始终一个方向；时间的复利，会告诉自己纯粹的专注是件多么棒的事',
                imgAddr: 'http://img.familyli.cn/type.png',
                jumpUrl: '/production'
            }
        ],
        swiper: {}
    }
  },
  mounted(){
    this.$nextTick(() => {
        this.initSwiper()
    })
  },
  methods: {
    initSwiper() {
        const that = this
        this.swiper = new Swiper('.swiper-container', {
            spaceBetween: 20,
            loop: true,
            autoplay: 5000,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            pagination: '.swiper-pagination',
        })
    },
    routerPath(path, query){
        this.$router.push({path, query})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home{
    margin: 32px auto;
    .swiper-container{
        height: 400px;
        box-shadow: 0 0 7px hsla(210,8%,51%,.2);
        cursor: pointer;
        .swiper-slide{
            position: relative;
            z-index: 5;
            .bg-holder{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                overflow: hidden;
                z-index: 1;
                img{
                    position: absolute;
                    &.shape1{
                        opacity: 0.6;
                        animation: framesShape1 24s linear infinite alternate
                    }
                    &.shape2{
                        opacity: 0.8;
                        animation: framesShape2 20s linear infinite alternate
                    }
                    &.shape3{
                        opacity: 0.4;
                        animation: framesShape3 17s linear infinite alternate
                    }
                    &.shape4{
                        opacity: 0.5;
                        animation: framesShape4 50s linear infinite alternate
                    }
                    &.shape5{
                        opacity: 0.4;
                        animation: framesShape5 24s linear infinite alternate
                    }
                    &.shape6{
                        opacity: 0.6;
                        animation: framesShape6 20s linear infinite alternate
                    }
                }
            }
            .pos{
                position: relative;
                z-index: 20;
                width: 560px;
                padding-left: 110px;
                box-sizing: border-box;
                .title{
                    font-size: 34px;
                    color: #3c4248;
                    margin-bottom: 12px;
                }
                .desc{
                    font-size: 18px;
                    color: #979b9e;
                    opacity: 0.7;
                    line-height: 2;
                    margin-bottom: 18px;
                }
            }
            .cover{
                position: absolute;
                right: 100px;
                top: 10px;
                bottom: 20px;
                z-index: 10;
                width: 500px;
                display: block;
            }
        }
        .swiper-button-prev{
            left: 20px;
        }
        .swiper-button-next{
            right: 20px;
        }
        .swiper-button-prev, .swiper-button-next{
            width: 18px;
            height: 30px;
            margin-top: -15px;
            background-size: 18px 30px;
        }
    }
    .mode{
        margin: 32px -15px 0px;
        display: flex;
        li{
            flex: 1;
            height: 80px;
            margin: 0 15px;
            font-size: 18px;
            color: #fff;
            border-radius: 6px;
            vertical-align: middle;
            transition: all 0.1s;
            cursor: pointer;
            .iconfont{
                font-size: 26px;
                vertical-align: middle;
                margin-right: 10px;
            }
            &:nth-child(1){
                background-image:linear-gradient(45deg,#7fe496,#6edf8f);
            }
            &:nth-child(2){
                background-image:linear-gradient(45deg,#a682e4,#c1a7e9);
            }
            &:hover{
                transform: rotate(1deg) skewX(1deg) scale(1.02);
            }
            &.disabled{
                background-image: linear-gradient(45deg, #ccc, #ddd);
                transition: none;
                cursor: no-drop;
                &:hover{
                    transform: none;
                }
            }
        }
        
    }
}
@keyframes framesShape1 {
    0% {
        left: 35%;
        bottom: 20%;
        transform: rotate(0deg);
    }
    100% {
        left: 10%;
        bottom: -10%;
        transform: rotate(90deg);
    }
}
@keyframes framesShape2 {
    0% {
        bottom: 10%;
        right: 50%;
    }
    100% {
        bottom: 30%;
        right: -10%;
    }
}
@keyframes framesShape3 {
    0% {
        bottom: 5%;
        left: -4%;
    }
    100% {
        bottom: 32%;
        left: 30%;
    }
}
@keyframes framesShape4 {
    0% {
        top: 5%;
        left: -4%;
        transform: rotate(160deg);
    }
    50% {
        top: 54%;
        left: 60%;
        transform: rotate(80deg);
    }
    100% {
        top: 20%;
        left: 110%;
        transform: rotate(-60deg);
    }
}
@keyframes framesShape5 {
    0% {
        bottom: 35%;
        left: 30%;
        transform: rotate(0deg);
    }
    100% {
        bottom: -20%;
        left: 10%;
        transform: rotate(160deg);
    }
}
@keyframes framesShape6 {
    0% {
        top: 35%;
        left: -4%;
        transform: rotate(0deg);
    }
    100% {
        top: 20%;
        left: 20%;
        transform: rotate(-220deg);
    }
}
@media (min-width: 1500px){
    .home{
        width: 1440px;
        min-width: 1440px;
    }
}
@media (min-width: 1260px) and (max-width: 1500px){
    .home{
        width: 1170px;
        min-width: 1170px;
    }
}
@media (min-width: 992px) and (max-width: 1260px){
    .home{
        width: 962px;
        min-width: 962px;
        .swiper-container{
            .swiper-slide{
                .pos{
                    width: 440px;
                    padding-left: 70px;
                }
                .cover{
                    right: 70px;
                    top: 50px;
                    width: 440px;
                }
            }
        }
    }
}
@media (min-width: 768px) and (max-width: 992px){
    .home{
        width: 738px;
        min-width: 738px;
        .swiper-container{
            .swiper-slide{
                .pos{
                    width: 100%;
                    padding: 0 80px;
                    .desc{
                        color: #2f2f2f;
                    }
                }
                .cover{
                    right: 50%;
                    top: 50px;
                    width: 440px;
                    transform: translateX(50%);
                    opacity: 0.1;
                }
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
    .home{
        .swiper-container{
            .swiper-slide{
                .pos{
                    width: 100%;
                    padding: 0 50px;
                    .desc{
                        color: #2f2f2f;
                    }
                }
                .cover{
                    right: 50%;
                    top: 50px;
                    width: 90%;
                    transform: translateX(50%);
                    opacity: 0.1;
                    cursor: pointer;
                }
            }
            .swiper-button-prev, .swiper-button-next{
                display: none !important;
            }
        }
        .mode{
            flex-wrap: wrap;
            margin: 24px 0 -24px 0;
            padding: 0 32px;
            li{
                flex: 0 0 100%;
                margin: 0 0 24px 0;
            }
        }
    }
}
</style>
