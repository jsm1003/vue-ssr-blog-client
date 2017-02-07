const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const entries = require('./entries')

var plugins = [
  new ExtractTextPlugin('static/css/[name].[hash:7].css'),
  //就可以将你的样式提取到单独的css文件里
  // this is needed in webpack 2 for minifying CSS
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  // minify JS
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf('node_modules') > 0)
    }// 最后返回一个整数 设置一个依赖被引用超过多少次就提取出来
  }),
  //将公共模块提取，生成名为`vendor`的chunk
  new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', chunks: ['vendor'] }),
  //这里的意思是打包完成后提取数组模块中的公共模块，数组内的元素与entry一一对应
  // new SWPrecachePlugin({离线缓存先不弄了
  //   cacheId: 'vue-hn',
  //   filename: 'server/service-worker.js',
  //   dontCacheBustUrlsMatching: /./,
  //   staticFileGlobsIgnorePatterns: [/app\.html$/, /\.map$/]
  // })
]

Object.keys(entries).forEach(function (entry) {
  plugins.push(new HTMLPlugin({
    chunks: [
      'manifest', 'vendor', entry
    ],
    filename: `${entry}.html`,
    template: `src/template/${entry}.html`,
    inject: true,
    //下面这些东西是什么？先不加呢
    // minify: {
    //   removeComments: true,//删除注释
    //   collapseWhitespace: true,
    //   removeAttributeQuotes: true//移除属性的引号
    // }
  }))
})

module.exports = {
   // devtool:,//原来是false
  module: {
    rules: [{
      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/img/[name].[hash:7].[ext]'
      }
    }]
  },
  plugins: plugins
}