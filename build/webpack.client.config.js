const path = require('path')

const utils = require('./utils')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const devConfig = require('./dev-config')
const prodConfig = require('./prod-config')

var config = merge(base, {
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
