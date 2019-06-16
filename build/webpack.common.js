const path = require('path')
const webpack = require('webpack')
const ImageminPlugin = require('image-webpack-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

// console.log('NODE_ENV', NODE_ENV)
console.log('process. .NODE_ENV', process.env.NODE_ENV)

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer)
  } else if (m.name) {
    return m.name
  } else {
    return false
  }
}

module.exports = {
  entry: {
    bundle: './src/index.js'
    // lodash: './src/lodash.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
          // 有issue
          // { loader: 'imports-loader?this=>window' }
        ]
      },
      {
        test: /.(less|css|scss)$/,
        // loader的执行顺序，从下至上，从右到左
        //importLoaders: 2, scss中import的scss文件依然要走 sass-loader 和 postcss-loader 这俩个loader
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: devMode } },
          // { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'sass-loader',
          'postcss-loader'
        ]
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new CleanWebpackPlugin({
      // 废弃了，默认移除output的配置
      root: __dirname + '../',
      verbose: true
      // dry: false
    })
    // 垫片
    // new webpack.ProvidePlugin({
    //   $: 'jquery', // 模块中有 $ 字符串自动引入 jquery这个模块，并赋值给 $ 变量
    //   _: 'lodash',
    //   _join: ['lodash', 'join']
    // })
  ],
  optimization: {
    runtimeChunk: { name: 'runtime' },
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      // maxSize: 50000, // 50k, lodash 1MB
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          // filename: 'vendors.js',
          priority: -10
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        },
        // css 代码的合并
        fooStyles: {
          name: 'foo',
          test: (m, c, entry = 'foo') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        },
        barStyles: {
          name: 'bar',
          test: (m, c, entry = 'bar') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  performance: false
}
