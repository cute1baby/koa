<template>
  <div class="hello">
    <Header class="header">
      <cube-input
        class="search"
        v-model="value"
        :clearable="clearable"
        placeholder="请输入关键词"
        @keyup.enter.native="handleKeyup"
      ></cube-input>
    </Header>
    <div class="container df">
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
      <Mode />
    </div>

    <div style="height: 50px;"></div>
  </div>

</template>

<script>
import Mode from './mode'
export default {
  name: 'HelloWorld',
  data () {
    return {
      value: '乾为天',
      clearable: {
        visible: true,
        blurHidden: true
      },
    }
  },
  methods: {
    handleKeyup() {
      console.log(1111)
    },
    showToast () {
      this.$createToast({
        txt: this.toastTxt
      }).show()
    }
  },
  components: {
    Mode
  }
}
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  padding: 1rem 0.8rem .4rem;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  box-shadow: 1px 3px 4rem rgba(0,0,0,0.1);
}
.container{
  margin-top: 3.8rem;
  flex-wrap: wrap;
  padding: .8rem .4rem;
}
</style>
