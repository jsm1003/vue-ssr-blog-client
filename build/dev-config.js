const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const entries = require('./entries')

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ["vendor"]
    })
]

Object.keys(entries).forEach(function (entry) {
    plugins.push(
        new HTMLPlugin({
            chunks: ['vendor', entry],
            filename: `${entry}.html`,
            template: `src/template/${entry}.html`,
            inject: true
        })
    )
})

module.exports = {
    module: {
        rules: [      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:7].[ext]'
        }
      }]
    },
    plugins: plugins,
    
}