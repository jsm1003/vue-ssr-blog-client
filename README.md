# first ssr

> A Vue.js project with vue 2.0, vue-router and vuex starter kit for server side rendering.

## Build Setup（生产环境）

``` bash
# 安装依赖
npm install  

# 或者使用yarn
yarn install

# webpack打包
npm run build

# 启动服务
npm start
```

## Devlopment Setup（开发环境）

```bash
# 安装依赖
npm install

# 启动服务
npm run dev
```


## 遇到问题？ 

 请提交[issue](https://github.com/ZinCode/vue-ssr-blog-client/issues) 或者在gitter聊天室找我[https://gitter.im/josephine-blog/Lobby](https://gitter.im/josephine-blog/Lobby)

## 目前仍在开发中（算是基本完成了一个总体的思路吧，后面要改的还有很多） 需要搭配后端api服务器使用

请最好使用node7.0以上的版本，并在最新的chrome浏览器中预览（该项目开发环境为node7.2, chrome55）
目前该项目对老版本浏览器的兼容性还没有做好
api服务器地址https://github.com/ZinCode/vue-ssr-blog-api

## 本项目使用脚手架

[vue多页面ssr脚手架](https://github.com/ZinCode/vue2-multiple-entry-start-kit)

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
3.  UI漂亮（自己强行加上去的...，借鉴G+的UI风格）

#### 博客使用说明

目前在攥写或发布文章的时候还没有提示，请按F12打开console控制台，在哪里可以看到各种提示信息

## License
      
[MIT](http://opensource.org/licenses/MIT)

#### 需要增加的组件
1. toast
2. dropdown （需要更改）
3. modal
4. ripple（这个可以不加）
5. chip
6. nprogress （临时的）
7. alert（不能用toast的样式）

#### 样式这一块，等做完后吧公共样式分离出来


contarin: layout style;
https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain

G+是通过js计算每一列的宽度，再确定需要几列，而每一列的宽度是由响应式的css来控制的

当你写一个项目的时候如果什么都用插件，那你就好比一个组装工人，里面每一项的具体实现你都不从而知，我认为应该是尽自己所能的少用各种插件，
es6-promise暂时还没有用