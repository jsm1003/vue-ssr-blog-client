import Vue from 'vue'
import App from './admin.vue'
import store from '~src/store'
import router from '~src/router/admin.js'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
    store,
    router,
    ...App
})

app.$mount('#app')