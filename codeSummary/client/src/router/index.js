import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Front from '@/pages/front'
import FrontDetails from '@/pages/frontDetails'
import Life from '@/pages/life'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/front',
        name: 'Front',
        component: Front
    },
    {
        path: '/frontDetails',
        name: 'FrontDetails',
        component: FrontDetails
    },
    {
        path: '/life',
        name: 'Life',
        component: Life
    },
  ]
})
