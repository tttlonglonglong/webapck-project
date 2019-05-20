// import testImg from './img/test.jpg'
import testImg from './img/png.png'

var img = new Image()
img.src = testImg
img.classList.add('avatar')
var root = document.getElementById('root')
root.appendChild(img)
console.log('testImg', testImg)
