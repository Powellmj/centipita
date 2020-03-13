const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Mushroom = require("./mushroom");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

function randomPos() {
  let x = Math.round(Math.random()) ? 0 : 660
  let y = (240 * Math.random()) + 400;
  return [x, y]
};

function Spider(options) {
  options.pos = randomPos();
  options.radius = Spider.RADIUS;
  options.vel = options.pos[0] ? [-3, 3] : [3, 3];
  options.color = '#a600d8' || randomColor();
  this.switchDir = true

  MovingObject.call(this, options);
}

Util.inherits(Spider, MovingObject);

Spider.RADIUS = 10;

Spider.prototype.isDeletable = true;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
Spider.prototype.move = function move(timeDelta) {
  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;


  if ((1 >= Math.floor(100 * Math.random()) && this.switchDir) || (this.pos[1] < 500 && this.vel[1] < 0 && this.switchDir)) {
    this.switchDir = false
    setTimeout(() => {
      this.vel[1] = -this.vel[1] 
      this.switchDir = true
    }, 200)
  }  

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if (this.game.isOutOfBounds(this.pos, this.vel)) {
    if (this.pos[1] > 640) {
      this.vel[1] = -this.vel[1]
    } else {
    this.remove();
    }
  }
};

Spider.prototype.collideWith = function collideWith(otherObject) {
  if (otherObject instanceof Bullet) {
    if (this.pos[1] - this.game.ships[0].pos[1] < -200) {
      this.game.score += 900
    } else if (this.pos[1] - this.game.ships[0].pos[1] < -150) {
      this.game.score += 600
    } else {
      this.game.score += 300
    }
    this.remove();
    otherObject.remove();
    return true;
  } else if (otherObject instanceof Ship) {
    otherObject.remove();
    return true;
  } else if (otherObject instanceof Mushroom) {
    otherObject.remove();
    return true;
  }
  return false;
};

module.exports = Spider;
