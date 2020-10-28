<template>
  <div id="app">
    我是其他页面
    <br>
    <router-link  to='/'>跳转到首页</router-link>
    <router-link to='/test'>跳转到测试页</router-link>
    <br>
    {{msg}}
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: '下面是组件'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
