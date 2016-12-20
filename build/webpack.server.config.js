const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const config = merge(base, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output:{
    filename: 'server/server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
    'api-config': path.resolve(__dirname, '../src/api/config-client')
    }
    //这一行貌似还没什么用
  },
  node: { __dirname: true},//这一行新加的
  externals: Object.keys(require('../package.json').dependencies),
  //这一句是跟打包有关的
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
      'global.GENTLY': false //这一行也是新加的
    })
  ]
})

module.exports = config
