import {
    LOGOUT,
    USER_INFO
} from '../mutation-types'
import api from '~src/api'

const state = {
    user: {},
    logState: true,//默认为登陆状态
}

const actions = {
    async ['logout'] ({commit}) {
        //这里要不要设置ajax进度条为不显示呢？
        var {data: {code, msg}} = await api.post('user/logout')
        if (code === 200) {
            console.log('登出状态')
            commit(LOGOUT)
        }//这里加一个else？
    },
    async ['getUserData']({commit}) {
        var {data} = await api.get('/user/info')
        if (data.code === 200) {
            commit(USER_INFO, data.user)
        } else {
            console.log(data.msg)
            commit(LOGOUT)
        }
        // commit (USER_INFO, user)      
    }
}

const mutations = {
    [LOGOUT](state) {
        state.logState = false
        state.user = {}
        if (typeof window !== 'undefined') {
            localStorage.removeItem('testIsLogin')
            //支持跨标签通讯
        }
    },
    [USER_INFO](state, user) {
        state.user = user
        state.logState = true
    }
}

const getters = {
    ['getUserInfo'](state) { return state.user },
    ['getLogState'](state) { return state.logState }
}

export default {
    actions,
    state,
    mutations,
    getters
}