<template>
  <div id="app">
    <router-view/>
    <mt-tabbar
      fixed
      :value="currentId"
    >
      <mt-tab-item id="1" @click.native="toPath('/', '1')">
        <img slot="icon" src="./assets/imgs/icon_list.png">
        列表
      </mt-tab-item>
      <mt-tab-item id="2" @click.native="toPath('/new', '2')">
        <img slot="icon" src="./assets/imgs/icon_new.png">
        新建
      </mt-tab-item>
      <mt-tab-item id="3" @click.native="toPath('/mine', '3')">
        <img slot="icon" src="./assets/imgs/icon_mine.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Demo from './components/Demo'
export default {
  name: 'App',
  data(){
      return {
          currentId: '1'
      }
  },
  mounted() {
    
  },
  methods:{
      toPath(path, id){
          this.currentId = id
          this.$router.push(path)
      }
  },
  components:{
      Demo
  }
}
</script>

<style>
html,body{
    height: 100%;
}
#app {
  font-family: "PingFangSC-Regular", "PingFang SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
  background: #f6f6f6;
  height: 100%;

}
.mint-tab-item{
    color: #666;
}
#app .mint-tab-item.is-selected{
    color: #369219;
}
</style>
