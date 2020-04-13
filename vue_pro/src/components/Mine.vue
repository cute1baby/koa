<template>
  <div class="mine df dfc">
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
    font-size: 16px;
    color: #666;
    text-align: center;
    height: 100%;
}
</style>
