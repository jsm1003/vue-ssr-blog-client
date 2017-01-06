const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const config = merge(base, {
  target: 'node',
  devtool: false,
  entry: './src/entries/app/server-entry.js',
  output:{
    filename: 'server/server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  node: { __dirname: true},
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
      'global.GENTLY': false
    })
  ]
})

module.exports = config
