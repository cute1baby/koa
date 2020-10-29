import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home'
// import Hello from '@/components/Hello'
// import World from '@/components/World'
const Home = () => import('@/pages/home')
const Hello = () => import('@/components/Hello')
const World = () => import('@/components/World')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'vue_demo',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
          {
            path: 'hello',
            name: 'Hello',
            component: Hello,
          },
          {
            path: 'world',
            name: 'World',
            component: World,
          },
      ]
    }
  ]
})
