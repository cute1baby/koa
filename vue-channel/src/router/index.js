import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
const Login = resolve => require(['@/pages/Login'], resolve)
const Home = resolve => require(['@/pages/Home'], resolve)
// 群码详情
const CodeDetails = resolve => require(['@/pages/CodeDetails'], resolve)
// 订单详情
const OrderDetails = resolve => require(['@/pages/OrderDetails'], resolve)
const OrderQrDetails = resolve => require(['@/pages/OrderQrDetails'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: 'vue_channel',
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
        name: 'Home',
        meta: { requireAuth: true },
        component: Home
    },
    {
        path: '/order/:id',
        name: 'OrderDetails',
        meta: { requireAuth: true },
        component: OrderDetails
    },
    {
        path: '/qrcode/:id',
        name: 'CodeDetails',
        meta: { requireAuth: true },
        component: CodeDetails
    },
    {
        path: '/qrorder/:id',
        name: 'OrderQrDetails',
        meta: { requireAuth: true },
        component: OrderQrDetails
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