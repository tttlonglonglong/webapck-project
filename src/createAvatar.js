import testImg from './img/png.png'

function createAvatar() {
  var img = new Image()
  img.src = testImg
  img.classList.add('avatar')
  var root = document.getElementById('root')
  root.appendChild(img)
}
export default createAvatar
