import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const Vessel = () => import('@/components/Vessel')
const Detail = () => import('@/components/Detail')


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
