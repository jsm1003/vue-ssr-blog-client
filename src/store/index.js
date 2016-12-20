import Vue from 'vue'
import Vuex from 'vuex'

import css from './modules/css'
import user from './modules/user'
import post from './modules/post'
Vue.use(Vuex)
//const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    post,
    user,
    css,
  },
  //strict: debug
})
