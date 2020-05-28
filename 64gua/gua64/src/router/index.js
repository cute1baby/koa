import Vue from 'vue'
import Router from 'vue-router'
import Vessel from '@/components/Vessel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Vessel',
      component: Vessel
    }
  ]
})
