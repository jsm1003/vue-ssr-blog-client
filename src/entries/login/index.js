import Vue from 'vue'
import App from './Login.vue'
import store from '~src/store'
import router from '~src/router/login'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
    store,
    router,
    ...App
})

app.$mount('#app')