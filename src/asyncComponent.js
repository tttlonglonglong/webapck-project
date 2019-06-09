function getComponent() {
  //通过jsonP的方式，获取lodash的代码
  return import('lodash').then(({ default: _ }) => {
    console.log('异步引入的模块', _)
    var element = document.createElement('div')
    element.innerHTML = _.join(['Dell', ' ', 'Lee']'-')
    return element
  })
}

getComponent().then(element =>{
  document.body.appendChild(element)
})
