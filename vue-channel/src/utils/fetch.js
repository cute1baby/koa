import Vue from 'vue'
import axios from 'axios'  //引入axios
// 序列化成url的形式
import qs from 'qs'
import Cookies from 'js-cookie'
import store from '@/store/index'  //引入store
import router from '@/router'  //引入router

const v = new Vue({router});
// 创建一个axios实例
let instance = axios.create({
    transformRequest: [function (data) {
        data = qs.stringify(data);
        return data;
    }],
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
})

// http request 拦截器
instance.interceptors.request.use(
    config => {
      const token = Cookies.get('LOGINKEY')
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
        if (response.data.code) {
            // 判断是否是登录或者首页
            const isPath = v.$route.path.trim() === '/login' || v.$route.path.trim() === '/'
            // 1002: token过期； 2003：非法请求
            switch (response.data.code) {
                case 1002:
                case 2003:
                    if(!isPath){
                        // token过期直接跳转到登录页
                        // v.$message({
                        //     message: 'token过期，请重新登录',
                        //     type: 'error'
                        // });
                        router.replace({path: '/login'}).catch(err => { console.log(err)})
                    }
                    break;
                default:
                    v.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                // store.state.isLogin = false
                // router.replace({
                //   path: 'login',
                //   query: {
                //     redirect: router.currentRoute.fullPath
                //   }
                // })
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        // return Promise.reject(error.response.status)
        return Promise.reject(new Error(error.response)) // 返回接口返回的错误信息
    }
)


export default instance;