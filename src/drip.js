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

function Drip(options) {
  options.pos = options.pos;
  options.radius = Drip.RADIUS;
  options.vel = options.vel || [-3, 0];
  options.color = options.color || randomColor();

  MovingObject.call(this, options);
}

Util.inherits(Drip, MovingObject);

Drip.prototype.collide = function collide() {
  this.pos[1] += 10
  this.vel[0] = -this.vel[0]
}

Drip.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

Drip.prototype.collideWith = function collideWith(otherObject) {
  if (otherObject instanceof Bullet) {
    this.remove();
    otherObject.remove();
    return true;
  } else if (otherObject instanceof Ship) {
    otherObject.remove();
  }
  return false;
};

Drip.RADIUS = 10;

Drip.prototype.isFlippable = true;

module.exports = Drip;
