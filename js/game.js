import palet from './Pueblo_Paleta_RAA.png';
import andresito from './player.jpeg';
import music from './04 Pallet Town.mp3';
var audio = new Audio(music);
audio.play();

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var width
var height


var resize = function() {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
}
window.onresize = resize
resize()

var state = {
  position: {
    x: (width / 2),
    y: (height / 2)
  },
  movement: {
    x: 0,
    y: 0
  },
  rotation: 0,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
}

function update(progress) {
  var p = progress / 16

  // updateRotation(p)
  updateMovement(p)
  updatePosition(p)
}

function updateRotation(p) {
  if (state.pressedKeys.left) {
    // state.rotation -= p * 5
  }
  else if (state.pressedKeys.right) {
    // state.rotation += p * 5
  }
}

function updateMovement(p) {
  // Behold! Mathematics for mapping a rotation to it's x, y components
  var accelerationVector = {
    x: 0.1,
    y: 0.1,
  }



  // Limit movement speed
  if (state.movement.x > width) {
    state.movement.x = width
  }
  else if (state.movement.x < -width) {
    state.movement.x = -width
  }
  if (state.movement.y > height) {
    state.movement.y = height
  }
  else if (state.movement.y < -height) {

    state.movement.y = -height
  }
}

function updatePosition(p) {
  state.position.x += state.movement.x
  state.position.y += state.movement.y

  // Detect boundaries
  if (state.position.x > width) {
    state.position.x = width
  }
  else if (state.position.x < 0) {
    state.position.x = 0
  }
  if (state.position.y > height) {
    state.position.y = height
  }
  else if (state.position.y < 0) {
    state.position.y = 0
  }
}

var background = new Image();
background.src = palet
var and = new Image();
and.src = andresito

function draw() {
  ctx.drawImage(background,0,0,canvas.width,canvas.height);
  ctx.drawImage(and,state.position.x,state.position.y,and.width/2,and.height/2);
}

function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}
function keydown(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
  if (state.pressedKeys.up) {
    state.movement.y = -2
  }
  if (state.pressedKeys.down) {
    state.movement.y = 2
  }

  if (state.pressedKeys.right) {
    state.movement.x = 2
  }
  if (state.pressedKeys.left) {
    state.movement.x = -2
  }
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
  if (key === 'up') {
    window.location = '/pokemon.html';
    state.movement.y = 0
  }
  if (key === 'down') {
    state.movement.y = 0
  }

  if (key ==='right') {
    state.movement.x = 0
  }
  if (key === 'left') {
    state.movement.x = 0
  }
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)
