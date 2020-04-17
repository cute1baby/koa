<template>
  <div class="mine df dfc dfdir">
      <img src="../assets/imgs/user.jpg" alt="">
      当前功能暂未开放
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
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
}
</style>
