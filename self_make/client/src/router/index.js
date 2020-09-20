import Vue from 'vue'
import Router from 'vue-router'
import axios from '@/utils/fetch'
// import axios from 'axios'
import Cookies from 'js-cookie'
import store from '@/store/index' 
import {responseStatus} from '@/config' 

const Home = () => import("@/views/Home")
const TagManage = () => import("@/views/TagManage")
const My = () => import("@/views/My")
const SelfSetting = () => import("@/views/SelfSetting")


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            meta: { requireAuth: false },
            name: 'Home',
            component: Home
        },
        {
            path: '/tagManage',
            meta: { requireAuth: false },
            name: 'TagManage',
            component: TagManage
        },
        {
            path: '/my',
            meta: { requireAuth: true },
            name: 'My',
            component: My
        },
        {
            path: '/self-setting',
            meta: { requireAuth: true },
            name: 'SelfSetting',
            component: SelfSetting
        }
    ]
})

// 设置全局导航守卫
router.beforeEach(async (to, from, next) => {
    const isLogin = Cookies.get('token');
    const {userInfo} = store.state
    // 获取用户信息
    if (isLogin && !userInfo.userId) {
        if(axios){
            const {data} = await axios.get('/api/findUser', {
                params:{
                    token: isLogin
                }
            })
            
            if(data.status === responseStatus){
                const fdata = data.data;
                store.commit('setUserInfo', fdata)
            }
        }
    }

    // 判断路径是否有访问权限
    if (to.meta.requireAuth) {   
        //判断是否登录（通过登录token来判断）
        if (isLogin) {
            next();
        } else {
            next('/');
        }
    } else {//不需要跳转，直接往下走
        // if(isLogin && to.path === '/login'){
        //     return next('/home');
        // }
        next();
    }
});


export default router