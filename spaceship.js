//used w3schools for reference

$(document).ready( function() {
  $('p').hide();
  $('button').hide();
})

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var positionX = 375;
var positionY = 400;

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(positionX, positionY, 50, 50);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function asteroid(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
}

function drawAsteroid(asteroid){
  ctx.beginPath();
  ctx.arc(asteroid.x, asteroid.y, 10, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

function moveAsteroid(asteroid) {
  if (asteroid.y < canvas.height) {
    asteroid.y += asteroid.speed;
  }
  else {
    asteroid.y = 10;
    asteroid.x = Math.random() * (canvas.width - 10);
  }
}

var asteroids = [];
for (var i=0 ; i<8 ; i++) {
  asteroids.push( new asteroid( Math.random() * (canvas.width - 10) , Math.random() * 100, Math.random() * 4 + 2));
}

function collisionDetection(asteroid) {
  if (positionX + 50 > asteroid.x - 10 && positionX < asteroid.x + 10 && positionY + 50 > asteroid.y - 10 && positionY < asteroid.y + 10) {
      $('#gameCanvas').hide();
      $('p').show();
      $('button').show();
      clearInterval(interval);
  }
}

function particle(speed) {
  this.x = positionX + 25;
  this.y = positionY;
  this.speed = speed;
}

function drawParticle(particle) {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
  ctx.strokeStyle = 'blue';
  ctx.stroke();
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

function moveParticle(particle) {
  if (particle.y < canvas.height) {
    particle.y -= particle.speed;
  }
  else {
    particles.splice(particle);
  }
}

var particles = [];
function createParticle(){
  particles.push( new particle(4));
}

function particleCollisionDetection(particle, asteroid) {
  if (particle.x + 2 > asteroid.x - 10 && particle.x - 2 < asteroid.x + 10 && particle.y + 2 > asteroid.y - 10 && particle.y - 2 < asteroid.y + 10) {
    asteroid.y = 10;
    asteroid.x = Math.random() * (canvas.width - 10);
  }
}

document.addEventListener("keydown" , keyDownHandler , false);
document.addEventListener("keyup" ,  keyUpHandler , false);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

function keyDownHandler(pressed) {
  if (pressed.keyCode == 39) {
    rightPressed = true;
  }
  else if (pressed.keyCode == 37) {
    leftPressed = true;
  }
  else if (pressed.keyCode == 38) {
    upPressed = true;
  }
  else if (pressed.keyCode == 40) {
    downPressed = true;
  }
  else if (pressed.keyCode == 32) {
    spacePressed = true;
  }
}

function keyUpHandler(pressed) {
  if (pressed.keyCode == 39) {
    rightPressed = false;
  }
  else if (pressed.keyCode == 37) {
    leftPressed = false;
  }
  else if (pressed.keyCode == 38) {
    upPressed = false;
  }
  else if (pressed.keyCode == 40) {
    downPressed = false;
  }
  else if (pressed.keyCode == 32) {
    spacePressed = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  for (var i=0 ; i<asteroids.length ; i++) {
    moveAsteroid(asteroids[i]);
    drawAsteroid(asteroids[i]);
    collisionDetection(asteroids[i]);
  }

  if (rightPressed == true && positionX < canvas.width - 50) {
    positionX += 5;
  }
  if (leftPressed == true && positionX > 0) {
    positionX -= 5;
  }
  if (upPressed == true && positionY > 0) {
    positionY -= 5;
  }
  if (downPressed == true && positionY < canvas.height - 50) {
    positionY += 5;
  }
  if (spacePressed == true) {
    createParticle();
  }

  for (var i=0 ; i<particles.length ; i++) {
    moveParticle(particles[i]);
    drawParticle(particles[i]);
    for (var k=0 ; k<asteroids.length ; k++) {
      particleCollisionDetection(particles[i] , asteroids[k]);
    }
  }
}

var interval = setInterval(draw, 10);
