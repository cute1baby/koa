import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import { Tabbar, TabItem, Search, InfiniteScroll } from 'mint-ui'
import './assets/css/reset.css'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//   let ret = ''
//   for (let it in data) {
//     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//   }
//   return ret
// }]
//然后再修改原型链
Vue.prototype.$axios = axios

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Search.name, Search);
Vue.use(InfiniteScroll);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
