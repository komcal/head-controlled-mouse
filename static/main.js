var socket = io.connect()
let alpha, beta, gamma
let alpha0, beta0, gamma0
function setStatus(text) {
  document.querySelector('#status').textContent = String(text)
}
function calibrate() {
  setStatus('Gonna calibrate in 5 seconds')
  setTimeout(() => {
    alpha0 = alpha
    beta0 = beta
    gamma0 = gamma
    setStatus(`Calibrated:
alpha=${alpha}
beta=${beta}
gamma=${gamma}`)
  }, 5000)
}
window.addEventListener('deviceorientation', function(event) {
  ;({ alpha, beta, gamma } = event)
  socket.emit('sensor', {
    alpha: alpha - alpha0,
    beta: beta - beta0,
    gamma: gamma - gamma0
  })
})

function onClickMouse(button) {
  socket.emit('clickMouse', {
    button
  })
}

function onScroll(direction) {
  socket.emit('scrollMouse', {
    direction
  })
}
let clickMode = false
function openMouseMode() {
  var clickWrapper = document.getElementById('click-wrapper')
  if(clickMode) {
    clickWrapper.style.display = 'none'
  } else {
    clickWrapper.style.display = 'flex'
  }
  clickMode = !clickMode
}
