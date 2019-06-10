const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = {
  mode: 'production',
  output: {
    // publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
}

module.exports = merge(commonConfig, prodConfig)
