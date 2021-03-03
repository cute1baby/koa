<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Header :currentPath="currentPath" @handlePathChange="handlePathChange"/>
    <div class="appCon">
        <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
const Header = () => import('@/components/Header')
const Footer = () => import('@/components/Footer')
export default {
    name: 'App',
    data(){
        return {
            currentPath: ''
        }
    },
    watch: {
        $route(to, from) {
            this.currentPath = to.path
        }
    },
    created(){
        const {path} = this.$route
        this.currentPath = path
    },
    methods: {
        handlePathChange(path){
            this.currentPath = path;
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f8fafc;
}
#app {
    width: 100%;
    height: 100%;
    font-family: Dosis,Open Sans,pingfang SC,helvetica neue,arial,hiragino sans gb,microsoft yahei ui,microsoft yahei,simsun,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.appCon{
    padding-bottom: 80px;
    width: 100%;
}
/* @media (max-width: 768px){
    .app-header .header-main{
        width: 738px;
        min-width: 738px;
    }
    
} */
</style>
