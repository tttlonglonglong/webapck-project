const path = require('path')
const webpack = require('webpack')
const ImageminPlugin = require('image-webpack-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    // publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
        // options: {
        //   // presets: [
        //   //   [
        //   //     '@babel/preset-env',
        //   //     {
        //   //       //不会把所有poolyfill都加到打包代码中，只加载用到的
        //   //       useBuiltIns: 'usage',
        //   //       targets: {
        //   //         edge: '17',
        //   //         firefox: '60',
        //   //         chrome: '67',
        //   //         safari: '11.1'
        //   //       }
        //   //     }
        //   //   ]
        //   // ]
        //   plugins: [
        //     [
        //       '@babel/plugin-transform-runtime',
        //       {
        //         absoluteRuntime: false,
        //         corejs: 2,
        //         helpers: true,
        //         regenerator: true,
        //         useESModules: false
        //       }
        //     ]
        //   ]
        // }
      },
      {
        test: /.(less|css|scss)$/,
        // loader的执行顺序，从下至上，从右到左
        //importLoaders: 2, scss中import的scss文件依然要走 sass-loader 和 postcss-loader 这俩个loader
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 2 } }, 'sass-loader', 'postcss-loader']
      },
      {
        test: /.(eot|svg|ttf|woff|woff2)$/,
        // loader的执行顺序，从下至上，从右到左
        //importLoaders: 2, scss中import的scss文件依然要走 sass-loader 和 postcss-loader 这俩个loader
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            // loader: 'url-loader',
            options: {
              // placeholder 占位符
              name: '[name]_[hash:5].[ext]',
              modules: true,
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin({
      root: __dirname + '/dist',
      verbose: true
      // dry: false
    })
  ],
  optimization: { usedExports: true }
}
