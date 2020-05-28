<template>
<div class="mode" v-if="item.name">
  <h4 class="title">{{item.name}}</h4>
  <ul class="box">
    <li v-for="v in item.contentList.split(',')" class="pic">
      <span v-if="String(v)==='1'" class="f"></span>
      <p v-if="String(v)==='2'" class="t df">
        <span v-for="s in 2" class="df1"></span>
      </p>
    </li>
  </ul>
  <p class="name">{{item.desc}}</p>
</div>
</template>

<script>
export default {
  name: 'Mode',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.mode{
  width: 50%;
  padding: 2.4rem .6rem 1.2rem;
  box-sizing: border-box;

  .title{
    font-size: 1.333333rem;
    text-align: center;
    margin-bottom: 0.8rem;
    color: #281668;
  }
  .box{
    background: #fff;
    box-shadow: .083333rem .4rem .5rem rgba(0, 0, 0, 0.06);
    padding: 0.6rem;
    border-radius: 0.4rem;
    .pic{
      width: 100%;
      height: 1rem;
      margin: 0.8rem 0;

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
    font-size: 1.333333rem;
    text-align: center;
    margin-top: 0.8rem;
    color: #281668;
  }
}
</style>
