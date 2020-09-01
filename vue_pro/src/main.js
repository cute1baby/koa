import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from "axios"
import VueLazyload from 'vue-lazyload'

import MINT from 'mint-ui' 
import './assets/css/index.scss'

Vue.config.productionTip = false
Vue.use(MINT)
Vue.use(VueLazyload, {
  preLoad: 1,  // 离底部的距离(preLoad-1)开始加载
  // error: require('./assets/img/error.jpg'),
  // loading: require('./assets/img/homePage_top.jpg'),
  attempt: 3  // 加载失败重试次数
})
//修改原型链
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
