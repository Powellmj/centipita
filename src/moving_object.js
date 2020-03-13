const Util = require("./util");

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.collideWith = function collideWith(otherObject) {
  
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
MovingObject.prototype.move = function move(timeDelta) {
  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if (this.game.isOutOfBounds(this.pos, this.vel)) {
    if (this.isBlockable) {
      this.vel = [0,0];
    } else if (this.isFlippable && this.pos[1] >= 640) {
      this.snakeDirection = -this.snakeDirection
      this.pos[1] += this.snakeDirection;
      this.vel[0] = -this.vel[0];
    } else if (this.isFlippable && this.pos[1] < 540 && this.snakeDirection < 0) {
      this.snakeDirection = -this.snakeDirection
      this.pos[1] += this.snakeDirection;
      this.vel[0] = -this.vel[0];
    } else if (this.isFlippable) {
      this.pos[1] += this.snakeDirection;
      this.vel[0] = -this.vel[0];
    } else {
      this.remove();
    }
  }
};

MovingObject.prototype.remove = function remove() {
  this.game.remove(this);
};

module.exports = MovingObject;
