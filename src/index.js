// import _ from 'lodash' // 1MB
async function getComponent() {
  //通过jsonP的方式，获取lodash的代码
  // Magic Comments
  // const _ = await import(/* webpackChunkName: "lodash" */ 'lodash')
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
    console.log('module', module)
    console.log('module.default', module.default)
    var element = document.createElement('div')
    element.innerHTML = _.join(['Dell', ' ', 'Lee'], '-')
    return element
  })
}

console.log('引入lodash之前')
// 业务逻辑1MB
// console.log(_.join(['1', 'b'], ['c']))
// // 此处省略业务代码10万行
// console.log(_.join(['1', 'b'], ['c']))
debugger
getComponent().then(element => {
  document.body.appendChild(element)
})
// 第一种方式：lodash 打包进 main.js
// 首次访问页面时，加载 main.js 2MB
// 当页面业务逻辑发生变化时，又要加载2MB的内容，打包文件过大，加载时间过长

// 第二种方式 lodash和main.js 多入口 分开打包
// main.js被拆分成lodash.js(1M), main.js(1M)
// 当业务逻辑发生变化时，只要加载main.js 即可（1M）

// codeSpliting
// webpack自动的做代码分割
