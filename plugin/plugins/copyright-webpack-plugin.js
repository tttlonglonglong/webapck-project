class CopyrightWebpackPlugin {
  constructor(options) {
    console.log('插件被使用了', options)
  }
  apply(compiler) {
    // apply 接收 compiler函数，webpack的实例
    // compiler：存放了配置的所有内容，包括了打包的所有相关内容
    // console.log('compiler', compiler.hooks.emit)

    // 2. 同步的hooks
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {
      console.log('sync hooks compile')
    })

    // 1. 异步的hooks
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      //compilation: 存放了这一次打包相关的内容
      console.log(12121213)
      //compilation.asset: 打包生成的内容
      console.log(compilation.assets)

      compilation.assets['copyright.txt'] = {
        // 内容
        source: function() {
          return 'copyright by test'
        },
        // 字符长度
        size: function() {
          return 17
        }
      }
      cb()
    })
  }
}

module.exports = CopyrightWebpackPlugin
