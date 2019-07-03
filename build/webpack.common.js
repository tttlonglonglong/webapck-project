const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

// const plugins = [
//   new HtmlWebpackPlugin({
//     template: './index.html',
//     // 打包之后的文件名
//     filename: 'index.html',
//     // 这个html要引入哪些模块
//     chunks: ['runtime', 'vendors', 'main']
//   }),
//   new HtmlWebpackPlugin({
//     template: './index.html',
//     filename: 'list.html',
//     chunks: ['runtime', 'vendors', 'list']
//   }),
//   new CleanWebpackPlugin()
// ]

const config = {
  entry: {
    main: './src/index.js',
    list: './src/list.js',
    detail: './src/detail.js'
  },
  resolve: {
    // 引入目录下的模块的时候，找对应文件js结尾和jsx 结尾的文件
    extensions: ['.js', 'jsx'],
    // extensions: ['.css', '.png', '.js', 'jsx']
    // 默认找文件下的 文件
    mainFiles: ['index', 'child'],
    // 别名
    alias: {
      dellee: path.resolve(__dirname, '../src/child/child.jsx')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // 只对某些文件夹下的文件进行处理
        include: path.resolve(__dirname, '../src'),
        // 不打包node_module的代码
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
          // ,{
          //   loader: 'imports-loader?this=>window'
          // }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        }
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  // plugins: plugins,
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './index.html'
  //   }),
  //   new webpack.DllReferencePlugin({
  //     // context: __dirname,
  //     manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
  //     // scope: 'xyz',
  //     // sourceType: 'commonjs2'
  //   }),
  //   new webpack.DllReferencePlugin({
  //     // context: __dirname,
  //     manifest: path.resolve(__dirname, '../dll/react.manifest.json')
  //     // scope: 'xyz',
  //     // sourceType: 'commonjs2'
  //   }),
  //   new addAssetHtmlWebpackPlugin({
  //     filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
  //   }),
  //   new addAssetHtmlWebpackPlugin({
  //     filepath: path.resolve(__dirname, '../dll/react.dll.js')
  //   }),

  //   new CleanWebpackPlugin()
  //   //   {
  //   //   root: path.resolve(__dirname, '../dist')
  //   // }
  //   // new webpack.ProvidePlugin({
  //   //   $: 'jquery',
  //   //   _join: ['lodash', 'join']
  //   // })
  // ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    // css文件不treeShaking
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          // nodemodule 放到一个chunk
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  },
  // 不显示打包过程的性能问题
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist')
  }
}

const makePlugins = configs => {
  const plugins = [new CleanWebpackPlugin()]

  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: './index.html',
        // 打包之后的文件名
        filename: `${item}.html`,
        // 这个html要引入哪些模块
        chunks: ['runtime', 'vendors', item]
      })
    )
  })
  // new HtmlWebpackPlugin({
  //   template: './index.html',
  //   // 打包之后的文件名
  //   filename: 'index.html',
  //   // 这个html要引入哪些模块
  //   chunks: ['runtime', 'vendors', 'main']
  // })

  const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
  files.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new addAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, '../dll', file)
        })
      )
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, '../dll', file)
        })
      )
    }
  })

  return plugins
}

config.plugins = makePlugins(config)
module.exports = config
