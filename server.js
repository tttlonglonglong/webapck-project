const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
// webpack代码编译器
const complier = webpack(config)

const app = express()
// use:使用中间件
app.use(
  webpackDevMiddleware(complier, {
    // publicPath: config.output.publicPath
  })
)

app.listen(8081, () => {
  console.log('Server is listen port 8081')
})
