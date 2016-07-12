var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var field = {
  width: 800,
  height: 500
}

hmargin = ((canvas.width - field.width) / 2);

var mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

var ball = {
  x: 400,
  y: 200,
  dx: -2,
  dy: -2,
  radius: 10
}

var paddleLeft = {
  height: 100,
  width: 10,
  x: hmargin + 10,
  y: 100 + field.height / 2
}

function drawPaddle(paddle) {
  c.beginPath();
  c.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  c.fillStyle = "green";
  c.fill();
  c.closePath();
}

function movePaddle(paddle, dy) {
  paddle.y += dy;
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

function drawBall(ball){
  c.beginPath();
  c.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
  c.fillStyle = "green";
  c.fill();
  c.closePath();
}

function moveBall(ball) {
  if (ball.y + ball.dy < 100 + ball.radius || ball.y + ball.dy > 100 + field.height - ball.radius) { ball.dy = -ball.dy }
  if (ball.x + ball.dx < hmargin + ball.radius || ball.x + ball.dx > hmargin + field.width - ball.radius) { ball.dx = -ball.dx }
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

  drawBall(ball);
  moveBall(ball);
  mouseSpeed = mouse.y - lastMouseY;
  movePaddle(paddleLeft, mouseSpeed);

  drawPaddle(paddleLeft);
  lastMouseY = mouse.y;

  draw(mouseSpeed);
}

animate();
