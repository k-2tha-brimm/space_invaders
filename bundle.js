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

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Board {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.playerShip = game.addPlayerShip;
    }

    start() {
        setInterval(() => {
            this.game.draw(this.ctx);
        }, 200);
    }
    
}

module.exports = Board;

/***/ }),

/***/ "./src/enemy_ship.js":
/*!***************************!*\
  !*** ./src/enemy_ship.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Entities = __webpack_require__(/*! ./entities */ "./src/entities.js");

class EnemyShip extends Entities {
    constructor(props) {
        super(props);
        this.pos = props.pos;
        this.vel = props.vel;
        this.width = 25;
        this.height = 12;
        this.color = 'white';
    }
}

module.exports = EnemyShip;

/***/ }),

/***/ "./src/entities.js":
/*!*************************!*\
  !*** ./src/entities.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Entities {

    constructor(specs) {
        this.pos = specs.pos;
        this.vel = specs.vel;
        this.color = specs.color;
        this.height = specs.height;
        this.width = specs.width;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    }

    move(timeDelta) {
        const velocityIncrement = timeDelta / FRAME_RATE_DELTA,
        offsetX = this.vel[0] * velocityIncrement;
        offsetY = this.vel[1] * velocityIncrement;

        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

        // we are going to need some logic here to account for an entity hitting the
        // walls on either side of the board
    }

    remove() {
        this.game.remove(this);
    }
}

const FRAME_RATE_DELTA = 1000/60;

module.exports = Entities;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayerShip = __webpack_require__(/*! ./player_ship */ "./src/player_ship.js");
const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./src/enemy_ship.js");

class Game {
    constructor() {
        this.enemyShips = [];
        this.playerShip = null;

        this.addEnemies();
        this.addPlayerShip();
    }

    addPlayerShip() {
        this.playerShip = new PlayerShip({
            pos: [300, 650],
            vel: [0, 0],
            height: 20,
            width: 40,
            color: 'lime'
        });
    }

    add(ship) {
        this.enemyShips.push(ship);
    }

    addEnemies() {

        let y = 100;
        for(let i = 0; i < 5; i++) {
            let x = 40;
            for(let n = 0; n < 11; n++) {
                this.add(new EnemyShip({
                    pos: [x, y],
                    vel: [2, 2]  
                }))
                x += 50;
            }
            y += 50;
        }
    }

    // 11 across
    // 5 down

    draw(ctx) {
        ctx.clearRect(0, 0, 600, 720);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 600, 720);

        this.enemyShips.forEach((ship) => {
            ship.draw(ctx);
        });
        this.playerShip.draw(ctx);
    }
}

Game.NUM_ENEMIES = 55;

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayerShip = __webpack_require__(/*! ./player_ship */ "./src/player_ship.js");
const Entities = __webpack_require__(/*! ./entities */ "./src/entities.js");
const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const Board = __webpack_require__(/*! ./board */ "./src/board.js");

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-canvas');
    gameBoard.width = 600;
    gameBoard.height = 720;
    
    const ctx = gameBoard.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 720);

    const game = new Game();
    const board = new Board(game, ctx);

    board.start();

    // const player = new PlayerShip({
    //     pos: [gameBoard.width - 310, gameBoard.height - 50],
    //     vel: [0, 2],
    //     height: 20,
    //     width: 40,
    //     color: 'white'
    // });
    // player.draw(ctx);

})

window.PlayerShip = PlayerShip;
window.Entities = Entities;

/***/ }),

/***/ "./src/player_ship.js":
/*!****************************!*\
  !*** ./src/player_ship.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const vectors = __webpack_require__(/*! ./vectors */ "./src/vectors.js");
const Entities = __webpack_require__(/*! ./entities */ "./src/entities.js");

const DEFAULTS = {
    COLOR: "#ffffff",
    WIDTH: 25,
    HEIGHT: 10,
}

class PlayerShip extends Entities {
    constructor(specs) {
        super(specs);
        this.pos = specs.pos;
        // this.color = DEFAULTS.color;
        // this.width = DEFAULTS.width;
        // this.height = DEFAULTS.height;
        this.vel = specs.vel || [0, 0];
    }

    move(e) {
        document.addEventListener('keydown', () => {
            if(e.keyCode === 37) {
                this.pos[1] -= 1
            } else if(e.keyCode === 39) {
                this.pos[1] += 1
            }
        });
    }

}

module.exports = PlayerShip;

/***/ }),

