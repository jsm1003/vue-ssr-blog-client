const path = require('path')
const vueConfig = require('./vue-loader.config')
const entries = require('./entries')
const webpack = require('webpack')

var baseConfig = {
  devtool: '#source-map',
  entry: {
    vendor: ['vue', 'vue-router', 'vuex', 'lru-cache', 'axios','vuex-router-sync']
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [path.join(__dirname, '../node_modules')],
    //配置别名
    alias: {
      '~src': path.resolve(__dirname, '../src'),
      '~assets': path.resolve(__dirname, '../src/assets'),
      '~components': path.resolve(__dirname, '../src/components'),
      '~client': path.resolve(__dirname, '../src/pages/client'),
      '~admin': path.resolve(__dirname, '../src/pages/admin')
    }
    //alias配置别名，后续直接 import 'src| assets | components' 即可
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '../node_modules')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
     //output.publicPath 表示资源的发布地址，当配置过该属性后，打包文件中所以通过相对路径引用的资源都会被配置的路径所替换。
    //如果你改成/assets/的话， 现在的所有资源的路径均为http://localhost:8080/assets/***
    filename: 'static/js/[name].[chunkhash:7].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        //不编译包文件夹下的文件
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
        {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
                name: '[name].[hash:7].[ext]'
            }
        }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    })
  ]
}

baseConfig.entry = Object.assign(baseConfig.entry, entries)
module.exports = baseConfig
