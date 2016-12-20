import Vue from 'vue'
import App from './admin.vue'
import store from './store'
import router from './router/admin.js'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
    store,
    router,
    ...App
})

app.$mount('#app')