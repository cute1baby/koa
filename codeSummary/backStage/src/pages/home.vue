<template>
    <div class="home df">
        <Slider 
            :initialPath="initialPath"
        />
        <div class="container df1 df dfdir">
            <Header />
            <div class="con df1">
                <router-view />
            </div>
        </div>
        
    </div>
</template>

<script>
const Header = () => import('@/components/Header')
const Slider = () => import("@/components/Slider")
import axios from '@/utils/fetch'
import {hostAddress} from '@/config/index.js'
const ERR_OK = 200;
export default {
    name: 'Login',
    data(){
        return {
            initialPath: ''
        }
    },
    watch: {
        $route(val){
            this.initialPath = val.path
        }
    },
    created(){
        const initialPath = this.$route.path
        this.initialPath = initialPath
    },
    methods:{

    },
    components: {
        Header,
        Slider
    }
}
</script>

<style lang="less" scoped>
.home{
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
}
.container{
    .con{
        width: 100%;
        padding: 26px 46px 50px 30px;
        background: #ECF0F5;
        box-sizing: border-box;
        overflow-y: auto;
    }
}

</style>