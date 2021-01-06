<template>
    <ul class="u_list df dfrw">
        <li v-for="(item,index) in artList" :key="index"
            @click="routerPath('/frontDetails', {
                typeId: item.typeId,
                typeTitle: item.title
            })"
        >
            <div class="art_item df dfc">
                {{item.title}}
                <span class="size">「{{item.artLens}}篇」</span>
            </div>
        </li>
    </ul>
</template>

<script>
import axios from '@/utils/fetch'
export default {
    data () {
        return {
            artList: [],
            imgCover: require('@/assets/img/resource.jpg')
        }
    },
    created(){
        this.initData()
    },
    methods: {
        initData(){
            axios.get('/qianduan/getTypeAndArtLens', {
                params: {
                    pageNum: 1, 
                    pageSize: 1000, 
                    typeName: ''
                }
            }).then(res => {
                const {status, data} = res.data
                if(!status){
                    const {counts, list} = data
                    this.total = counts
                    this.artList = list.filter(item => item.artLens > 0)
                }
            }).catch(err => {
                console.log('获取类型列表接口出现问题：' + err)
            })
        },
        routerPath(path, query){
            this.$router.push({path, query})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.u_list{
    margin: 30px auto;
    width: 1200px;
    max-width: 1200px;
    li{
        width: 25%;
        padding: 15px;
        box-sizing: border-box;     
        .art_item{
            padding: 20px;
            background: #fff;
            box-shadow: 5.994px 14.835px 30px 0 rgba(229,234,239,.5);
            transition: all .3s ease-in-out;
            font-size: 24px;
            font-size: bold;
            color: #3c4248;
            border-radius: 6px;
            cursor: pointer;
            .size{
                font-size: 16px;
                color: rgba(161,161,161);
            }
            &:hover{
                color: #50a1ff;
                transform: translate(1px, 1px);
                box-shadow: 0 0 8px rgba(0, 0 ,0, .2);
            }
        }
        
    }
}

@media (min-width: 992px) and (max-width: 1260px){
    .u_list{
        width: 992px;
        min-width: 992px;
        li{
            .art_item{
                font-size: 20px;
                padding: 18px;
            }
        }
    }
}
@media (min-width: 768px) and (max-width: 992px){
    .u_list{
        width: 768px;
        min-width: 768px;
        li{
            padding: 8px;
            .art_item{
                font-size: 18px;
                padding: 10px 6px;
                .size{
                    font-size: 14px;
                }
            }
        }
    }
}

@media (max-width: 768px){
    .u_list{
        width: 100%;
        max-width: 768px;
        li{
            width: 100%;
            padding: 10px;
            .art_item{
                font-size: 18px;
                padding: 16px 8px;
                .size{
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
