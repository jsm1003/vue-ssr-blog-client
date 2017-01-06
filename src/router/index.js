import Vue from 'vue'
import VueRouter from 'vue-router'

import articles from '~client/articles/articles'
import article from '~client/article/article'

import profile from '~client/profile/profile'

import people from '~client/people/people'

import edit from '~client/write/edit'
import drafts from '~client/drafts/drafts'

import tags from '~client/tags/tags'
import tag from '~client/tags/tag'

import auth from '~client/about/auth'
import resume from '~client/about/resume'

import search from '~client/search/search'
//后续会实现路由懒加载、滚动行为、过渡特效，
//再往后会考虑路由别名，比如 /u的别名为/user
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  //base貌似有没有都可以，没测试出来，尴尬
  routes: [
    { path: '/', name: 'h', component: articles},
    //主页
    { path: '/articles', name: 'as', component: articles},//别名好像也不可以
    //全部文章列表
    { path: '/a/:id', name: 'a', component: article},
    //单篇文章
    { path: '/a/:id/edit', name: 'aEdit', component: edit},
    //编辑单篇文章



    { path: '/u/haha', name: 'u', component: profile},
    //该用户主页
    { path: '/u/:id/articles', name: 'uas', component: articles},//这个和上面的公用
    //该用户所有文章列表
    //{ path: '/:id/info', component: info},
    { path: '/people', name: 'up', component: people},
    //一些用户的列表


    { path: '/drafts', name: 'ds', component: drafts},//草稿列表页,单独出来
    //你的草稿列表
    { path: '/write', name: 'newDraft', component: edit},
    //你的新草稿编辑页
    { path: '/d/:id', name: 'oldDraft', component: edit},
    //你的草稿编辑页


    { path: '/tags', name: 'ts', component: tags },
    //所有tags列表
    { path: '/t/:id', name: 't', component: tag },
    //该tag下所有文章列表

    { path: '/about/author', name: 'aa', component: auth},
    //作者介绍页
    { path: '/about/resume', name: 'ar', component: resume},
    //作者简历

    { path: '/s', name: 's', component: search},
    //搜索列表页

    // { path: '/', redirect: '/aaa/articles'}
    //其他页面重定向
  ]
})

export default router
