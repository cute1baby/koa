<template>
    <div class="home">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(posterCover, index) in posterList" :key="index">
                    <img class="cover" 
                        :src="posterCover" alt="" 
                    >
                    <!-- <img class="cover" 
                        :src="posterCover" alt=""
                    > -->
                </div>
            </div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev" v-if="posterList.length > 1"></div>
            <div class="swiper-button-next" v-if="posterList.length > 1"></div>
            <div class="swiper-pagination" v-if="posterList.length > 1"></div>
        </div>
        
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
        posterList: [
            'https://sslfile.ichazuo.cn/f40dacf6-45dc-11eb-9dd8-00163e0ec5ae.png',
            'https://sslfile.ichazuo.cn/f3cbff22-45dc-11eb-9dd8-00163e0ec5ae.png',
            'https://sslfile.ichazuo.cn/f3ac382c-45dc-11eb-9dd8-00163e0ec5ae.png'
        ],
        swiper: {}
    }
  },
  created(){
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
            slidesPerView: "auto",
            centeredSlides: true,
            observer: true,
            observeParents: true,

            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            pagination: '.swiper-pagination',
            onInit: function(swiper) {
                // 初始化自动跳转到指定的页面
                swiper.slideTo(0)
            },
            onSlideChangeStart: function(swiper) {
                const activeIndex = swiper.activeIndex
                console.log('>>>>activeIndex', activeIndex)
            }
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home{
    .swiper-container{
        margin: 30px auto 0;
        height: 400px;
        box-shadow: 0 0 7px hsla(210,8%,51%,.2);
    }
}
@media (min-width: 1500px){
    .home{
        .swiper-container{
            width: 1440px;
            min-width: 1440px;
        }
    }
}
@media (min-width: 1260px) and (max-width: 1500px){
    .home{
        .swiper-container{
            width: 1170px;
            min-width: 1170px;
        }
    }
}
@media (min-width: 992px) and (max-width: 1260px){
    .home{
        .swiper-container{
            width: 962px;
            min-width: 962px;
        }
    }
}
@media (min-width: 768px) and (max-width: 992px){
    .home{
        .swiper-container{
            width: 738px;
            min-width: 738px;
        }
    }
}
// @media (max-width: 768px){
//     .app-header{
//         .header-main{
//             margin: 0 2rem;
//             .header-logo{
//                 flex:0 0 70px;
//             }
//             .header-nav, .concat, .header-search{
//                 display: none;
//             }
//             .btn-search-phone{
//                 display: flex;
//                 .iconfont{
//                     display: block;
//                     height: 40px;
//                     line-height: 40px;
//                     padding: 0 2rem;
//                     font-size: 1.8rem;
//                     color: #757575;
//                 }
//             }
//         }
//     }
// }
</style>
