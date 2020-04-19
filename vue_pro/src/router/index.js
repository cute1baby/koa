import Vue from 'vue'
import Router from 'vue-router'
import TopicList from '@/components/TopicList'
import TopicDetail from '@/components/TopicDetail'
import TopicNew from '@/components/TopicNew'
import Mine from '@/components/Mine'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
