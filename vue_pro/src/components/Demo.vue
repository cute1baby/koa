<template>
<!-- ul外层设置高度，出现无限滚动效果。而不会出现不操作无限触发的问题 --->
<div style="height: 500px;overflow-y: auto;">
    <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
    >
        <li 
            v-for="(item, index) in list" 
            :key="index"
        >{{ item }}</li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'Demo',
  data(){
      return {
          list: [1,2,3, 4,5, 6, 7,8 ,9, 10, 11, 12],
          loading: false
      }
  },
  methods:{
    loadMore() {
        this.loading = true;
        setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
            }
            this.loading = false;
        }, 2500);
    }
  }
}
</script>

<style scoped>

li{
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #ddd;
}
</style>