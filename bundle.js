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

    // bindKeyHandlers() {
    //     const ship = this.playerShip;
    //     Object.keys(Board.MOVES).forEach((key) => {
    //         const move = Board.MOVES[key];
    //         keyCode(key, () => { ship.move(move); });
    //     })

    // }

    start() {
        // this.bindKeyHandlers();
        setInterval(() => {
            this.game.draw(this.ctx);
        }, 200);
    }
    
}

Board.MOVES = {
    37: [0, -1],
    39: [0, 1]
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

    move() {
        // if the object hits a boundary, then reverse its direction and drop it down a row
        // if the object has not hit a boundary, then simply increment its movement speed by one
        //

    }


    // move(timeDelta) {
    //     const velocityIncrement = timeDelta / FRAME_RATE_DELTA,
    //     offsetX = this.vel[0] * velocityIncrement;
    //     offsetY = this.vel[1] * velocityIncrement;

    //     this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    //     // we are going to need some logic here to account for an entity hitting the
    //     // walls on either side of the board
    // }

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
                    vel: [2, 2],
                    game: this.game
                }))
                x += 45;
            }
            y += 35;
        }
    }

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
Game.HEIGHT = 720;
Game.WIDTH = 600;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmVteV9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcl9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCLEVBQUU7QUFDdEQsWUFBWTs7QUFFWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Qjs7Ozs7Ozs7Ozs7QUM5QkEsaUJBQWlCLG1CQUFPLENBQUMscUNBQVk7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCOzs7Ozs7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEI7Ozs7Ozs7Ozs7O0FDekNBLG1CQUFtQixtQkFBTyxDQUFDLDJDQUFlO0FBQzFDLGtCQUFrQixtQkFBTyxDQUFDLHlDQUFjOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0I7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQjs7Ozs7Ozs7Ozs7QUMzREEsbUJBQW1CLG1CQUFPLENBQUMsMkNBQWU7QUFDMUMsaUJBQWlCLG1CQUFPLENBQUMscUNBQVk7QUFDckMsYUFBYSxtQkFBTyxDQUFDLDZCQUFRO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQywrQkFBUzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBLENBQUM7O0FBRUQ7QUFDQSwyQjs7Ozs7Ozs7Ozs7QUMvQkEsZ0JBQWdCLG1CQUFPLENBQUMsbUNBQVc7QUFDbkMsaUJBQWlCLG1CQUFPLENBQUMscUNBQVk7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUEsNEI7Ozs7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUsIGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwID0gZ2FtZS5hZGRQbGF5ZXJTaGlwO1xuICAgIH1cblxuICAgIC8vIGJpbmRLZXlIYW5kbGVycygpIHtcbiAgICAvLyAgICAgY29uc3Qgc2hpcCA9IHRoaXMucGxheWVyU2hpcDtcbiAgICAvLyAgICAgT2JqZWN0LmtleXMoQm9hcmQuTU9WRVMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIC8vICAgICAgICAgY29uc3QgbW92ZSA9IEJvYXJkLk1PVkVTW2tleV07XG4gICAgLy8gICAgICAgICBrZXlDb2RlKGtleSwgKCkgPT4geyBzaGlwLm1vdmUobW92ZSk7IH0pO1xuICAgIC8vICAgICB9KVxuXG4gICAgLy8gfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIHRoaXMuYmluZEtleUhhbmRsZXJzKCk7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9XG4gICAgXG59XG5cbkJvYXJkLk1PVkVTID0ge1xuICAgIDM3OiBbMCwgLTFdLFxuICAgIDM5OiBbMCwgMV1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZDsiLCJjb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuY2xhc3MgRW5lbXlTaGlwIGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5wb3MgPSBwcm9wcy5wb3M7XG4gICAgICAgIHRoaXMudmVsID0gcHJvcHMudmVsO1xuICAgICAgICB0aGlzLndpZHRoID0gMjU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTI7XG4gICAgICAgIHRoaXMuY29sb3IgPSAnd2hpdGUnO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbmVteVNoaXA7IiwiY2xhc3MgRW50aXRpZXMge1xuXG4gICAgY29uc3RydWN0b3Ioc3BlY3MpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBzcGVjcy5wb3M7XG4gICAgICAgIHRoaXMudmVsID0gc3BlY3MudmVsO1xuICAgICAgICB0aGlzLmNvbG9yID0gc3BlY3MuY29sb3I7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc3BlY3MuaGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gc3BlY3Mud2lkdGg7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICAvLyBpZiB0aGUgb2JqZWN0IGhpdHMgYSBib3VuZGFyeSwgdGhlbiByZXZlcnNlIGl0cyBkaXJlY3Rpb24gYW5kIGRyb3AgaXQgZG93biBhIHJvd1xuICAgICAgICAvLyBpZiB0aGUgb2JqZWN0IGhhcyBub3QgaGl0IGEgYm91bmRhcnksIHRoZW4gc2ltcGx5IGluY3JlbWVudCBpdHMgbW92ZW1lbnQgc3BlZWQgYnkgb25lXG4gICAgICAgIC8vXG5cbiAgICB9XG5cblxuICAgIC8vIG1vdmUodGltZURlbHRhKSB7XG4gICAgLy8gICAgIGNvbnN0IHZlbG9jaXR5SW5jcmVtZW50ID0gdGltZURlbHRhIC8gRlJBTUVfUkFURV9ERUxUQSxcbiAgICAvLyAgICAgb2Zmc2V0WCA9IHRoaXMudmVsWzBdICogdmVsb2NpdHlJbmNyZW1lbnQ7XG4gICAgLy8gICAgIG9mZnNldFkgPSB0aGlzLnZlbFsxXSAqIHZlbG9jaXR5SW5jcmVtZW50O1xuXG4gICAgLy8gICAgIHRoaXMucG9zID0gW3RoaXMucG9zWzBdICsgb2Zmc2V0WCwgdGhpcy5wb3NbMV0gKyBvZmZzZXRZXTtcblxuICAgIC8vICAgICAvLyB3ZSBhcmUgZ29pbmcgdG8gbmVlZCBzb21lIGxvZ2ljIGhlcmUgdG8gYWNjb3VudCBmb3IgYW4gZW50aXR5IGhpdHRpbmcgdGhlXG4gICAgLy8gICAgIC8vIHdhbGxzIG9uIGVpdGhlciBzaWRlIG9mIHRoZSBib2FyZFxuICAgIC8vIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lLnJlbW92ZSh0aGlzKTtcbiAgICB9XG59XG5cbmNvbnN0IEZSQU1FX1JBVEVfREVMVEEgPSAxMDAwLzYwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0aWVzOyIsImNvbnN0IFBsYXllclNoaXAgPSByZXF1aXJlKCcuL3BsYXllcl9zaGlwJyk7XG5jb25zdCBFbmVteVNoaXAgPSByZXF1aXJlKCcuL2VuZW15X3NoaXAnKTtcblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlTaGlwcyA9IFtdO1xuICAgICAgICB0aGlzLnBsYXllclNoaXAgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuYWRkRW5lbWllcygpO1xuICAgICAgICB0aGlzLmFkZFBsYXllclNoaXAoKTtcbiAgICB9XG5cbiAgICBhZGRQbGF5ZXJTaGlwKCkge1xuICAgICAgICB0aGlzLnBsYXllclNoaXAgPSBuZXcgUGxheWVyU2hpcCh7XG4gICAgICAgICAgICBwb3M6IFszMDAsIDY1MF0sXG4gICAgICAgICAgICB2ZWw6IFswLCAwXSxcbiAgICAgICAgICAgIGhlaWdodDogMjAsXG4gICAgICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgICAgICBjb2xvcjogJ2xpbWUnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZChzaGlwKSB7XG4gICAgICAgIHRoaXMuZW5lbXlTaGlwcy5wdXNoKHNoaXApO1xuICAgIH1cblxuICAgIGFkZEVuZW1pZXMoKSB7XG5cbiAgICAgICAgbGV0IHkgPSAxMDA7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gNDA7XG4gICAgICAgICAgICBmb3IobGV0IG4gPSAwOyBuIDwgMTE7IG4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKG5ldyBFbmVteVNoaXAoe1xuICAgICAgICAgICAgICAgICAgICBwb3M6IFt4LCB5XSxcbiAgICAgICAgICAgICAgICAgICAgdmVsOiBbMiwgMl0sXG4gICAgICAgICAgICAgICAgICAgIGdhbWU6IHRoaXMuZ2FtZVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIHggKz0gNDU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ICs9IDM1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA2MDAsIDcyMCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgNjAwLCA3MjApO1xuXG4gICAgICAgIHRoaXMuZW5lbXlTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgICBzaGlwLmRyYXcoY3R4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGxheWVyU2hpcC5kcmF3KGN0eCk7XG4gICAgfVxufVxuXG5HYW1lLk5VTV9FTkVNSUVTID0gNTU7XG5HYW1lLkhFSUdIVCA9IDcyMDtcbkdhbWUuV0lEVEggPSA2MDA7XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjb25zdCBQbGF5ZXJTaGlwID0gcmVxdWlyZSgnLi9wbGF5ZXJfc2hpcCcpO1xuY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9nYW1lJyk7XG5jb25zdCBCb2FyZCA9IHJlcXVpcmUoJy4vYm9hcmQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWNhbnZhcycpO1xuICAgIGdhbWVCb2FyZC53aWR0aCA9IDYwMDtcbiAgICBnYW1lQm9hcmQuaGVpZ2h0ID0gNzIwO1xuICAgIFxuICAgIGNvbnN0IGN0eCA9IGdhbWVCb2FyZC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIDYwMCwgNzIwKTtcblxuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGdhbWUsIGN0eCk7XG5cbiAgICBib2FyZC5zdGFydCgpO1xuXG4gICAgLy8gY29uc3QgcGxheWVyID0gbmV3IFBsYXllclNoaXAoe1xuICAgIC8vICAgICBwb3M6IFtnYW1lQm9hcmQud2lkdGggLSAzMTAsIGdhbWVCb2FyZC5oZWlnaHQgLSA1MF0sXG4gICAgLy8gICAgIHZlbDogWzAsIDJdLFxuICAgIC8vICAgICBoZWlnaHQ6IDIwLFxuICAgIC8vICAgICB3aWR0aDogNDAsXG4gICAgLy8gICAgIGNvbG9yOiAnd2hpdGUnXG4gICAgLy8gfSk7XG4gICAgLy8gcGxheWVyLmRyYXcoY3R4KTtcblxufSlcblxud2luZG93LlBsYXllclNoaXAgPSBQbGF5ZXJTaGlwO1xud2luZG93LkVudGl0aWVzID0gRW50aXRpZXM7IiwiY29uc3QgdmVjdG9ycyA9IHJlcXVpcmUoJy4vdmVjdG9ycycpO1xuY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmNvbnN0IERFRkFVTFRTID0ge1xuICAgIENPTE9SOiBcIiNmZmZmZmZcIixcbiAgICBXSURUSDogMjUsXG4gICAgSEVJR0hUOiAxMCxcbn1cblxuY2xhc3MgUGxheWVyU2hpcCBleHRlbmRzIEVudGl0aWVzIHtcbiAgICBjb25zdHJ1Y3RvcihzcGVjcykge1xuICAgICAgICBzdXBlcihzcGVjcyk7XG4gICAgICAgIHRoaXMucG9zID0gc3BlY3MucG9zO1xuICAgICAgICAvLyB0aGlzLmNvbG9yID0gREVGQVVMVFMuY29sb3I7XG4gICAgICAgIC8vIHRoaXMud2lkdGggPSBERUZBVUxUUy53aWR0aDtcbiAgICAgICAgLy8gdGhpcy5oZWlnaHQgPSBERUZBVUxUUy5oZWlnaHQ7XG4gICAgICAgIHRoaXMudmVsID0gc3BlY3MudmVsIHx8IFswLCAwXTtcbiAgICB9XG5cbiAgICBtb3ZlKGUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICgpID0+IHtcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1sxXSAtPSAxXG4gICAgICAgICAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWzFdICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyU2hpcDsiLCJjbGFzcyBWZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZCh2MSwgdjIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvciAoXG4gICAgICAgIHYxLnggKyB2Mi54LFxuICAgICAgICB2MS55ICsgdjIueVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGFkZCh2MSwgdjIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdjEueCArIHYyLngsXG4gICAgICAgIHYxLnkgKyB2Mi55XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gc3VidHJhY3QodjEsIHYyKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHYxLnggLSB2Mi54LFxuICAgICAgICB2MS55IC0gdjIueVxuICAgIClcbn1cblxuZnVuY3Rpb24gbXVsdGlwbHkodiwgbikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB2LnggKiBuLFxuICAgICAgICB2LnkgKiBuXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gdmVjTGVuZ3RoKHZlY3Rvcikge1xuICAgIHJldHVybiBNYXRoLnNxcnQodmVjdG9yLnggKiB2ZWN0b3IueCArIHZlY3Rvci55ICogdmVjdG9yLnkpO1xufVxuXG4vLyB0aGUgaWRlYSBoZXJlIGlzIHRvIHJlc2V0IHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciB0byBvbmUuIEkgZmVlbCBsaWtlIEkgbWlnaHQgYmUgbWlzc2luZyBzb21lIFxuLy8gZWRnZSBjYXNlcyBvciBuZWVkIHRvIGFjY291bnQgZm9yIDAsIGJ1dCB3ZSBjYW4gY2lyY2xlIGJhY2sgdG8gdGhpcyB3aGVuIHdlIGltcGxlbWVudFxuLy8gdGhlIGFjdHVhbCBnYW1lIG1lY2hhbmljc1xuZnVuY3Rpb24gbm9ybWFsaXplKHZlY3Rvcikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB2ZWN0b3IueCAvIHZlY3Rvckxlbmd0aCh2ZWN0b3IpLFxuICAgICAgICB2ZWN0b3IueSAvIHZlY3Rvckxlbmd0aCh2ZWN0b3IpXG4gICAgKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9