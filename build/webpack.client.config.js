const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const config = merge(base, {
   module: {
         rules: utils.styleLoaders()
          //这里添加了extracttextplugin,如果按照ssr的用法，先待定
     },
  //合并对象到第一个文件夹下
  resolve: {
     alias: {
            'api-config': path.resolve(__dirname, '../src/api/config-client')
        }
    //上面这个别名没有用到
  },
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    })
  ])
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new ExtractTextPlugin('static/css/[name].[hash].css'),
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
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'server/service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    }),
    new HTMLPlugin({
      chunks: [
        'manifest', 'vendor', 'app',
      ],
      //这里对应入口节点的三个文件
      //使用生成的这三个js文件作为注入文件(注入到html里面)
      filename: 'index.html',//生成的html文件名
      template: 'src/template/index.html',//需要的模板目录
      inject: true,//将打包好的js文件放到body标签内
    }),
    new HTMLPlugin({
      chunks: [
        'manifest', 'vendor', 'admin',
      ],
      //excludeChunks: ['dev-helper']如果有这一项说明，不使用dev-helper作为注入项
      filename: 'admin.html',
      template: 'src/template/admin.html',
      inject: true,
    }),
    new HTMLPlugin({
      chunks: [
        'manifest', 'vendor', 'login',
      ],
      //excludeChunks: ['dev-helper']如果有这一项说明，不使用dev-helper作为注入项
      filename: 'login.html',
      template: 'src/template/login.html',
      inject: true,
    })
  )
} else {

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"]
      //将公共模块提取，生成名为`vendors`的chunk
    }),
    new HTMLPlugin({
      chunks: [
        'vendor', 'app',
      ],
      filename: 'index.html',
      template: 'src/template/index.html',
      inject: true,
    }),
    new HTMLPlugin({
      chunks: [
        'vendor', 'admin',
      ],
      filename: 'admin.html',
      template: 'src/template/admin.html',
      inject: true,
    }),
    new HTMLPlugin({
      chunks: [
        'vendor', 'login',
      ],
      filename: 'login.html',
      template: 'src/template/login.html',
      inject: true,
    })
  )
}

module.exports = config
