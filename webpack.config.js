const path = require('path')
const ImageminPlugin = require('image-webpack-loader')
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
        use: [
          {
            loader: 'file-loader',
            // loader: 'url-loader',
            options: {
              // placeholder 占位符
              name: '[name]_[hash:5].[ext]',
              // 打包到哪个文件夹
              outputPath: 'imgs/',
              limit: 2048
            }
          },
          {
            loader: 'image-webpack-loader', // 压缩图片
            options: {
              // progressive: true,
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
}
