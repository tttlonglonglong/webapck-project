const loaderutils = require('loader-utils')

// 1. 简单的loader
// module.exports = function(source) {
//   // webpapck 会在函数的this中添加一些方法
//   const options = loaderutils.getOptions(this)
//   console.log('loader---options', options)
//   console.log('this  query', this.query)
//   // console.log('this ', this)
//   return source.replace('dell', 'dellLee')
// }

// 2.this.callback的使用
// 如果接受不了到了源代码，只能对源代码进行处理
// 有时要做一些sourceMap，在返回源代码的同时，sourceMap也要带回去
// return 的时候只能return一个参数， sourceMap带不回去
// this.callback(
//   err: Error | null,
//   content: string | Buffer,
//   sourceMap?: SourceMap,
//   meta?: any
// );
// module.exports = function(source) {
//   // webpapck 会在函数的this中添加一些方法
//   const options = loaderutils.getOptions(this)
//   const result = source.replace('dell', 'dellLee')
//   // this.callback(null, result, source, meta)
//   this.callback(null, result)
// }

// 3.loader中的异步操作: this.async
module.exports = function(source) {
  // webpapck 会在函数的this中添加一些方法
  const options = loaderutils.getOptions(this)
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace('dell', 'world')
    // this.callback(null, result, source, meta)
    callback(null, result)
  }, 2000)
}
