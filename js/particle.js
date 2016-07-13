function Particle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.timeLeft = 1;

  this.update = function() {
    this.x += this.dx;
    this.y += this.dy;

    c.beginPath();
    c.fillStyle = "#00FF00";
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.closePath();

    this.timeLeft -= .1;
  }

  this.remove = function() {
    return this.timeLeft <= 0;
  }

}
