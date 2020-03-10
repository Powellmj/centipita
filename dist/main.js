/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Bullet(options) {\n  options.radius = Bullet.RADIUS;\n\n  MovingObject.call(this, options);\n}\n\nBullet.RADIUS = 2;\nBullet.SPEED = 15;\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Mushroom = __webpack_require__(/*! ./mushroom */ \"./src/mushroom.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Game() {\n  this.mushrooms = [];\n  this.bullets = [];\n  this.ships = [];\n  this.snakes = [];\n\n  this.addMushrooms();\n  this.addSnakes();\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 440;\nGame.DIM_Y = 660;\nGame.FPS = 32;\nGame.NUM_MUSHROOMS = 25;\nGame.NUM_SNAKES = 8;\n\nGame.prototype.add = function add(object) {\n  if (object instanceof Mushroom) {\n    this.mushrooms.push(object);\n  } else if (object instanceof Bullet) {\n    this.bullets.push(object);\n  } else if (object instanceof Ship) {\n    this.ships.push(object);\n  } else if (object instanceof Snake) {\n    this.snakes.push(object);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.addMushrooms = function addMushrooms() {\n  for (let i = 0; i < Game.NUM_MUSHROOMS; i++) {\n    this.add(new Mushroom({ game: this }));\n  }\n};\n\nlet snakeCall = true\nGame.prototype.addMoreSnakes = function addMoreSnakes() {\n  if (snakeCall) {\n    snakeCall = false\n    setTimeout(() => {\n      for (let i = 0; i < Game.NUM_SNAKES * 20; i += 20) {\n        this.add(new Snake({ game: this, pos: [440 + i, 10] }));\n      }\n      snakeCall = true\n    }, 2000)\n  }\n};\n\nGame.prototype.addSnakes = function addSnakes() {\n  for (let i = 0; i < Game.NUM_SNAKES * 20; i += 20) {\n    this.add(new Snake({ game: this, pos: [440 + i, 10] }));\n  }\n};\n\nGame.prototype.addShip = function addShip() {\n  const ship = new Ship({\n    pos: [230, 600],\n    game: this\n  });\n\n  this.add(ship);\n\n  return ship;\n};\n\nGame.prototype.allObjects = function allObjects() {\n  return [].concat(this.ships, this.snakes, this.bullets);\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n  const allObjects = this.allObjects().concat(this.mushrooms);\n  for (let i = 0; i < allObjects.length; i++) {\n    for (let j = 0; j < allObjects.length; j++) {\n      const obj1 = allObjects[i];\n      const obj2 = allObjects[j];\n\n      if (obj1.isCollidedWith(obj2)) {\n        const collision = obj1.collideWith(obj2);\n        if (collision) return;\n      }\n    }\n  }\n};\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BG_COLOR;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n  this.allObjects().concat(this.mushrooms).forEach(function (object) {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.isOutOfBounds = function isOutOfBounds(pos, vel) {\n  return (pos[0] < 10 && vel[0] < 0) || (pos[1] < 10 && vel[1] < 0) ||\n    (pos[0] > Game.DIM_X -10 && vel[0] > 0) || (pos[1] > Game.DIM_Y -10 && vel[1] > 0);\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n  this.allObjects().forEach(function (object) {\n    object.move(delta);\n  });\n};\n\nlet mushroomPos = []\nfor (i = 0; i < Game.DIM_X; i += 20) {\n  for (j = 0; j < Game.DIM_Y; j += 20) {\n    mushroomPos.push([i, j])\n  }\n}\n\nGame.prototype.randomPosition = function randomPosition() {\n  console.log(mushroomPos[Math.floor(mushroomPos.length * Math.random())])\n  return mushroomPos[Math.floor(mushroomPos.length * Math.random())]\n};\n\nGame.prototype.remove = function remove(object) {\n  if (object instanceof Bullet) {\n    this.bullets.splice(this.bullets.indexOf(object), 1);\n  } else if (object instanceof Mushroom) {\n    this.mushrooms.splice(this.mushrooms.indexOf(object), 1);\n  } else if (object instanceof Ship) {\n    this.ships.splice(this.ships.indexOf(object), 1);\n  } else if (object instanceof Snake) {\n    this.snakes.splice(this.snakes.indexOf(object), 1);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.step = function step(delta) {\n  this.moveObjects(delta);\n  this.checkCollisions();\n};\n\nGame.prototype.wrap = function wrap(pos) {\n  return [\n    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n  ];\n};\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n  this.ctx = ctx;\n  this.game = game;\n  this.ship = this.game.addShip();\n}\n\nGameView.prototype.start = function start() {\n  this.lastTime = 0;\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nGameView.prototype.animate = function animate(time) {\n  let shipPowerX = 0;\n  let shipPowerY = 0;\n\n  const timeDelta = time - this.lastTime;\n\n  this.game.step(timeDelta);\n  this.game.draw(this.ctx);\n  this.lastTime = time;\n  \n  if (!this.game.snakes.length) {this.game.addMoreSnakes()}\n \n  if (key.isPressed('space')) { this.ship.fireBullet() }\n  if (key.isPressed('W') && this.ship.pos[1] > 515) { shipPowerY -= 5 }\n  if (key.isPressed('A') && this.ship.pos[0] > 15) { shipPowerX -= 5 }\n  if (key.isPressed('S') && this.ship.pos[1] < 645) { shipPowerY += 5 }\n  if (key.isPressed('D') && this.ship.pos[0] < 425) { shipPowerX += 5 }\n\n  this.ship.power([shipPowerX, shipPowerY])\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game();\n  new GameView(game, ctx).start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.collideWith = function collideWith(otherObject) {\n  // default do nothing\n};\n\nMovingObject.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  );\n  ctx.fill();\n};\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n  const centerDist = Util.dist(this.pos, otherObject.pos);\n  return centerDist < (this.radius + otherObject.radius);\n};\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\nMovingObject.prototype.move = function move(timeDelta) {\n  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    offsetX = this.vel[0] * velocityScale,\n    offsetY = this.vel[1] * velocityScale;\n\n  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n  if (this.game.isOutOfBounds(this.pos, this.vel)) {\n    if (this.isBlockable) {\n      this.vel = [0,0];\n    } else if (this.isFlippable) {\n      this.pos[1] += 20;\n      this.vel[0] = -this.vel[0];\n    } else {\n      this.remove();\n    }\n  }\n};\n\nMovingObject.prototype.remove = function remove() {\n  this.game.remove(this);\n};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/mushroom.js":
/*!*************************!*\
  !*** ./src/mushroom.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#ff0000\",\n  RADIUS: 10\n};\n\nlet mushroomPos = []\nfor (i = 10; i < 430; i += 20) {\n  for (j = 10; j < 500; j += 20) {\n    mushroomPos.push([i, j])\n  }\n}\n\nrandomPosition = function randomPosition() {\n  return mushroomPos[Math.floor(mushroomPos.length * Math.random())]\n};\n\nfunction Mushroom(options) {\n  options = options || {};\n  this.color = DEFAULTS.COLOR;\n  this.pos = randomPosition();\n  this.radius = DEFAULTS.RADIUS;\n  this.game = options.game\n  this.state = 0\n} \n\nMushroom.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  );\n  ctx.fill();\n};\n\nMushroom.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n  const centerDist = Util.dist(this.pos, otherObject.pos);\n  return centerDist < (this.radius + otherObject.radius);\n};\n\nMushroom.prototype.collideWith = function collideWith(otherObject) {\n  if (otherObject instanceof Ship) {\n    otherObject.vel = [0,0];\n    return true;\n  } else if (otherObject instanceof Bullet) {\n    this.remove();\n    otherObject.remove();\n    return true;\n  } else if (otherObject instanceof Snake) {\n    otherObject.pos[1] += 20;\n    otherObject.vel[0] = -otherObject.vel[0];\n    return true;\n  }\n  return false;\n};\n\nMushroom.prototype.remove = function remove() {\n  switch (this.state) {\n    case 0:\n      this.state += 1\n      this.color = '#b40000'\n      break\n    case 1:\n      this.state += 1\n      this.color = '#420000'\n      break\n    case 2:\n      this.game.remove(this);\n      break\n  }\n};\n\n\nmodule.exports = Mushroom;\n\n\n//# sourceURL=webpack:///./src/mushroom.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Ship(options) {\n  options.radius = Ship.RADIUS;\n  options.vel = options.vel || [0, 0];\n  options.color = options.color || '#ffd000';\n\n  MovingObject.call(this, options);\n}\n\nShip.RADIUS = 10;\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.isBlockable = true;\n\nlet fireRate = 0\n\nShip.prototype.fireBullet = function fireBullet() {\n  const bullet = new Bullet({\n    pos: this.pos,\n    vel: [0,-10],\n    color: this.color,\n    game: this.game\n  });\n\n  if (fireRate === 0) {\n    this.game.add(bullet);\n    fireRate = 1\n    setTimeout(() => {fireRate = 0}, 300)\n  }\n};\n\nShip.prototype.power = function power(impulse) {\n  this.vel[0] = impulse[0];\n  this.vel[1] = impulse[1];\n};\n\nShip.prototype.relocate = function relocate() {\n  this.pos = this.game.randomPosition();\n  this.vel = [0, 0];\n};\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction randomColor() {\n  const hexDigits = \"0123456789ABCDEF\";\n\n  let color = \"#\";\n  for (let i = 0; i < 3; i++) {\n    color += hexDigits[Math.floor((Math.random() * 16))];\n  }\n  \n  return color;\n}\n\nfunction Snake(options) {\n  options.pos = options.pos;\n  options.radius = Snake.RADIUS;\n  options.vel = options.vel || [-3, 0];\n  options.color = options.color || randomColor();\n  \n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Snake, MovingObject);\n\nSnake.prototype.collide = function collide() {\n  this.pos[1] += 10\n  this.vel[0] = -this.vel[0]\n}\n\nSnake.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n  const centerDist = Util.dist(this.pos, otherObject.pos);\n  return centerDist < (this.radius + otherObject.radius);\n};\n\nSnake.prototype.collideWith = function collideWith(otherObject) {\n  if (otherObject instanceof Bullet) {\n    this.remove();\n    otherObject.remove();\n    return true;\n  } else if (otherObject instanceof Ship) {\n    otherObject.remove();\n  }\n  return false;\n};\n\nSnake.RADIUS = 10;\n\nSnake.prototype.isFlippable = true;\n\nmodule.exports = Snake;\n\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  // Normalize the length of the vector to 1, maintaining direction.\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n  // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  // Find the length of the vector.\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n  // Return a randomly oriented vector with the given length.\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n  inherits(ChildClass, BaseClass) {\n    ChildClass.prototype = Object.create(BaseClass.prototype);\n    ChildClass.prototype.constructor = ChildClass;\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n};\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });