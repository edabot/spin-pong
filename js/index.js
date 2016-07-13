
var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var field = {
  width: 800,
  height: 500
}

var score = {
  left: 0,
  right: 0
}

hmargin = ((canvas.width - field.width) / 2);

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
  console.log(speeds);
  console.log(total);
  return total / 5;
}

var ball = {
  x: 500,
  y: 300,
  dx: -3,
  dy: 0,
  ddy: 0,
  radius: 10
}

function resetBall(){
  ball.x = 500;
  ball.y = 400;
  ball.dx = -3;
  ball.dy = 0;
  ball.ddy = 0;
}

var paddleLeft = {
  height: 100,
  width: 10,
  x: hmargin + 10,
  y: 100 + field.height / 2
}

var paddleRight = {
  height: 100,
  width: 10,
  x: hmargin + field.width - 20,
  y: 100 + field.height / 2
}

function drawPaddle(paddle) {
  c.beginPath();
  c.fillStyle = "green";
  c.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  c.fill();
  c.closePath();
}

function moveLeftPaddle(dy) {
  paddleLeft.y += dy
  if (paddleLeft.y < 0) { paddleLeft.y = 0 }
  if (paddleLeft.y > field.height + 100) { paddleLeft.y = field.height + 100}
}

function moveRightPaddle() {
  if (ball.y > paddleRight.y + 50) { paddleRight.y += 3 }
  if (ball.y < paddleRight.y + 50) { paddleRight.y -= 3 }
  if (paddleRight.y < 100) { paddleRight.y = 100 }
  if (paddleRight.y > field.height) { paddleRight.y = field.height}
}

function paddleHit(mouseSpeed) {
  var hitSpot = 0;
  if (ball.x + ball.dx < hmargin + 30) {
    hitSpot = ball.y - paddleLeft.y
    if (hitSpot > -10 && hitSpot < 110) {
      ball.dx = -ball.dx;
      ball.dx += .5
      if (mouseSpeed > 1 || mouseSpeed < -1 ) ball.ddy = -mouseSpeed / 200;
    }
    if (hitSpot > -9 && hitSpot <= 0) { ball.dy = -5}
    if (hitSpot > 0 && hitSpot <= 11) { ball.dy = -4}
    if (hitSpot > 11 && hitSpot <= 22) { ball.dy = -3}
    if (hitSpot > 22 && hitSpot <= 33) { ball.dy = -2}
    if (hitSpot > 33 && hitSpot <= 45) { ball.dy = -1}
    if (hitSpot > 45 && hitSpot <= 55) { ball.dy = 0}
    if (hitSpot > 55 && hitSpot <= 66) { ball.dy = 1}
    if (hitSpot > 66 && hitSpot <= 77) { ball.dy = 2}
    if (hitSpot > 77 && hitSpot <= 88) { ball.dy = 3}
    if (hitSpot > 88 && hitSpot <= 100) { ball.dy = 4}
    if (hitSpot > 100 && hitSpot < 59) { ball.dy = 5}
    if (ball.ddy > 0) { ball.dy = 0 }
  }
  if (ball.x + ball.dx > hmargin + field.width - 30) {
    hitSpot = ball.y - paddleRight.y
    if (hitSpot > -10 && hitSpot < 110) {
      ball.dx = -ball.dx;
      ball.dx -= .5
    }
    if (hitSpot > -9 && hitSpot <= 0) { ball.dy = -5}
    if (hitSpot > 0 && hitSpot <= 11) { ball.dy = -4}
    if (hitSpot > 11 && hitSpot <= 22) { ball.dy = -3}
    if (hitSpot > 22 && hitSpot <= 33) { ball.dy = -2}
    if (hitSpot > 33 && hitSpot <= 45) { ball.dy = -1}
    if (hitSpot > 45 && hitSpot <= 55) { ball.dy = 0}
    if (hitSpot > 55 && hitSpot <= 66) { ball.dy = 1}
    if (hitSpot > 66 && hitSpot <= 77) { ball.dy = 2}
    if (hitSpot > 77 && hitSpot <= 88) { ball.dy = 3}
    if (hitSpot > 88 && hitSpot <= 100) { ball.dy = 4}
    if (hitSpot > 100 && hitSpot < 59) { ball.dy = 5}
    if (ball.ddy > 0) { ball.dy = 0 }
  }
}

var lastMouseY = mouse.y;

var mouseSpeed = 0;

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  hmargin = ((canvas.width - field.width) / 2);
})

window.addEventListener("mousemove", function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
})

function draw(text) {
  c.font = "48px serif";
  c.fillStyle = "#000000";
  c.fillText(text, 10, 50);
}

function showScore(){
  c.font = "48px serif";
  c.fillStyle = "#000000";
  c.fillText(score.left, hmargin + 300, 50);
  c.fillText(score.right, hmargin + 500, 50);

}

function drawBall(ball){
  c.beginPath();
  c.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
  c.fillStyle = "green";
  c.fill();
  c.closePath();
}

function moveBall(ball) {
  // ceiling hit
  if (ball.y + ball.dy < 100 + ball.radius) {
    ball.dy = -ball.dy;

    //going right
    if (ball.dx > 0) {
      if (ball.ddy > 0) {
        ball.dy = ball.dy * (1 + ball.ddy * 3);
      }
      if (ball.ddy < 0) {
        ball.dy = ball.dy * .8;
        ball.dx += ball.dy * .2;
      }
    }
    //going left
    if (ball.dx < 0) {
      if (ball.ddy < 0) {
        ball.dy = ball.dy * (1 + ball.ddy * 3);
      }
      if (ball.ddy > 0) {
        ball.dy = ball.dy * .8;
        ball.dx -= ball.dy * .2;
      }
    }
    ball.ddy = 0;
  }
  // floor hit
  if (ball.y + ball.dy > 100 + field.height - ball.radius) {
    ball.dy = -ball.dy;

    //going right
    if (ball.dx > 0) {
      if (ball.ddy < 0) {
        ball.dy = ball.dy * (1 + ball.ddy * 3);
      }
      if (ball.ddy > 0) {
        ball.dy = ball.dy * .8;
        ball.dx += ball.dy * .2;
      }
    }

    //going left
    if (ball.dx > 0) {
      if (ball.ddy > 0) {
        ball.dy = ball.dy * (1 + ball.ddy * 3);
      }
      if (ball.ddy < 0) {
        ball.dy = ball.dy * .8;
        ball.dx -= ball.dy * .2;
      }
    }
    ball.ddy = 0;
  }


  // endzone hit
  if (ball.x + ball.dx < hmargin + ball.radius) {
    resetBall();
    score.right += 1;
  }
  if (ball.x + ball.dx > hmargin + field.width - ball.radius) {
    resetBall();
    score.left += 1;
  }

  ball.dy += ball.ddy;
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function gameField(){
  c.strokeStyle = "green";
  var hmargin = (canvas.width - field.width) / 2
  c.strokeRect(hmargin, 100, field.width, field.height);
}

function animate(){
  clearTimeout(animate);
  setTimeout(animate, 10);
  c.fillStyle = "#ffffff";
  c.fillRect(0,0, 10000, canvas.height);
  gameField();
  mouseSpeed = mouse.y - lastMouseY;
  addSpeed(mouseSpeed);
  paddleHit(currentSpeed(mouse.speeds));
  drawBall(ball);
  moveBall(ball);
  moveLeftPaddle(mouseSpeed);
  moveRightPaddle();
  showScore();
  drawPaddle(paddleLeft);
  drawPaddle(paddleRight);
  lastMouseY = mouse.y;

  draw(ball.ddy);
}

animate();
