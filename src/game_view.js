function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ship = this.game.addShip();
}

GameView.prototype.start = function start() {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function animate(time) {
  let shipPowerX = 0;
  let shipPowerY = 0;

  const timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;
  
  if (!this.game.snakes.length) {this.game.addMoreSnakes()}
 
  if (key.isPressed('space')) { this.ship.fireBullet() }
  if (key.isPressed('W') && this.ship.pos[1] > 515) { shipPowerY -= 5 }
  if (key.isPressed('A') && this.ship.pos[0] > 15) { shipPowerX -= 5 }
  if (key.isPressed('S') && this.ship.pos[1] < 645) { shipPowerY += 5 }
  if (key.isPressed('D') && this.ship.pos[0] < 425) { shipPowerX += 5 }

  this.ship.power([shipPowerX, shipPowerY])
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
