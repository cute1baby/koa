import Vue from 'vue'
import Router from 'vue-router'
import Vessel from '@/components/Vessel'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
