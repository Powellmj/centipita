const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");

function Ship(options) {
  options.radius = Ship.RADIUS;
  options.vel = options.vel || [0, 0];
  options.color = options.color || '#ffd000';

  MovingObject.call(this, options);
}

Ship.RADIUS = 10;

Util.inherits(Ship, MovingObject);

Ship.prototype.isBlockable = true;

let fireRate = 0

Ship.prototype.fireBullet = function fireBullet() {
  const bullet = new Bullet({
    pos: this.pos,
    vel: [0,-10],
    color: this.color,
    game: this.game
  });

  if (fireRate === 0) {
    this.game.add(bullet);
    fireRate = 1
    setTimeout(() => {fireRate = 0}, 300)
  }
};

Ship.prototype.power = function power(impulse) {
  this.vel[0] = impulse[0];
  this.vel[1] = impulse[1];
};

Ship.prototype.relocate = function relocate() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

module.exports = Ship;
