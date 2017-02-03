const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const devConfig = require('./dev-config')
const prodConfig = require('./prod-config')

//原因找到了，是merge的问题
var config = merge(base, {
  module: {
    rules: utils.styleLoaders()
  }
})
config = merge(config, {
  module: {
    rules: [{
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'vue-loader',
        options: vueConfig
      },]
  }
})

if (process.env.NODE_ENV === 'production') {
    config = merge(config, prodConfig)
} else {
    config = merge(config, devConfig)
}

module.exports = config
