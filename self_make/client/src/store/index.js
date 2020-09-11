import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: {}
}

const mutations = {
    // 设置userInfo
    setUserInfo(state, info){
        if(!info.avatar){
            info.avatar = `http://img.familyli.cn/juejin_defdault.png`
        }
        state.userInfo = info
    },
    // 重置userInfo
    resetUserInfo(state){
        state.userInfo = {}
    }
}

const actions = {
    
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})