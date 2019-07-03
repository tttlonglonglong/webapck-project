const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    // 通过library 将打包的代码，通过全局变量暴漏出去
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      // context: __dirname,
      // name 要和output的library一样的名称一样，生成 vendors 的库
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}
