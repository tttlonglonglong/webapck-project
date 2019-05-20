console.log('index.js')
import testImg from './img/test.jpg'
// var testImg = require('./img/test.jpg')

var img = new Image()
img.src = testImg
var root = document.getElementById('root')
root.appendChild(img)
console.log('testImg', testImg)
