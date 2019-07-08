const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin.js')

module.exports = {
  mode: 'development',
  entry: { main: './src//index.js' },
  resolveLoader: { modules: ['node_modules', './loaders'] },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CopyrightWebpackPlugin({
      name: 'dell'
    }),
    new HtmlWebpackPlugin()
  ]
}
