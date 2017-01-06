const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const devConfig = require('./dev-config')
const prodConfig = require('./prod-config')

//原因找到了，是merge的问题
let config = merge(base, {
  module: {
    rules: utils.styleLoaders()
  }
})

if (process.env.NODE_ENV === 'production') {
    config = merge(config, prodConfig)
} else {
    config = merge(config, devConfig)
}

module.exports = config
