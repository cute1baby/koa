<template>
    <div class="d_wrapper">
        <!-- <h1 class="title">{{typeTitle}}</h1> -->
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
                    <span class="tag tagv">{{tags[item.tag]}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// import axios from '@/utils/fetch'
import { tags } from '@/config/setting.js'
export default {
    data () {
        return {
          tags,
          artList: [
              {
                  id: 1,
                  title: '私有化的Easy Mock，更快更方便',
                  tag: 1,
                  desc: '前后端分离，解放双手，快速生成模拟数据的持久化服务',
                  address: 'http://62.234.192.179:7300/'
              },
              {
                  id: 2,
                  title: '图片批量生成，解放生产力',
                  tag: 1,
                  desc: '约定式图片模板，工具化生成。包含证书、宣传海报等等',
                  address: 'http://www.familyli.cn/imgGenerate/'
              }
          ],
          imgCover: require('@/assets/img/resource.jpg')
        }
    },
    methods: {
        goToPath(item){
            window.open(item.address)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.d_wrapper{
    .u_list{
        margin: 50px auto;
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
