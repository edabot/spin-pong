
const Paddle = function(x){
  this.x = x;
  this.y = 400;
  this.height = 100;
  this.width = 10;
}

Paddle.prototype.draw(paddle) {
  c.beginPath();
  c.fillStyle = "green";
  c.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  c.fill();
  c.closePath();
}

 Paddle.prototype.handleMove = function(height, dy) {
  this.y += dy
  if (this.y < 0) { this.y = 0 }
  if (this.y > height + 100) { this.y = height + 100}
}

Paddle.prototype.chaseBall(ball) {
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
