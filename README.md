# first ssr

> A Vue.js project with vue 2.0, vue-router and vuex starter kit for server side rendering.

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

## 目前仍在开发中 需要搭配后端api服务器使用（开发完成会合并两个服务器）

请最好使用node7.0以上的版本，并在最新的chrome浏览器中预览（该项目开发环境为node7.2, chrome55）
目前该项目对老版本浏览器的兼容性还没有做好
api服务器地址https://github.com/ZinCode/vue-ssr-blog-api

## 用到的一些技术栈

### 前端
1. vue2.1的ssr(前后端同构，对SEO友好)
2. ES6语法，使用async/await编写异步代码
3. webpack配置开发环境
4. css使用flex响应式布局，（这一块还没有完成）

### 后端
1. 使用express框架
2. 编写restful风格的api接口
3. 使用leancloud作为baas云存储服务（没有使用mongoDB的原因有很多，以后再说）

## 特色功能

1.  多用户系统
2.  支持在线撰写文章、发布文章、查看草稿、草稿实时保存（使用markdown语法编写文章，支持实时预览）
3.  UI漂亮（自己强行加上去的..，借鉴G+的UI风格）

## License

[MIT](http://opensource.org/licenses/MIT)