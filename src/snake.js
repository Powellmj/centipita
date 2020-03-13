const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");
const Ship = require("./ship");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }
  
  return color;
}

function Snake(options) {
  options.pos = options.pos;
  options.radius = Snake.RADIUS;
  options.vel = options.vel || [-5, 0];
  options.color = options.color || randomColor();
  this.snakeDirection = 20
  MovingObject.call(this, options);
}

Util.inherits(Snake, MovingObject);

Snake.prototype.collide = function collide() {
  this.pos[1] += this.snakeDirection
  this.vel[0] = -this.vel[0]
}

Snake.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

Snake.prototype.collideWith = function collideWith(otherObject) {
  if (otherObject instanceof Bullet) {
    if (this === this.game.snakes[0]) {
      this.score += 90
    }
    this.game.score += 10
    Math.round(Math.random()) ? null : this.game.addMush(this.pos);
    this.remove();
    otherObject.remove();
    return true;
  } else if (otherObject instanceof Ship) {
    otherObject.remove();
  }
  return false;
};

Snake.RADIUS = 10;

Snake.prototype.isFlippable = true;

module.exports = Snake;
