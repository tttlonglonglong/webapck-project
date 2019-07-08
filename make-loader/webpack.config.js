const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: { main: './src//index.js' },
  resolveLoader: { modules: ['node_modules', './loaders'] },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
            loader: 'replaceLoader',
            options: {
              name: 'lee'
            }
          },
          {
            // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
            loader: 'replaceLoaderAsync',
            options: {
              name: 'lee'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [new HtmlWebpackPlugin()]
}
