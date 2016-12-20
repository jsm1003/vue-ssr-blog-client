const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')

const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

module.exports = function setupDevServer (app, opts) {
  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.entry.admin = ['webpack-hot-middleware/client', clientConfig.entry.admin]
  clientConfig.entry.login = ['webpack-hot-middleware/client', clientConfig.entry.login]
  //服务端多入口
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', () => {
    const fs = devMiddleware.fileSystem
    const filePath = path.join(clientConfig.output.path, 'index.html')//client ssr 页面
    //在这里判断文件是否在内存中
    if (fs.existsSync(filePath)) {
      const index = fs.readFileSync(filePath, 'utf-8')
      opts.indexUpdated(index)
    }
     const adminPath = path.join(clientConfig.output.path, 'admin.html')//admin spa 页面
    if (fs.existsSync(adminPath)) {
      const admin = fs.readFileSync(adminPath, 'utf-8')
      opts.adminUpdated(admin)
    }
     const loginPath = path.join(clientConfig.output.path, 'login.html')//login spa 页面
    if (fs.existsSync(loginPath)) {
      const login = fs.readFileSync(loginPath, 'utf-8')
      opts.loginUpdated(login)
    }
  })

  // hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler))

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    opts.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
