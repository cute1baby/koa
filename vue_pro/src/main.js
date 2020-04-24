import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from "axios"

import MINT from 'mint-ui' 
import './assets/css/index.scss'
if (process.env.NODE_ENV === 'development') {
    require('mint-ui/lib/style.css')
}

Vue.config.productionTip = false
Vue.use(MINT)
//修改原型链
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
