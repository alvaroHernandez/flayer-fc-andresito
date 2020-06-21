import palet from './Pueblo_Paleta_RAA.png';
import andresito from './player.jpeg';
import quien from '../img/quien.png';
import totodile from '../img/totodile.jpg';
import flyer from '../img/flyer.png';
import totobien from '../img/tototransparente.png';

import music from './04 Pallet Town.mp3';
import ludo from '../img/ludo.mp3';

import quienesaudio from './../img/quienesaudio.mp3';
var audio = new Audio(music);
audio.play();

var ludo2 = new Audio(ludo);
// canvas.addEventListener('ludo', playl, false);
// var ludoevent = new Event('ludo');
// function playl() {
//   ludo2.play();
// }

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
  stage: 1,
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


var audio2 = new Audio(quienesaudio);
audio2.loop = false;
canvas.addEventListener('quien', playq, false);
var quienevent = new Event('quien');
function playq() {
  audio2.play();
}
var moved = false
function update(progress) {
  var p = progress / 16

  // updateRotation(p)
  updateMovement(p)
  updatePosition(p)
  if(state.position.y === 0 && state.position.x < canvas.width/2 && state.position.x > canvas.width/2 - 100 && !moved){
    moved = true
    state.stage = 2;
    canvas.dispatchEvent(quienevent);

  }
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

var q = new Image();
q.src = quien


var toto = new Image();
toto.src = totodile

var fly = new Image();
fly.src = flyer

var totobien2 = new Image();
totobien2.src = totobien

var totoButton = {
  x:820,
  y:350,
  width:210,
  height:80,
  text: 'totodile'
};

var gatoButton = {
  x:820,
  y:450,
  width:210,
  height:80,
  text: 'gatoJuanito'
};

var andButton = {
  x:1080,
  y:350,
  width:210,
  height:80,
  text: 'andresito'
};

var maButton = {
  x:1080,
  y:450,
  width:210,
  height:80,
  text: 'la maite'
};

var flyerrect = {
  x:700,
  y:110,
  width:472,
  height:283,
  text: ''
};

function drawButton(button){
  ctx.beginPath();
  ctx.rect(button.x, button.y, button.width, button.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillStyle = 'rgba(225,225,225,0.5)';
  ctx.fillRect(25,72,32,32);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  ctx.closePath();
  ctx.font = '25pt Kremlin Pro Web';
  ctx.fillStyle = '#000000';
  ctx.fillText(button.text, button.x + 30, button.y + 50);
}

function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
function isInside(pos, rect){
  return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}
canvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  console.log(mousePos)
  console.log(totoButton)
  if (isInside(mousePos,totoButton)) {
    ludo2.play();
    state.stage = 3;
    setTimeout(() => {
      window.location = 'https://thoughtworks.zoom.us/j/91042477005?pwd=NWN0R3doNG1XcGM1RHVuZXA0MEs2UT09'
    }, 2000);
  }
}, false);




function draw() {
  // console.log(state.position.y, state.position.x)
  if(state.stage === 1){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    ctx.drawImage(and,state.position.x,state.position.y,and.width/2,and.height/2);
  }else if(state.stage === 2){
    ctx.drawImage(toto,0,0,canvas.width,canvas.height);
    drawButton(totoButton)
    drawButton(gatoButton)
    drawButton(andButton)
    drawButton(maButton)
  }else if(state.stage === 3){
    ctx.drawImage(totobien2,200,110);
    ctx.drawImage(fly,500,110);

  }

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
