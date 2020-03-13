const Util = require("./util");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Snake = require("./snake");

const DEFAULTS = {
  COLOR: "#ff0000",
  RADIUS: 10
};

let mushroomPos = []
for (i = 10; i < 430; i += 20) {
  for (j = 10; j < 500; j += 20) {
    mushroomPos.push([i, j])
  }
}

randomPosition = function randomPosition() {
  return mushroomPos[Math.floor(mushroomPos.length * Math.random())]
};

function Mushroom(options) {
  options = options || {};
  this.color = DEFAULTS.COLOR;
  this.pos = options.pos || randomPosition();
  this.radius = DEFAULTS.RADIUS;
  this.game = options.game
  this.state = 0
} 

Mushroom.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

Mushroom.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

Mushroom.prototype.collideWith = function collideWith(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.vel = [0,0];
    return true;
  } else if (otherObject instanceof Bullet) {
    this.remove();
    otherObject.remove();
    return true;
  } else if (otherObject instanceof Snake) {
    otherObject.pos[1] += otherObject.snakeDirection;
    otherObject.vel[0] = -otherObject.vel[0];
    return true;
  }
  return false;
};

Mushroom.prototype.remove = function remove() {
  switch (this.state) {
    case 0:
      this.state += 1
      this.color = '#d80000'
      break
    case 1:
      this.state += 1
      this.color = '#a30000'
      break
    case 2:
      this.state += 1
      this.color = '#690000'
      break
    case 3:
      this.game.score += 1
      this.game.remove(this);
      break
  }
};


module.exports = Mushroom;
