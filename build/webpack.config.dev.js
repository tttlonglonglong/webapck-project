const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 服务器启动在哪个文件夹
    // contentBase: './dist',
    open: true,
    port: 8081,
    hot: true,
    // // 即使热更替没有生效，也不让浏览器重新刷新
    // hotOnly: true,
    proxy: {
      // 请求的代理地址
      '/api': {
        target: 'http://locahost:300',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: { usedExports: true }
}

module.exports = merge(commonConfig, devConfig)
