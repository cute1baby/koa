// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
    Pagination, Table, TableColumn, Image, Row, Col, Select, Option, Input, Button, DatePicker,
    Form, FormItem, Breadcrumb, BreadcrumbItem, Message, Loading, Icon, Dialog, Carousel, CarouselItem,
    Menu, Submenu, MenuItem, MenuItemGroup, Header, Main, Footer, Tabs, TabPane, Progress, Radio, RadioGroup,
    Upload
} from 'element-ui';

import './assets/css/index.less';
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
Vue.use(Dialog);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Progress);
Vue.use(Loading.directive);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Upload);
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
