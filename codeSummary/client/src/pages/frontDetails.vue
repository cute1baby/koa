<template>
    <div class="d_wrapper">
        <h1 class="title">{{typeTitle}}</h1>
        <ul class="u_list df">
            <li v-for="(item,index) in artList" :key="index"
                @click="goToPath(item)"
            >
                <div class="art_item df dfdir dfjbw">
                    <img :src="imgCover" class="cover" alt="" />
                    <div class="art_details df dfjbw dfdir">
                        <span class="name ellipsis2">{{item.title}}</span>
                        <p class="details ellipsis2">{{item.desc}}</p>
                    </div>
                    <span class="tag tagv" v-if="Number(item.linkType)===1">视频</span>
                    <span class="tag tagw" v-else>文章</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from '@/utils/fetch'
export default {
    data () {
        return {
            artList: [],
            typeTitle: '',
            imgCover: require('@/assets/img/resource.jpg')
        }
    },
    created(){
        const {typeId, typeTitle} = this.$route.query
        this.typeTitle = typeTitle
        this.initData(typeId)
    },
    methods: {
        goToPath(item){
            window.open(item.address)
        },
        initData(typeId){
            axios.get('/qianduan/findArticleByParams', {
                params: {
                    typeId
                }
            }).then(res => {
                const {status, data} = res.data
                if(!status){
                    this.artList = data
                }
            }).catch(err => {
                console.log('获取类型列表接口出现问题：' + err)
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.d_wrapper{
    .title{
        font-size: 60px;
        color: #3c4248;
        text-align: center;
        padding: 60px 0;
    }
    .u_list{
        margin: 0 auto;
        width: 1200px;
        max-width: 1200px;
        flex-wrap: wrap;
        li{
            width: 25%;
            padding: 0 15px 30px;
            box-sizing: border-box;
            .art_item{
                border-radius: 5px;
                border: 1px solid hsla(210,8%,51%,.09);
                background: #fff;
                transition: all 0.3s;
                cursor: pointer;
                position: relative;
                z-index: 1;
                .cover{
                    width: 100%;
                    display: block;
                }
                .art_details{
                    padding: 12px 14px 20px;
                    height: 106px;
                    .name{
                        font-size: 20px;
                        font-weight: bold;
                        color: #3c4248;
                        line-height: 1.6;
                        margin-bottom: 6px;
                    }
                    .details{
                        font-size: 15px;
                        color: #979b9e;
                        opacity: 0.7;
                    }
                }
                .tag{
                    font-size: 14px;
                    padding: 2px 8px;
                    border-radius: 4px;
                    color: #fff;
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 5;
                }
                .tagv{
                    background: #a268ce;
                }
                .tagw{
                    background: #32a08c;
                }
                &:hover{
                    transform: translateY(-5px);
                    box-shadow: 0 4px 8px rgba(84,81,81,.15);
                    z-index: 1;
                }
            }
        }
    }
}

@media (min-width: 992px) and (max-width: 1260px){
.d_wrapper{
    .u_list{
        width: 992px;
        min-width: 992px;
        li{
            .art_item{
                .art_details{
                    .name{
                        font-size: 18px;
                    }
                    .details{
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
}
@media (min-width: 768px) and (max-width: 992px){
.d_wrapper{
    .u_list{
        width: 768px;
        min-width: 768px;
        li{
            .art_item{
                .art_details{
                    padding: 8px 10px 16px;
                    height: 96px;
                    .name{
                        font-size: 16px;
                    }
                    .details{
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
}

@media (max-width: 768px){
.d_wrapper{
    .u_list{
        width: 100%;
        max-width: 768px;
        li{
            width: 50%;
            .art_item{
                .art_details{
                    padding: 8px 10px;
                    height: 90px;
                    .name{
                        font-size: 16px;
                    }
                    .details{
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
}
</style>
