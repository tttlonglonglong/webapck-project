const path = require('path')
module.exports = {
  mode: 'production',
  entry: './index.js',
  // externals配置就是为了使import _ from 'lodash'这句代码，在本身不引入lodash的情况下，能够在各个环境都能解释执行。
  externals:['lodash'],
  externals: {
    "lodash": {
          commonjs: "lodash",//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
          commonjs2: "lodash",//同上
          amd: "lodash",//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
          root: "_"//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
    }
  }，
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library', // 生成全局的 libraru变量，可以直接使用 library 变量
    // 1.umd，适配 amd commonjs es6 规范，2. libraryTarget: 'window'，library挂载到window变量上面，3.libraryTarget: 'window'，node环境global变量中使用
    libraryTarget: 'umd'
  }
}
