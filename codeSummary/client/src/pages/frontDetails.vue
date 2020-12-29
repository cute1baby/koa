<template>
    <div class="d_wrapper">
        <h1 class="title">前端</h1>
        <ul class="u_list df">
            <li v-for="(item,index) in artList" :key="index">
                <div class="art_item df dfdir dfjbw">
                    <img src="" class="cover" alt="" />
                    <div class="art_details">
                        <span class="name">费雪</span>
                        <p class="details">一本关于如何投资的书</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from '@/utils/fetch'
export default {
    name: 'HelloWorld',
    data () {
        return {
            artList: [1,2,3,4]
        }
    },
    created(){
        this.initData()
    },
    methods: {
        initData(){
            const {pageNum, pageSize, articleName} = this
            this.loading = true
            axios.get('/qianduan/getArticleList', {
                params: {
                    pageNum, 
                    pageSize, 
                    articleName
                }
            }).then(res => {
                const {status, data} = res.data
                this.loading = false
                if(!status){
                    const {counts, list} = data
                    this.total = counts
                    this.tableData = list.map((item, index) => {
                        return {
                            index,
                            ...item
                        }
                    })
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
        li{
            flex-wrap: wrap;
            width: 25%;
            padding: 0 15px 30px;
            box-sizing: border-box;
            .art_item{
                padding: 25px 25px 20px;
                border-radius: 5px;
                border: 1px solid hsla(210,8%,51%,.09);
                background: #fff;
                .cover{
                    width: 100%;
                    display: block;
                }
                .art_details{
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
            }
        }
    }
    

}
</style>
