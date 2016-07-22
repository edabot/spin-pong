
var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

var gameOn = false;

function keyDown() {
  if (gameOn = false) { gameOn = true }
}

canvas.width = 900;
canvas.height = 700;

var field = {
  width: 800,
  height: 500
}

leftMargin = 50;
topMargin = 100;
paddleHeight = 100;

var score = {
  left: 0,
  right: 0
}

var particles = [];

var mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speeds: [0,0,0,0,0]
}

function addSpeed(speed){
  mouse.speeds.unshift(speed);
  mouse.speeds.pop();
}

function currentSpeed(speeds){
  var total = 0;
  for (var i = 0; i < speeds.length; i++) {
    total += speeds[i];
  }
  return total;
}

var ball = {
  x: leftMargin + 200,
  y: 350,
  dx: 3,
  dy: Math.random() * 2 - 1,
  ddy: 0,
  radius: 10
}

function resetBall(){
  ball.x = leftMargin + 600;
  ball.y = 350;
  ball.dx = -4;
  ball.dy = Math.random() * 2 - 1;
  ball.ddy = 0;
}

var paddleLeft = {
  height: paddleHeight,
  width: 10,
  x: leftMargin + 10,
  y: 100 + field.height / 2
}

var paddleRight = {
  height: paddleHeight,
  width: 10,
  x: leftMargin + field.width - 20,
  y: 100 + field.height / 2
}

function moveLeftPaddle(dy) {
  paddleLeft.y += dy
  if (paddleLeft.y < 0) { paddleLeft.y = 0 }
  if (paddleLeft.y > field.height + paddleHeight) { paddleLeft.y = field.height + paddleHeight}
}

function moveRightPaddle() {
  if (ball.y > paddleRight.y + 50) { paddleRight.y += 2.5 }
  if (ball.y < paddleRight.y + 50) { paddleRight.y -= 2.5 }
  if (paddleRight.y < 100) { paddleRight.y = 100 }
  if (paddleRight.y > field.height + 100) { paddleRight.y = field.height + 100}
}

function paddleHit(mouseSpeed) {
  var hitSpot = 0;
  if (ball.x + ball.dx < leftMargin + 30 - ball.dx &&
    ball.x + ball.dx > leftMargin + 20) {
    hitSpot = ball.y - paddleLeft.y - paddleHeight / 2
    if (Math.abs(hitSpot) < 55) {
      ball.x = leftMargin + 40
      ball.dx = -ball.dx;
      ball.dx += .5
      if (mouseSpeed > 1 || mouseSpeed < -1 ) ball.ddy = -mouseSpeed / 1000;
      ball.dy = (hitSpot / 80) * ball.dx;
    }
    if (ball.ddy > 0) { ball.dy = 0 }
  }
  if (ball.x + ball.dx > leftMargin + field.width - 30 - ball.dx  &&
      ball.x + ball.dx < leftMargin + field.width - 15) {

    hitSpot = ball.y - paddleRight.y
    if (hitSpot > -10 && hitSpot < 110) {
      ball.x = leftMargin + field.width - 30

      ball.dx = -ball.dx - .5;
      ball.ddy = 0;
    }
    if (ball.ddy > 0) { ball.dy = 0 }
  }
}

var lastMouseY = mouse.y;

var mouseSpeed = 0;

// window.addEventListener("resize", function(){
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   leftMargin = ((canvas.width - field.width) / 2);
// })

window.addEventListener("mousemove", function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
})

function showSpin(text) {
  c.font = "48px serif";
  c.fillStyle = "#ffffff";
  c.fillText(text, 10, 50);
}

function showScore(){
  c.font = "48px sans-serif";
  c.fillStyle = "#d0d0d0";
  c.fillText(score.left, leftMargin + 80, 60);
  c.fillText(score.right, leftMargin + 695, 60);
}

function drawBall(ball){
  c.beginPath();
  c.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
  c.fill();
  c.closePath();
}

function drawPaddle(paddle) {
  c.beginPath();
  c.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  c.fill();
  c.closePath();
}

