import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/pages/other/Test'

Vue.use(Router)

export default new Router({
  base: '/other.html/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
      },
  ]
})
