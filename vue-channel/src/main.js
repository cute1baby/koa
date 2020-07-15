// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
    Pagination, Table, TableColumn, Image, Row, Col, Select, Option, Input, Button, DatePicker,
    Form, FormItem, Breadcrumb, BreadcrumbItem, MessageBox, Message, Loading, Icon
} from 'element-ui';
import './assets/css/index.scss';

Vue.config.productionTip = false

Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Image);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Icon);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
