# first ssr

> A Vue.js project with vue 2.0, vue-router and vuex starter kit for server side rendering.

[![Build Status](https://travis-ci.org/doabit/vue-ssr-starter-kit.svg?branch=master)](https://travis-ci.org/doabit/vue-ssr-starter-kit)

## Build Setup

``` bash
npm install
npm run build
npm start
```

## Devlopment Setup

```bash
npm install
npm run dev
```

## Reference resources

[vue-ssr-demo](https://github.com/yyx990803/vue-ssr-demo)

[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)

## License

[MIT](http://opensource.org/licenses/MIT)


支持跨域get等请求，post等请求只能通过本域来修改
借助vue的过渡状态，可以在登陆界面，仿照知乎的canvas效果，来与用户进行互动，比如验证错误，等时候
等完成之后推荐到awsomevue 还有muse ui中
手动实现bind绑定
像素风格的ui alone MV 唱fade的歌手
后续baas会考虑使用firebase
考虑加入web notification功能，当文章被点赞，系统提示，还有再看一下html5的便签api
重新考虑一下vuex的使用，只有当至少有两个组件使用这个状态的时候用比较好，如果是父传子用props比较好
页面文章请求等待的时候的 类似知乎和http://www.uplabs.io/的css文字效果

.post-placeholder-inner {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    background: #ebeff1;
    background: -webkit-linear-gradient(left,#ebeff1 8%,#dee3e5 18%,#ebeff1 33%);
    background: linear-gradient(90deg,#ebeff1 8%,#dee3e5 18%,#ebeff1 33%);
    background-size: 900px 4px;
    height: 40px;
    position: relative;
}

考虑点赞等功能要不要加入lodash的节流函数


404页面文字： 你是个有想法的孩子，竟然找到这里来了
在编辑page增加一个全屏功能？