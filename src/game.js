const Mushroom = require("./mushroom");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Snake = require("./snake");
const Spider = require("./spider");
const Drip = require("./drip");
const Util = require("./util");

function Game() {
  this.mushrooms = [];
  this.bullets = [];
  this.ships = [];
  this.snakes = [];
  this.spiders = [];
  this.drips = [];

  this.addMushrooms();
  this.addSnakes();
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 440;
Game.DIM_Y = 660;
Game.FPS = 32;
Game.NUM_MUSHROOMS = 25;
Game.NUM_SNAKES = 12;

Game.prototype.add = function add(object) {
  if (object instanceof Mushroom) {
    this.mushrooms.push(object);
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
  } else if (object instanceof Ship) {
    this.ships.push(object);
  } else if (object instanceof Snake) {
    this.snakes.push(object);
  } else if (object instanceof Drip) {
    this.drips.push(object);
  } else if (object instanceof Spider) {
    this.spiders.push(object);
  } else {
    throw new Error("unknown type of object");
  }
};

Game.prototype.addMushrooms = function addMushrooms() {
  for (let i = 0; i < Game.NUM_MUSHROOMS; i++) {
    this.add(new Mushroom({ game: this }));
  }
};

Game.prototype.addMush = function addMush(pos) {
  this.add(new Mushroom({ game: this, pos: pos }));
}

let dripCall = true
Game.prototype.addDrips = function addDrips() {
  if (dripCall) {
    dripCall = false
    setTimeout(() => {
      this.add(new Drip({ game: this }));
      dripCall = true
    }, 5000)
  }
};

let spiderCall = true
Game.prototype.addSpiders = function addSpiders() {
  if (spiderCall) {
    spiderCall = false
    setTimeout(() => {
      this.add(new Spider({ game: this }));
      spiderCall = true
    }, 5000)
  }
};

let snakeCall = true
Game.prototype.addMoreSnakes = function addMoreSnakes() {
  if (snakeCall) {
    snakeCall = false
    setTimeout(() => {
      for (let i = 0; i < Game.NUM_SNAKES * 20; i += 20) {
        this.add(new Snake({ game: this, pos: [440 + i, 10] }));
      }
      snakeCall = true
    }, 2000)
  }
};

Game.prototype.addSnakes = function addSnakes() {
  for (let i = 0; i < Game.NUM_SNAKES * 20; i += 20) {
    this.add(new Snake({ game: this, pos: [440 + i, 10] }));
  }
};

Game.prototype.addShip = function addShip() {
  const ship = new Ship({
    pos: [230, 600],
    game: this
  });

  this.add(ship);

  return ship;
};

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.ships, this.snakes, this.spiders, this.bullets, this.drips);
};

Game.prototype.checkCollisions = function checkCollisions() {
  const allObjects = this.allObjects().concat(this.mushrooms);
  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      const obj1 = allObjects[i];
      const obj2 = allObjects[j];

      if (obj1.isCollidedWith(obj2)) {
        const collision = obj1.collideWith(obj2);
        if (collision) return;
      }
    }
  }
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().concat(this.mushrooms).forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.isOutOfBounds = function isOutOfBounds(pos, vel) {
  return (pos[0] < 10 && vel[0] < 0) || (pos[1] < 10 && vel[1] < 0) ||
    (pos[0] > Game.DIM_X -10 && vel[0] > 0) || (pos[1] > Game.DIM_Y -10 && vel[1] > 0);
};

Game.prototype.moveObjects = function moveObjects(delta) {
  this.allObjects().forEach(function (object) {
    object.move(delta);
  });
};

let mushroomPos = []
for (i = 0; i < Game.DIM_X; i += 20) {
  for (j = 0; j < Game.DIM_Y; j += 20) {
    mushroomPos.push([i, j])
  }
}

Game.prototype.randomPosition = function randomPosition() {
  return mushroomPos[Math.floor(mushroomPos.length * Math.random())]
};

Game.prototype.remove = function remove(object) {
  if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if (object instanceof Mushroom) {
    this.mushrooms.splice(this.mushrooms.indexOf(object), 1);
  } else if (object instanceof Ship) {
    this.ships.splice(this.ships.indexOf(object), 1);
  } else if (object instanceof Snake) {
    this.snakes.splice(this.snakes.indexOf(object), 1);
  } else if (object instanceof Drip) {
    this.drips.splice(this.drips.indexOf(object), 1);
  } else if (object instanceof Spider) {
    this.spiders.splice(this.spiders.indexOf(object), 1);
  } else {
    throw new Error("unknown type of object");
  }
};

Game.prototype.step = function step(delta) {
  this.moveObjects(delta);
  this.checkCollisions();
};

Game.prototype.wrap = function wrap(pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ];
};

module.exports = Game;
