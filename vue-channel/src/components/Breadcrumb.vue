<template>
    <el-breadcrumb 
        class="code_breadcrumb"
        separator-class="el-icon-arrow-right" 
        v-if="query.name"
    >
        <el-breadcrumb-item 
            v-for="(r,i) in backRoutes"
            :key="i"
            :to="updateparams(r)"
        >{{r.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{selfRoute.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    props: ['backRoutes', 'selfRoute'],
    data(){
        return {
            param: {}
        }
    },
    created(){
        const query = this.$route.query
        this.query = query

    },
    methods:{
        updateparams(item){
            return item.name.includes('首页') ? {path: item.path} : {path: item.path, query: {name: item.name}}
        }
    }
}
</script>

<style lang="scss" scoped>
.code_breadcrumb{
    margin-top: 20px;
    & >>> .el-breadcrumb__inner{
        font-size: 15px;
        color: #666;
        &.is-link{
            font-weight: normal;
            &:hover{
                color: #03578e;
            }
            
        }
    }
}
</style>