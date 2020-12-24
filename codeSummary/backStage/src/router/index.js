import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import {
    homeList
} from '@/config/menu.js'
const Login = () => import('@/pages/login')
const Home = () => import('@/pages/home')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: '/wxmp',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        redirect: '/home/manage',
        name: 'Home',
        meta: { requireAuth: true },
        component: Home,
        children: homeList
    }
  ]
})

// 设置全局导航守卫
router.beforeEach((to, from, next) => {
    const isLogin = Cookies.get('LOGINKEY');
    // 判断路径是否有访问权限
    if (to.meta.requireAuth) {   
        //判断是否登录（通过登录token来判断）
        if (isLogin) {
            next();
        } else {
            next('/login');
        }
    } else {//不需要跳转，直接往下走
        if(isLogin && to.path === '/login'){
            return next('/home');
        }
        next();
    }
});

export default router