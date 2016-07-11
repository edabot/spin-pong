var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

var lastMouseY = mouse.y;

var mouseSpeed = 0;

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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

function animate(){
  clearTimeout(animate);
  setTimeout(animate, 10);
  c.fillStyle = "#a0a0a0";
  c.fillRect(0,0, canvas.width, canvas.height);
  c.strokeStyle = "green";
  c.strokeRect(10, 10, 100, 100);

  mouseSpeed = mouse.y - lastMouseY;
  lastMouseY = mouse.y;

  draw(mouseSpeed);
}

animate();
