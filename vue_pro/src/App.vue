<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
    <mt-tabbar
      fixed
      value="1"
    >
      <mt-tab-item id="1">
        <img slot="icon" src="./assets/imgs/icon_list.png">
        列表
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="./assets/imgs/icon_new.png">
        新建
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="./assets/imgs/icon_mine.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "PingFangSC-Regular", "PingFang SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
  background: #fff;
}
</style>
