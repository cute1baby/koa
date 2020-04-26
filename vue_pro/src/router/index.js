import Vue from 'vue'
import VueRouter from 'vue-router'
const TopicList = resolve => require(['@/components/TopicList'], resolve)
const TopicDetail = resolve => require(['@/components/TopicDetail'], resolve)
const TopicNew = resolve => require(['@/components/TopicNew'], resolve)
const Mine = resolve => require(['@/components/Mine'], resolve)

Vue.use(VueRouter)

export default new VueRouter({
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
    }
  ]
})
