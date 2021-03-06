import Vue from 'vue'
import VueRouter from 'vue-router'
const TopicList = resolve => require(['@/components/TopicList'], resolve)
const TopicDetail = resolve => require(['@/components/TopicDetail'], resolve)
const TopicNew = resolve => require(['@/components/TopicNew'], resolve)
const Mine = resolve => require(['@/components/Mine'], resolve)
const Hello = resolve => require(['@/components/Hello'], resolve)

Vue.use(VueRouter)

export default new VueRouter({
  base: 'vue_pro',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TopicList',
      component: TopicList
    },
    {
      path: '/details/:id',
      name: 'TopicDetail',
      component: TopicDetail
    },
    {
      path: '/new',
      name: 'TopicNew',
      component: TopicNew
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
