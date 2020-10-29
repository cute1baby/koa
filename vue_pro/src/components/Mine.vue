<template>
  <div class="mine df dfc dfdir">
      <img src="../assets/imgs/user.jpg" alt="">
      当前功能暂未开放
      <div class="test">测试postcss-px2rem插件的功能</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'mint-ui';
export default {
  name: 'Mine',
  data () {
    return {
        
    }
  },
  created () {
  },
  computed:{
      ...mapState({
        userInfo: 'userInfo'
      })
  },

}
</script>

<style lang="scss" scoped>
.mine{
    font-size: 1.666667rem;
    color: #666;
    text-align: center;
    height: 100%;
    img{
        max-width: 50%;
        vertical-align: middle;
        margin-bottom: 1.333333rem;
    }
    .test{
        margin: 12px auto;
        font-size: 16px;
        color: rosybrown;
        width: 240px;
        height: 60px;
        border: 1px solid;
    }
}
</style>
