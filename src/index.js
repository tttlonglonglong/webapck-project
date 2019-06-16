console.log('this is delle')
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(registration => {
        console.log('service-worker 注册成功')
      })
      .catch(error => {
        console.log('service-worker error', error)
      })
  })
}
