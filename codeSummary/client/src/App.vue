<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Header />
    <router-view/>
  </div>
</template>

<script>
const Header = () => import('@/components/Header')
export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style>
#app {
  font-family: Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* @media (max-width: 768px){
    .app-header .header-main{
        width: 738px;
        min-width: 738px;
    }
    
} */
</style>
