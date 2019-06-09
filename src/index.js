// 1. 业务代码的分割
// import test from './test.js'
// console.log(test.name)

// 2.公共代码的分割
import _ from 'lodash'

var element = document.createElement('div')
element.innerHTML = _.join(['Dell', ' ', 'Lee'], '-')
document.body.appendChild(element)

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

getComponent().then(element => {
  document.body.appendChild(element)
})
