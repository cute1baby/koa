import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Vessel from '@/components/Vessel'
import Detail from '@/components/Detail'


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
      path: '/list',
      name: 'Vessel',
      component: Vessel
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
