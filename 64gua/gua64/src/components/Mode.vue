<template>
<div class="mode">
  <h4 class="title">乾卦</h4>
  <ul class="box">
    <li v-for="v in items" class="pic">
      <span v-if="String(v)==='1'" class="f"></span>
      <p v-if="String(v)==='2'" class="t df">
        <span v-for="s in 2" class="df1"></span>
      </p>
    </li>
  </ul>
  <p class="name">乾为坤</p>
</div>
</template>

<script>
export default {
  name: 'Mode',
  data () {
    return {
      items: [1,1,2,1,2,1]
    }
  },
  methods: {
    showToast () {
      this.$createToast({
        txt: this.toastTxt
      }).show()
    }
  }
}
</script>

<style lang="scss" scoped>
.mode{
  width: 50%;
  padding: 1.2rem .6rem 0.6rem;
  box-sizing: border-box;

  .title{
    font-size: 0.5rem;
    text-align: center;
    margin-bottom: 0.6rem;
    color: #281668;
  }
  .box{
    background: #fff;
    box-shadow: .083333rem .25rem .5rem rgba(0, 0, 0, 0.05);
    padding: 0.4rem;
    border-radius: 0.24rem;
    .pic{
      width: 100%;
      height: .5rem;
      margin: 0.4rem 0;

      .f{
        display: block;
        width: 100%;
        height: 100%;
        background: #CF2B22;
        border-radius: .5rem;
      }
      .t{
        width: 100%;
        height: 100%;
        margin-right: -0.8rem;
        span{
          height: 100%;
          background: #281668;
          border-radius: .5rem;
          &:first-child{
            margin-right: 0.3rem;
          }
          &:last-child{
            margin-left: 0.3rem;
          }
        }
      }
    }
  }

  .name{
    font-size: 0.5rem;
    text-align: center;
    margin-top: 0.6rem;
    color: #281668;
  }
}
</style>
