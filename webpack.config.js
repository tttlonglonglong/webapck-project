const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    mian: './src/index.js'
  },
  output: {
    // 打包出来的文件名
    filename: 'bundle.js',
    // 打包出来的文件路径
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          // loader: 'url-loader',
          options: {
            // placeholder 占位符
            name: '[name]_[hash:5].[ext]',
            // 打包到哪个文件夹
            outputPath: 'imgs/',
            limit: 2048,
            quality: 10
          }
        }
      }
    ]
  }
}
