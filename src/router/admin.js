import Vue from 'vue'
import VueRouter from 'vue-router'

import adlogin from '~admin/admin-Login'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',//这里可以不用history模式
    //base: __dirname,
    routes:[
        {path: '/admin/login', component: adlogin}
    ]
})
export default router