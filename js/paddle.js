
var paddleLeft = {
  height: 100,
  width: 10,
  x: leftMargin + 10,
  y: 100 + field.height / 2
}

var paddleRight = {
  height: 100,
  width: 10,
  x: leftMargin + field.width - 20,
  y: 100 + field.height / 2
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
  if (ball.x + ball.dx < leftMargin + 30) {
    hitSpot = ball.y - paddleLeft.y
    if (hitSpot > -10 && hitSpot < 110) {
      ball.dx = -ball.dx;
      ball.dx += .5
      if (mouseSpeed > 1 || mouseSpeed < -1 ) ball.ddy = -mouseSpeed / 1000;
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
  if (ball.x + ball.dx > leftMargin + field.width - 30) {
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