function moveBall(ball) {
  // ceiling hit
  if (ball.y + ball.dy < 100 + ball.radius &&
      ball.x > leftMargin - ball.radius &&
      ball.x < leftMargin + field.width + ball.radius) {
    ball.dy = -ball.dy;
    //going right
    if (ball.dx > 0) {
      if (ball.ddy > 0) {
        ball.dy = ball.dy * (1 + Math.abs(ball.ddy) * 3);
      }
      if (ball.ddy < 0) {
        ball.dy -= Math.abs(ball.ddy) * 60;
        ball.dx += Math.abs(ball.ddy) * 10;
      }
    }
    //going left
    if (ball.dx < 0) {
      if (ball.ddy < 0) {
        ball.dy = ball.dy * (1 + Math.abs(ball.ddy) * 3);
      }
      if (ball.ddy > 0) {
        ball.dy -= Math.abs(ball.ddy) * 60;
        ball.dx += -ball.ddy * 10;
      }
    }
    ball.ddy = 0;
  }
  // floor hit

  if (ball.y + ball.dy > 100 + field.height - ball.radius &&
      ball.x > leftMargin - ball.radius &&
      ball.x < leftMargin + field.width + ball.radius) {
    ball.dy = -ball.dy;

    //going right
    if (ball.dx > 0) {
      //backspin
      if (ball.ddy < 0) {
        ball.dy = ball.dy * (1 + Math.abs(ball.ddy) * 3);
      }
      //forward spin
      if (ball.ddy > 0) {
        ball.dy += Math.abs(ball.ddy) * 60;
        ball.dx += ball.ddy * 10;
      }
    }

    //going left
    if (ball.dx > 0) {
      if (ball.ddy > 0) {
        ball.dy = ball.dy * (1 + Math.abs(ball.ddy) * 3);
      }
      if (ball.ddy < 0) {
        ball.dy += Math.abs(ball.ddy) * 60;
        ball.dx += -ball.ddy * 10;
      }
    }
    ball.ddy = 0;
  }


  // endzone hit
  if (ball.x + ball.dx < leftMargin + ball.radius - 50) {
    console.log(ball.dx);
    resetBall();
    score.right += 1;
  }
  if (ball.x + ball.dx > leftMargin + field.width - ball.radius + 50) {
    resetBall();
    score.left += 1;
  }


  ball.dy += ball.ddy;
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function drawGameField(){
  c.fillStyle = "#000000";
  c.fillRect(0,0, 10000, canvas.height);
  c.fillStyle = "green";
  var leftMargin = (canvas.width - field.width) / 2
  c.fillRect(leftMargin + 25, 90, field.width - 50, 10);
  c.fillRect(leftMargin + 25, 100 + field.height, field.width - 50, 10);
  showScore();
  // showSpin(ball.ddy);
}

function drawGamePieces() {
  c.fillStyle = "#ffffff";
  drawBall(ball);
  c.fillStyle = "#DAF8BC";
  drawPaddle(paddleLeft);
  drawPaddle(paddleRight);
}

function Particle(x, y, dx, dy, r, ddy) {
  var angle = Math.random() * 2 * Math.PI;
  var distance = Math.random() * 8.5
  if (ddy !== 0) { distance = 10 }
  this.x = x + Math.sin(angle) * distance;
  this.y = y + Math.cos(angle) * distance;
  this.dx = (Math.random() * 200 - 100) * Math.abs(ddy);
  this.dy = (Math.random() * 200 - 100) * Math.abs(ddy);

  if (ddy > 0) {
    this.dx += dx;
    this.dy += dy;
  }

  this.r = 3;
  this.opacity = 1.5;
  this.timeLeft = 4;
  this.blueness = 255 - Math.abs(ddy) * 10000;
  if (this.blueness < 0) {this.blueness = 0}

  this.update = function() {
    if (this.y + this.dy < 100 || this.y + this.dy > 100 + field.height) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= .93;
    this.dy *= .93;

    this.r -= .07;
    this.opacity -= .04;
    this.timeLeft -= .1;
    this.blueness += 25;
    if (this.blueness > 255) {this.blueness = 255}

    c.beginPath();
    c.fillStyle = "#ffffff";
    c.fillStyle = 'rgba(' + this.blueness + ',' + this.blueness +',' + '255, ' + this.opacity + ')';

    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();

  }

  this.remove = function() {
    return this.timeLeft <= 0;
  }
}

function addParticle() {
  for (var i = 0; i < 5; i++) {
    particles.push(new Particle(ball.x, ball.y, ball.dx, ball.dy, 5, ball.ddy));
  }
}

function drawParticles(){
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    if (particles[i].remove() === true) {
      particles.splice(i, 1);
    }
  }
}

function newGame(){
  resetBall();
  drawGameField();
  c.font = "48px sans-serif";
  c.fillStyle = "#d0d0d0";
  c.fillText("press any key to start", leftMargin + 160, 500);
  var image = new Image();
  image.src = "./images/spin-pong-intro.png";
  image.onload = function(){
       c.drawImage(image, leftMargin + 140, 120);
  }


  document.addEventListener('keydown', function(event) {
    animate();
  }, false);
}

function gameOver(){
  drawGameField();
  c.font = "48px sans-serif";
  c.fillStyle = "#d0d0d0";
  var message = "you win!"
  if (score.right > score.left) { message = "you lost"}
  c.fillText(message, leftMargin + 280, 200);
  c.fillText("press any key to play again", leftMargin + 100, 330);
  console.log(message);
  document.addEventListener('keydown', function(event) {
    score.left = 0;
    score.right = 0;
    animate();
  }, false);
}


function animate(){
  drawGameField();
  mouseSpeed = 1.5 * (mouse.y - lastMouseY);
  addSpeed(mouseSpeed);

  paddleHit(currentSpeed(mouse.speeds));
  moveBall(ball);
  moveLeftPaddle(mouseSpeed);
  moveRightPaddle();
  addParticle();
  drawParticles();
  drawGamePieces();

  lastMouseY = mouse.y;

  if (score.left >= 7 || score.right >= 7) {
    gameOver();
  } else {
    clearTimeout(animate);
    setTimeout(animate, 10);
  }
}

newGame();
