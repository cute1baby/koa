import Vue from 'vue'
import axios from 'axios'  //引入axios
// 序列化成url的形式
import qs from 'qs'
import Cookies from 'js-cookie'
import store from '@/store/index'  //引入store
import router from '@/router'  //引入router
const v = new Vue({
    router,
    store
})
// 创建一个axios实例
let instance = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
})

// http request 拦截器
instance.interceptors.request.use(
    config => {
      //解决axios post请求后台获取不到参数问题
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      };
      const token = Cookies.get('token')
      if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = token  //请求头加上token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
)

// http response 拦截器
instance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        if (response.data.status) {
            // 判断是否是登录或者首页
            const isPath = v.$route.path.trim() === '/unhome' || v.$route.path.trim() === '/'
            // 1001: token过期； 1002：非法请求
            switch (response.data.status) {
                case 1001:
                case 1002:
                    if(!isPath){
                        // 删除token和用户信息
                        Cookies.remove('token')
                        router.replace({path: '/unhome'}).catch(err => { console.log(err)})
                        // window.location.reload()
                        store.commit('resetUserInfo', {})
                    }
                    break;
                default:
                    v.$message({
                        message: response.data.message,
                        type: 'error'
                    });
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(new Error(error.response)) // 返回接口返回的错误信息
    }
)


export default instance;