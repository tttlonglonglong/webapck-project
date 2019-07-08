const loaderutils = require('loader-utils')

// 1. 简单的loader
module.exports = function(source) {
  // webpapck 会在函数的this中添加一些方法
  const options = loaderutils.getOptions(this)
  console.log('loader---options', options)
  console.log('this  query', this.query)
  // console.log('this ', this)
  return source.replace('lee', 'dellLee')
}