/***/ "./src/vectors.js":
/*!************************!*\
  !*** ./src/vectors.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function add(v1, v2) {
    return new Vector (
        v1.x + v2.x,
        v1.y + v2.y
    );
}

function add(v1, v2) {
    return new Vector(
        v1.x + v2.x,
        v1.y + v2.y
    );
}

function subtract(v1, v2) {
    return new Vector(
        v1.x - v2.x,
        v1.y - v2.y
    )
}

function multiply(v, n) {
    return new Vector(
        v.x * n,
        v.y * n
    );
}

function vecLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

// the idea here is to reset the length of the vector to one. I feel like I might be missing some 
// edge cases or need to account for 0, but we can circle back to this when we implement
// the actual game mechanics
function normalize(vector) {
    return new Vector(
        vector.x / vectorLength(vector),
        vector.y / vectorLength(vector)
    );
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmVteV9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcl9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBLHVCOzs7Ozs7Ozs7OztBQ2ZBLGlCQUFpQixtQkFBTyxDQUFDLHFDQUFZOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQjs7Ozs7Ozs7Ozs7QUNiQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDakNBLG1CQUFtQixtQkFBTyxDQUFDLDJDQUFlO0FBQzFDLGtCQUFrQixtQkFBTyxDQUFDLHlDQUFjOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0I7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBLHNCOzs7Ozs7Ozs7OztBQzNEQSxtQkFBbUIsbUJBQU8sQ0FBQywyQ0FBZTtBQUMxQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQyxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLCtCQUFTOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBLDJCOzs7Ozs7Ozs7OztBQy9CQSxnQkFBZ0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNuQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQSw0Qjs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLnBsYXllclNoaXAgPSBnYW1lLmFkZFBsYXllclNoaXA7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9XG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQm9hcmQ7IiwiY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmNsYXNzIEVuZW15U2hpcCBleHRlbmRzIEVudGl0aWVzIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMucG9zID0gcHJvcHMucG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHByb3BzLnZlbDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDI1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDEyO1xuICAgICAgICB0aGlzLmNvbG9yID0gJ3doaXRlJztcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW5lbXlTaGlwOyIsImNsYXNzIEVudGl0aWVzIHtcblxuICAgIGNvbnN0cnVjdG9yKHNwZWNzKSB7XG4gICAgICAgIHRoaXMucG9zID0gc3BlY3MucG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHNwZWNzLnZlbDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHNwZWNzLmNvbG9yO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHNwZWNzLmhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHNwZWNzLndpZHRoO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgbW92ZSh0aW1lRGVsdGEpIHtcbiAgICAgICAgY29uc3QgdmVsb2NpdHlJbmNyZW1lbnQgPSB0aW1lRGVsdGEgLyBGUkFNRV9SQVRFX0RFTFRBLFxuICAgICAgICBvZmZzZXRYID0gdGhpcy52ZWxbMF0gKiB2ZWxvY2l0eUluY3JlbWVudDtcbiAgICAgICAgb2Zmc2V0WSA9IHRoaXMudmVsWzFdICogdmVsb2NpdHlJbmNyZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5wb3MgPSBbdGhpcy5wb3NbMF0gKyBvZmZzZXRYLCB0aGlzLnBvc1sxXSArIG9mZnNldFldO1xuXG4gICAgICAgIC8vIHdlIGFyZSBnb2luZyB0byBuZWVkIHNvbWUgbG9naWMgaGVyZSB0byBhY2NvdW50IGZvciBhbiBlbnRpdHkgaGl0dGluZyB0aGVcbiAgICAgICAgLy8gd2FsbHMgb24gZWl0aGVyIHNpZGUgb2YgdGhlIGJvYXJkXG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xuICAgIH1cbn1cblxuY29uc3QgRlJBTUVfUkFURV9ERUxUQSA9IDEwMDAvNjA7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXRpZXM7IiwiY29uc3QgUGxheWVyU2hpcCA9IHJlcXVpcmUoJy4vcGxheWVyX3NoaXAnKTtcbmNvbnN0IEVuZW15U2hpcCA9IHJlcXVpcmUoJy4vZW5lbXlfc2hpcCcpO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbmVteVNoaXBzID0gW107XG4gICAgICAgIHRoaXMucGxheWVyU2hpcCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5hZGRFbmVtaWVzKCk7XG4gICAgICAgIHRoaXMuYWRkUGxheWVyU2hpcCgpO1xuICAgIH1cblxuICAgIGFkZFBsYXllclNoaXAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyU2hpcCA9IG5ldyBQbGF5ZXJTaGlwKHtcbiAgICAgICAgICAgIHBvczogWzMwMCwgNjUwXSxcbiAgICAgICAgICAgIHZlbDogWzAsIDBdLFxuICAgICAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgICAgIGNvbG9yOiAnbGltZSdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkKHNoaXApIHtcbiAgICAgICAgdGhpcy5lbmVteVNoaXBzLnB1c2goc2hpcCk7XG4gICAgfVxuXG4gICAgYWRkRW5lbWllcygpIHtcblxuICAgICAgICBsZXQgeSA9IDEwMDtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSA0MDtcbiAgICAgICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCAxMTsgbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobmV3IEVuZW15U2hpcCh7XG4gICAgICAgICAgICAgICAgICAgIHBvczogW3gsIHldLFxuICAgICAgICAgICAgICAgICAgICB2ZWw6IFsyLCAyXSAgXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgeCArPSA1MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkgKz0gNTA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAxMSBhY3Jvc3NcbiAgICAvLyA1IGRvd25cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgNjAwLCA3MjApO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDYwMCwgNzIwKTtcblxuICAgICAgICB0aGlzLmVuZW15U2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgc2hpcC5kcmF3KGN0eCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBsYXllclNoaXAuZHJhdyhjdHgpO1xuICAgIH1cbn1cblxuR2FtZS5OVU1fRU5FTUlFUyA9IDU1O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY29uc3QgUGxheWVyU2hpcCA9IHJlcXVpcmUoJy4vcGxheWVyX3NoaXAnKTtcbmNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpO1xuY29uc3QgQm9hcmQgPSByZXF1aXJlKCcuL2JvYXJkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1jYW52YXMnKTtcbiAgICBnYW1lQm9hcmQud2lkdGggPSA2MDA7XG4gICAgZ2FtZUJvYXJkLmhlaWdodCA9IDcyMDtcbiAgICBcbiAgICBjb25zdCBjdHggPSBnYW1lQm9hcmQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCA2MDAsIDcyMCk7XG5cbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgICBjb25zdCBib2FyZCA9IG5ldyBCb2FyZChnYW1lLCBjdHgpO1xuXG4gICAgYm9hcmQuc3RhcnQoKTtcblxuICAgIC8vIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXJTaGlwKHtcbiAgICAvLyAgICAgcG9zOiBbZ2FtZUJvYXJkLndpZHRoIC0gMzEwLCBnYW1lQm9hcmQuaGVpZ2h0IC0gNTBdLFxuICAgIC8vICAgICB2ZWw6IFswLCAyXSxcbiAgICAvLyAgICAgaGVpZ2h0OiAyMCxcbiAgICAvLyAgICAgd2lkdGg6IDQwLFxuICAgIC8vICAgICBjb2xvcjogJ3doaXRlJ1xuICAgIC8vIH0pO1xuICAgIC8vIHBsYXllci5kcmF3KGN0eCk7XG5cbn0pXG5cbndpbmRvdy5QbGF5ZXJTaGlwID0gUGxheWVyU2hpcDtcbndpbmRvdy5FbnRpdGllcyA9IEVudGl0aWVzOyIsImNvbnN0IHZlY3RvcnMgPSByZXF1aXJlKCcuL3ZlY3RvcnMnKTtcbmNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuXG5jb25zdCBERUZBVUxUUyA9IHtcbiAgICBDT0xPUjogXCIjZmZmZmZmXCIsXG4gICAgV0lEVEg6IDI1LFxuICAgIEhFSUdIVDogMTAsXG59XG5cbmNsYXNzIFBsYXllclNoaXAgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3Ioc3BlY3MpIHtcbiAgICAgICAgc3VwZXIoc3BlY3MpO1xuICAgICAgICB0aGlzLnBvcyA9IHNwZWNzLnBvcztcbiAgICAgICAgLy8gdGhpcy5jb2xvciA9IERFRkFVTFRTLmNvbG9yO1xuICAgICAgICAvLyB0aGlzLndpZHRoID0gREVGQVVMVFMud2lkdGg7XG4gICAgICAgIC8vIHRoaXMuaGVpZ2h0ID0gREVGQVVMVFMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnZlbCA9IHNwZWNzLnZlbCB8fCBbMCwgMF07XG4gICAgfVxuXG4gICAgbW92ZShlKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB7XG4gICAgICAgICAgICBpZihlLmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NbMV0gLT0gMVxuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1sxXSArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclNoaXA7IiwiY2xhc3MgVmVjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGQodjEsIHYyKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IgKFxuICAgICAgICB2MS54ICsgdjIueCxcbiAgICAgICAgdjEueSArIHYyLnlcbiAgICApO1xufVxuXG5mdW5jdGlvbiBhZGQodjEsIHYyKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHYxLnggKyB2Mi54LFxuICAgICAgICB2MS55ICsgdjIueVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHN1YnRyYWN0KHYxLCB2Mikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB2MS54IC0gdjIueCxcbiAgICAgICAgdjEueSAtIHYyLnlcbiAgICApXG59XG5cbmZ1bmN0aW9uIG11bHRpcGx5KHYsIG4pIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdi54ICogbixcbiAgICAgICAgdi55ICogblxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHZlY0xlbmd0aCh2ZWN0b3IpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHZlY3Rvci54ICogdmVjdG9yLnggKyB2ZWN0b3IueSAqIHZlY3Rvci55KTtcbn1cblxuLy8gdGhlIGlkZWEgaGVyZSBpcyB0byByZXNldCB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgdG8gb25lLiBJIGZlZWwgbGlrZSBJIG1pZ2h0IGJlIG1pc3Npbmcgc29tZSBcbi8vIGVkZ2UgY2FzZXMgb3IgbmVlZCB0byBhY2NvdW50IGZvciAwLCBidXQgd2UgY2FuIGNpcmNsZSBiYWNrIHRvIHRoaXMgd2hlbiB3ZSBpbXBsZW1lbnRcbi8vIHRoZSBhY3R1YWwgZ2FtZSBtZWNoYW5pY3NcbmZ1bmN0aW9uIG5vcm1hbGl6ZSh2ZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdmVjdG9yLnggLyB2ZWN0b3JMZW5ndGgodmVjdG9yKSxcbiAgICAgICAgdmVjdG9yLnkgLyB2ZWN0b3JMZW5ndGgodmVjdG9yKVxuICAgICk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==