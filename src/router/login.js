import Vue from 'vue'
import VueRouter from 'vue-router'

import signin from '~client/login/signin'
import signup from '~client/login/signup'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',//这里可以不用history模式
    base: __dirname,
    routes:[
        //用户登陆页
        {path: '/signin', component: signin},
        //用户注册页
        {path: '/signup', component: signup}
    ]
})
export default router