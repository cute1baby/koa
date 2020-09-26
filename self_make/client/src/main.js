// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '@/assets/css/index.less'
import {Dialog, Input, Select, Option, Button, Message, Loading}  from 'element-ui';


Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Loading.directive);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
