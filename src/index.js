import createAvatar from './createAvatar.js'
import style from './css/index.scss'
import testImg from './img/png.png'

createAvatar()
var img = new Image()
img.src = testImg
img.classList.add(style.avatar)
var root = document.getElementById('root')
root.appendChild(img)
console.log('testImg', testImg)
