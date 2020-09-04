<template>
    <div class="container">
        <h3 class="title">{{title}}</h3>
        <span class="desc">{{desc}}</span>
        <hr>
        下面看是否能获取一些全局的字段：
        <!-- <ul>
            <li>{{$site}}</li>
            <li>{{$page}}</li>
            <li>{{$route}}</li>
            <li>{{$router}}</li>
        </ul> -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            title: `这是我新引入的全局组件<v-list>，然后看引入到页面中是否生效`,
            desc: `这是一段描述...`
        }
    },
    created(){
        console.log('准备在js中获取全局的一些字段')
        console.log(this.$site, this.$router)
    }
}
</script>
<style lang="less">
.container{
    .title{
        font-size: 18px;
        color: #282c34;
    }
    .desc{
        font-size: 14px;
        color: #ffe6e6;
    }
}

</style>