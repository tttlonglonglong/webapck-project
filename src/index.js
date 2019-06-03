import '@babel/polyfill'
import './index.scss'

const arr = [new Promise(() => {}), new Promise(() => {})]
arr.map(item => {
  console.log('arr-map-item', item)
})
