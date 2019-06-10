// 1.lazy-load
// import _ from 'lodash' // 1MB
// async function getComponent() {
//   //通过jsonp的方式，获取lodash的代码
//   // Magic Comments
//   // ES7 的写法
//   const module = await import(/* webpackChunkName: "lodash" */ 'lodash')
//   console.log('module', module)
//   console.log('module.default', module.default)
//   var element = document.createElement('div')
//   element.innerHTML = _.join(['Dell', ' ', 'Lee'], '-')
//   return element

//   // ES6 的写法
//   // return import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
//   //   console.log('module', module)
//   //   console.log('module.default', module.default)
//   //   var element = document.createElement('div')
//   //   element.innerHTML = _.join(['Dell', ' ', 'Lee'], '-')
//   //   return element
//   // })
// }
// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     document.body.appendChild(element)
//   })
// })

// 2. Preload 和 Prefetch
document.addEventListener('click', () => {
  // import(/* webpackPreload: true */ 'ChartingLibrary')
  import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => {
    console.log(' .default', func)
    func()
  })
})
