const path = require('path')
const vueConfig = require('./vue-loader.config')

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client-entry.js',
    admin: './src/admin.js',
    login: './src/login.js',
    vendor: ['vue', 'vue-router', 'vuex', 'lru-cache', 'axios', 'vuex-router-sync']
    //两个入口文件，将应用拆分成两个文件，一个是应用文件，一个是第三方库代码
    //然后再把'vendor'文件的名称当作参数传递给CommomChunksPlugin
  },
   resolve: {
       extensions: ['.js','.vue'],
    //extension 不用在require或是import的时候加文件后缀
     modules: [ path.join(__dirname, '../node_modules')],
   // modules: [path.resolve(__dirname, "src"), "node_modules"],
    //modules还不太清楚， 应该是这两个地方的模块使用resolve
  
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'client': path.resolve(__dirname, '../src/pages/client'),
      'admin': path.resolve(__dirname, '../src/pages/admin')
      //'muse-components': 'muse-ui/src' 我先不用muse
      //上面使用波浪号比较直观
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
    filename: 'static/js/[name].[chunkhash].js'
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
        test: /\.(png|jpg|gif|svg)$/,
        //这里和人家的不一样，先待定
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[ext]?[hash]'
          //打包出来的logo.jpg不现实hash值应该就是这里设置了一下子
        }
      }
    ]
  }
}
