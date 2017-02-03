import Vue from 'vue'
import App from './App.vue'
import store from '~src/store'
import router from '~src/router'
import { sync } from 'vuex-router-sync'
import directives from '~src/directives'
import * as filters from '~src/filters'

sync(store, router)

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  ...App
})
// SSR流程是这样的： 客户端请求服务端， 服务端根据请求链接获得匹配到的组件， 
// 再通过调用所有组件的某个返回Promise的埋点(官方是preFetch方法)来将需要的数据拿到， 
// 最后再通过<script>window.__initial_state=blabla</script>将其写入网页，
// 最后将服务端渲染好的网页返回回去。

// 接下来还没完，现在是客户端还要再跑： 它先用vuex将写入的__initial_state__
// 替换为当前的全局状态树，再用这个状态树去检查服务端渲染好的数据有没有问题。
// 遇到没被服务端渲染的组件，再去发异步请求拿数据。
// 说白了就是一个类似React的shouldComponentUpdate的Diff操作。

// 我个人认为客户端那边的Diff操作是有跳过的可能的，
// 毕竟我们开发者可以肯定首屏到底是全部渲染好还是只是部分，完全可以通过服务端写一个Flag在网页里
// ，客户端检查到这个Flag就跳过Diff。


//preFetch 是暴露给路由预加载的钩子
//组件定义一个 preFetch 的钩子函数，dispatch action 返回一个 promise。
//promise resolve 之后更新 state。等所有的 preFetch 钩子都 resolve 之后，
//获取初始状态，渲染页面。

//会添加一个 server-rendered="true" 的属性。(应该是获取到数据后这个属性会被删除)


//有一点需要好好理解下：如果你是通过 URL 去服务器端获取页面，
//比如首页，那么才会调用 preFetch获取数据，也就是服务器端渲染。
//而浏览器端的路由跳转，则是直接在前端去发请求获取数据。关于这点，可以看下面尤大大在知乎上给我的回复。
// console.log(`%c I shall be telling this with a sigh
// Somewhere ages and ages hence:
// Two roads diverged in a wood, and I--
// I took the one less traveled by,
// And that has made all the difference. %c   --Robert Frost <The Road Not Taken> .`, "color:rgba(0,0,0,0.87);font-weight:400;font-size:20px;font-family:Century Gothic;letter-spacing: 0.2px;","color:#666;font-size:13px;font-family:Century Gothic;letter-spacing: 0.1px;")
export { app, router, store }
