<template>
  <div class="hello">
    <router-link to="/hello">点击跳转hello</router-link>
    <router-link to="/world">点击跳转world</router-link>
    <van-rate v-model="value" />
    <div style="margin-top: 50px;">
        <router-view/>
    </div>
  </div>
</template>

<script>
import { Rate } from 'vant';
export default {
  name: 'HelloWorld',
  data () {
    return {
      value: 3
    }
  },
  components: {
    'van-rate': Rate
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
