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
        // this.lastTime = 0;
    }

    animate() {
        // const delta = time - this.lastTime;

        this.game.draw(this.ctx);
        this.game.moveObjects();
        this.game.checkCollisions();
        this.game.isGameOver();
        // this.lastTime = time;

        if(!this.game.gameIsOver) { 
            requestAnimationFrame(this.animate.bind(this));
        } else {
            const screen = document.getElementById('splash-page');
            screen.style.display = "flex";
        }
    }

    start() {
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }
    
}

module.exports = Board;

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Entities = __webpack_require__(/*! ./entities */ "./src/entities.js");

class Bullet extends Entities {
    constructor(position) {
        super(position);
        this.pos = position;
        this.vel = [0, 1];
        this.height = 6;
        this.width = 3;
        this.color = 'white';
        this.area = this.height * this.width;
    }
}

module.exports = Bullet;

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
        this.game = props.game;
        this.area = this.height * this.width;
        this.value = props.value
    }
}

module.exports = EnemyShip;

/***/ }),

/***/ "./src/entities.js":
/*!*************************!*\
  !*** ./src/entities.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vector = __webpack_require__(/*! ./vectors */ "./src/vectors.js");

class Entities {

    constructor(props) {
        this.pos = props.pos;
        this.vel = props.vel;
        this.color = props.color;
        this.height = props.height;
        this.area = this.height * this.width;
        this.width = props.width;
        this.game = props.game;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    }

    move() {
        // const delta = timeDelta || 0.05;
        this.pos[0] += (this.vel[0]);
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
const Bullet = __webpack_require__(/*! ./bullet */ "./src/bullet.js");

class Game {
    constructor(gameBoard) {
        this.enemyShips = [];
        this.bullets = [];
        this.bombs = [];
        this.playerShip = null;
        this.gameBoard = gameBoard;
        this.playerLives = 3;
        this.score = 0;
        this.gameIsOver = false;

        this.addEnemies();
        this.addPlayerShip();
        this.registerEvents();
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

    addBullet(bullet) {
        this.bullets.push(bullet);
    }

    addEnemies() {

        let y = 100;
        for(let i = 1; i < 6; i++) {
            let x = 40;
            for(let n = 0; n < 11; n++) {
                this.add(new EnemyShip({
                    pos: [x, y],
                    vel: [1, 0],
                    game: this,
                    value: i * 10
                }))
                x += 45;
            }
            y += 35;
        }
    }

    draw(ctx) {
        const img = new Image();
        img.src = '../assets/images/halo.jpg';

        img.onload = () => {
            ctx.drawImage(img, -500, 0);
        };

        this.enemyShips.forEach((ship) => {
            ship.draw(ctx);
        });

        this.playerShip.draw(ctx);

        this.bullets.forEach((bullet) => {
            bullet.draw(ctx);
        })

    }

    checkCollisions() {
        for(let i = 0; i < this.enemyShips.length; i++) {
            let enemy = this.enemyShips[i];
            let destroyed = false;

            for(let j = 0; j < this.bullets.length; j++) {
                const bullet = this.bullets[j];

                if(bullet.pos[0] >= (enemy.pos[0] - enemy.width/2) && bullet.pos[0] <= (enemy.pos[0] + enemy.width/2) &&
                bullet.pos[1] >= (enemy.pos[1] - enemy.height/2) && bullet.pos[1] <= (enemy.pos[1] + enemy.height/2)) {
                    this.bullets.splice(j--, 1);
                    destroyed = true;
                    break;
                }
            }
            if(destroyed) {
                this.enemyShips.splice(i--, 1);
            }
        }
    }

    moveObjects() {
        this.enemyShips.forEach((ship) => {

            if(this.gameOver(ship.pos)) {
                this.enemyShips.map((ship) => {
                    ship.vel = [0, 0];
                })
            }

            let n = 1.2;

            if(this.isOutOfBounds(ship.pos)) {

                if(ship.pos[0] < 0) {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] += 10;
                        ship.vel = [n, 0];
                    })
                } else {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] -= 10;
                        ship.vel = [-(n), 0];
                    })
                }

            } else {
                ship.move();
            }
        })

        this.bullets.forEach((bullet) => {
            bullet.pos[1] -= bullet.vel[1];
        })
    }

    registerEvents() {
        document.addEventListener('keydown', e => {
            if(e.keyCode === 37) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.pos[0] -= 20;
                } else {
                    this.playerShip.pos[0] += 10;
                }
            } else if(e.keyCode === 39) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.pos[0] += 20
                } else {
                    this.playerShip.pos[0] -= 10;
                }
            } else if(e.keyCode === 32) {
                const position = [this.playerShip.pos[0] + 10, this.playerShip.pos[1] - 13];
                this.addBullet(new Bullet(position))
            }
        });
    }

    isOutOfBounds(pos) {
        return(pos[0] < 0) || (pos[0] + 25 >= Game.WIDTH)
    }

    isGameOver() {
        if(this.enemyShips.length === 0) {
            this.gameIsOver = true;
        }
    }

    gameOver(pos) {
        if(pos[1] > 620) {
            this.gameIsOver = true;
            return true;
        } else {
            return false;
        }
    }

    remove(entity) {
        if(entity instanceof EnemyShip) {
            this.enemyShips.splice(this.enemyShips.indexOf(entity), 1);
        } else if(entity instanceof Bullet) {
            this.bullets.splice(this.bullets.indexOf(entity), 1);
        }
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

    const game = new Game(gameBoard);
    const board = new Board(game, ctx);
    game.draw(ctx);

    const start = document.getElementById('start');
    
    start.addEventListener('click', () => {
        const game = new Game(gameBoard);
        const board = new Board(game, ctx);
        game.draw(ctx);
        board.start();
    })

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

class PlayerShip extends Entities {
    constructor(specs) {
        super(specs);
        this.pos = specs.pos;
        this.color = 'lime';
        this.width = 25;
        this.height = 10;
        this.vel = specs.vel || [0, 0];
        this.area = this.height * this.width;
    }

    move() {
        document.addEventListener('keydown', () => {
            if(e.keyCode === 37) {
                this.pos[1] -= 2.5;
                e.preventDefault();
            } else if(e.keyCode === 39) {
                this.pos[1] += 2.5;
                e.preventDefault();
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

const Vector = {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    },
    
    add(v1, v2) {
        return new Vector (
            v1.x + v2.x,
            v1.y + v2.y
        );
    },
        
    add(v1, v2) {
        return new Vector(
            v1.x + v2.x,
            v1.y + v2.y
        );
    },
            
    subtract(v1, v2) {
        return new Vector(
            v1.x - v2.x,
            v1.y - v2.y
        )
    },
    
    multiply(v, n) {
        return new Vector(
            v.x * n,
            v.y * n
        );
    },
                    
    vecLength(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    },
                    
    distance(p1, p2) {
        return Math.sqrt(
            Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] + p2[1], 2)
        );
    },
                        
    // the idea here is to reset the length of the vector to one. I feel like I might be missing some 
    // edge cases or need to account for 0, but we can circle back to this when we implement
    // the actual game mechanics
    normalize(vector) {
        return new Vector(
            vector.x / vectorLength(vector),
            vector.y / vectorLength(vector)
        );
    }
}

module.exports = Vector;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9idWxsZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZW15X3NoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyX3NoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlY3RvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQztBQUNBO0FBQ0Es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Q0FBVztBQUNuQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUEsNEI7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLnBsYXllclNoaXAgPSBnYW1lLmFkZFBsYXllclNoaXA7XG4gICAgICAgIC8vIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgIH1cblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIC8vIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XG5cbiAgICAgICAgdGhpcy5nYW1lLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICB0aGlzLmdhbWUubW92ZU9iamVjdHMoKTtcbiAgICAgICAgdGhpcy5nYW1lLmNoZWNrQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLmdhbWUuaXNHYW1lT3ZlcigpO1xuICAgICAgICAvLyB0aGlzLmxhc3RUaW1lID0gdGltZTtcblxuICAgICAgICBpZighdGhpcy5nYW1lLmdhbWVJc092ZXIpIHsgXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwbGFzaC1wYWdlJyk7XG4gICAgICAgICAgICBzY3JlZW4uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZDsiLCJjb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuY2xhc3MgQnVsbGV0IGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy52ZWwgPSBbMCwgMV07XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNjtcbiAgICAgICAgdGhpcy53aWR0aCA9IDM7XG4gICAgICAgIHRoaXMuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLmhlaWdodCAqIHRoaXMud2lkdGg7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1bGxldDsiLCJjb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuY2xhc3MgRW5lbXlTaGlwIGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5wb3MgPSBwcm9wcy5wb3M7XG4gICAgICAgIHRoaXMudmVsID0gcHJvcHMudmVsO1xuICAgICAgICB0aGlzLndpZHRoID0gMjU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTI7XG4gICAgICAgIHRoaXMuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICB0aGlzLmdhbWUgPSBwcm9wcy5nYW1lO1xuICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLmhlaWdodCAqIHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMudmFsdWUgPSBwcm9wcy52YWx1ZVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbmVteVNoaXA7IiwiY29uc3QgVmVjdG9yID0gcmVxdWlyZSgnLi92ZWN0b3JzJyk7XG5cbmNsYXNzIEVudGl0aWVzIHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHRoaXMucG9zID0gcHJvcHMucG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHByb3BzLnZlbDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHByb3BzLmNvbG9yO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHByb3BzLmhlaWdodDtcbiAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5oZWlnaHQgKiB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLndpZHRoID0gcHJvcHMud2lkdGg7XG4gICAgICAgIHRoaXMuZ2FtZSA9IHByb3BzLmdhbWU7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICAvLyBjb25zdCBkZWx0YSA9IHRpbWVEZWx0YSB8fCAwLjA1O1xuICAgICAgICB0aGlzLnBvc1swXSArPSAodGhpcy52ZWxbMF0pO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lLnJlbW92ZSh0aGlzKTtcbiAgICB9XG4gICAgXG59XG5cbmNvbnN0IEZSQU1FX1JBVEVfREVMVEEgPSAxMDAwLzYwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0aWVzOyIsImNvbnN0IFBsYXllclNoaXAgPSByZXF1aXJlKCcuL3BsYXllcl9zaGlwJyk7XG5jb25zdCBFbmVteVNoaXAgPSByZXF1aXJlKCcuL2VuZW15X3NoaXAnKTtcbmNvbnN0IEJ1bGxldCA9IHJlcXVpcmUoJy4vYnVsbGV0Jyk7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVCb2FyZCkge1xuICAgICAgICB0aGlzLmVuZW15U2hpcHMgPSBbXTtcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XG4gICAgICAgIHRoaXMuYm9tYnMgPSBbXTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwID0gbnVsbDtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBnYW1lQm9hcmQ7XG4gICAgICAgIHRoaXMucGxheWVyTGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5nYW1lSXNPdmVyID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5hZGRFbmVtaWVzKCk7XG4gICAgICAgIHRoaXMuYWRkUGxheWVyU2hpcCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgYWRkUGxheWVyU2hpcCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwID0gbmV3IFBsYXllclNoaXAoe1xuICAgICAgICAgICAgcG9zOiBbMzAwLCA2NTBdLFxuICAgICAgICAgICAgdmVsOiBbMCwgMF0sXG4gICAgICAgICAgICBoZWlnaHQ6IDIwLFxuICAgICAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICAgICAgY29sb3I6ICdsaW1lJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGQoc2hpcCkge1xuICAgICAgICB0aGlzLmVuZW15U2hpcHMucHVzaChzaGlwKTtcbiAgICB9XG5cbiAgICBhZGRCdWxsZXQoYnVsbGV0KSB7XG4gICAgICAgIHRoaXMuYnVsbGV0cy5wdXNoKGJ1bGxldCk7XG4gICAgfVxuXG4gICAgYWRkRW5lbWllcygpIHtcblxuICAgICAgICBsZXQgeSA9IDEwMDtcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSA0MDtcbiAgICAgICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCAxMTsgbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobmV3IEVuZW15U2hpcCh7XG4gICAgICAgICAgICAgICAgICAgIHBvczogW3gsIHldLFxuICAgICAgICAgICAgICAgICAgICB2ZWw6IFsxLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGkgKiAxMFxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIHggKz0gNDU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ICs9IDM1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSAnLi4vYXNzZXRzL2ltYWdlcy9oYWxvLmpwZyc7XG5cbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAtNTAwLCAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVuZW15U2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgc2hpcC5kcmF3KGN0eCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGxheWVyU2hpcC5kcmF3KGN0eCk7XG5cbiAgICAgICAgdGhpcy5idWxsZXRzLmZvckVhY2goKGJ1bGxldCkgPT4ge1xuICAgICAgICAgICAgYnVsbGV0LmRyYXcoY3R4KTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucygpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZW5lbXlTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5lbmVteVNoaXBzW2ldO1xuICAgICAgICAgICAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5idWxsZXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnVsbGV0ID0gdGhpcy5idWxsZXRzW2pdO1xuXG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnBvc1swXSA+PSAoZW5lbXkucG9zWzBdIC0gZW5lbXkud2lkdGgvMikgJiYgYnVsbGV0LnBvc1swXSA8PSAoZW5lbXkucG9zWzBdICsgZW5lbXkud2lkdGgvMikgJiZcbiAgICAgICAgICAgICAgICBidWxsZXQucG9zWzFdID49IChlbmVteS5wb3NbMV0gLSBlbmVteS5oZWlnaHQvMikgJiYgYnVsbGV0LnBvc1sxXSA8PSAoZW5lbXkucG9zWzFdICsgZW5lbXkuaGVpZ2h0LzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0cy5zcGxpY2Uoai0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVteVNoaXBzLnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU9iamVjdHMoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZ2FtZU92ZXIoc2hpcC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVteVNoaXBzLm1hcCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzaGlwLnZlbCA9IFswLCAwXTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbiA9IDEuMjtcblxuICAgICAgICAgICAgaWYodGhpcy5pc091dE9mQm91bmRzKHNoaXAucG9zKSkge1xuXG4gICAgICAgICAgICAgICAgaWYoc2hpcC5wb3NbMF0gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlTaGlwcy5tYXAoKHNoaXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucG9zWzFdICs9IDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5wb3NbMF0gKz0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnZlbCA9IFtuLCAwXTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMubWFwKChzaGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnBvc1sxXSArPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucG9zWzBdIC09IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC52ZWwgPSBbLShuKSwgMF07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNoaXAubW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYnVsbGV0cy5mb3JFYWNoKChidWxsZXQpID0+IHtcbiAgICAgICAgICAgIGJ1bGxldC5wb3NbMV0gLT0gYnVsbGV0LnZlbFsxXTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZWdpc3RlckV2ZW50cygpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzT3V0T2ZCb3VuZHModGhpcy5wbGF5ZXJTaGlwLnBvcykpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllclNoaXAucG9zWzBdIC09IDIwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5wb3NbMF0gKz0gMTA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc091dE9mQm91bmRzKHRoaXMucGxheWVyU2hpcC5wb3MpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLnBvc1swXSArPSAyMFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5wb3NbMF0gLT0gMTA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFt0aGlzLnBsYXllclNoaXAucG9zWzBdICsgMTAsIHRoaXMucGxheWVyU2hpcC5wb3NbMV0gLSAxM107XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdWxsZXQobmV3IEJ1bGxldChwb3NpdGlvbikpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzT3V0T2ZCb3VuZHMocG9zKSB7XG4gICAgICAgIHJldHVybihwb3NbMF0gPCAwKSB8fCAocG9zWzBdICsgMjUgPj0gR2FtZS5XSURUSClcbiAgICB9XG5cbiAgICBpc0dhbWVPdmVyKCkge1xuICAgICAgICBpZih0aGlzLmVuZW15U2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVJc092ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIocG9zKSB7XG4gICAgICAgIGlmKHBvc1sxXSA+IDYyMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lSXNPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGVudGl0eSkge1xuICAgICAgICBpZihlbnRpdHkgaW5zdGFuY2VvZiBFbmVteVNoaXApIHtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlTaGlwcy5zcGxpY2UodGhpcy5lbmVteVNoaXBzLmluZGV4T2YoZW50aXR5KSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZihlbnRpdHkgaW5zdGFuY2VvZiBCdWxsZXQpIHtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0cy5zcGxpY2UodGhpcy5idWxsZXRzLmluZGV4T2YoZW50aXR5KSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuR2FtZS5OVU1fRU5FTUlFUyA9IDU1O1xuR2FtZS5IRUlHSFQgPSA3MjA7XG5HYW1lLldJRFRIID0gNjAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY29uc3QgUGxheWVyU2hpcCA9IHJlcXVpcmUoJy4vcGxheWVyX3NoaXAnKTtcbmNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpO1xuY29uc3QgQm9hcmQgPSByZXF1aXJlKCcuL2JvYXJkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1jYW52YXMnKTtcbiAgICBnYW1lQm9hcmQud2lkdGggPSA2MDA7XG4gICAgZ2FtZUJvYXJkLmhlaWdodCA9IDcyMDtcbiAgICBcbiAgICBjb25zdCBjdHggPSBnYW1lQm9hcmQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShnYW1lQm9hcmQpO1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGdhbWUsIGN0eCk7XG4gICAgZ2FtZS5kcmF3KGN0eCk7XG5cbiAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuICAgIFxuICAgIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2FtZUJvYXJkKTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoZ2FtZSwgY3R4KTtcbiAgICAgICAgZ2FtZS5kcmF3KGN0eCk7XG4gICAgICAgIGJvYXJkLnN0YXJ0KCk7XG4gICAgfSlcblxufSlcblxud2luZG93LlBsYXllclNoaXAgPSBQbGF5ZXJTaGlwO1xud2luZG93LkVudGl0aWVzID0gRW50aXRpZXM7IiwiY29uc3QgdmVjdG9ycyA9IHJlcXVpcmUoJy4vdmVjdG9ycycpO1xuY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmNsYXNzIFBsYXllclNoaXAgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3Ioc3BlY3MpIHtcbiAgICAgICAgc3VwZXIoc3BlY3MpO1xuICAgICAgICB0aGlzLnBvcyA9IHNwZWNzLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9ICdsaW1lJztcbiAgICAgICAgdGhpcy53aWR0aCA9IDI1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDEwO1xuICAgICAgICB0aGlzLnZlbCA9IHNwZWNzLnZlbCB8fCBbMCwgMF07XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWzFdIC09IDIuNTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWzFdICs9IDIuNTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclNoaXA7IiwiY29uc3QgVmVjdG9yID0ge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9LFxuICAgIFxuICAgIGFkZCh2MSwgdjIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IgKFxuICAgICAgICAgICAgdjEueCArIHYyLngsXG4gICAgICAgICAgICB2MS55ICsgdjIueVxuICAgICAgICApO1xuICAgIH0sXG4gICAgICAgIFxuICAgIGFkZCh2MSwgdjIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgICAgICB2MS54ICsgdjIueCxcbiAgICAgICAgICAgIHYxLnkgKyB2Mi55XG4gICAgICAgICk7XG4gICAgfSxcbiAgICAgICAgICAgIFxuICAgIHN1YnRyYWN0KHYxLCB2Mikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHYxLnggLSB2Mi54LFxuICAgICAgICAgICAgdjEueSAtIHYyLnlcbiAgICAgICAgKVxuICAgIH0sXG4gICAgXG4gICAgbXVsdGlwbHkodiwgbikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHYueCAqIG4sXG4gICAgICAgICAgICB2LnkgKiBuXG4gICAgICAgICk7XG4gICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgdmVjTGVuZ3RoKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHZlY3Rvci54ICogdmVjdG9yLnggKyB2ZWN0b3IueSAqIHZlY3Rvci55KTtcbiAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcbiAgICBkaXN0YW5jZShwMSwgcDIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KHAxWzBdIC0gcDJbMF0sIDIpICsgTWF0aC5wb3cocDFbMV0gKyBwMlsxXSwgMilcbiAgICAgICAgKTtcbiAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgLy8gdGhlIGlkZWEgaGVyZSBpcyB0byByZXNldCB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgdG8gb25lLiBJIGZlZWwgbGlrZSBJIG1pZ2h0IGJlIG1pc3Npbmcgc29tZSBcbiAgICAvLyBlZGdlIGNhc2VzIG9yIG5lZWQgdG8gYWNjb3VudCBmb3IgMCwgYnV0IHdlIGNhbiBjaXJjbGUgYmFjayB0byB0aGlzIHdoZW4gd2UgaW1wbGVtZW50XG4gICAgLy8gdGhlIGFjdHVhbCBnYW1lIG1lY2hhbmljc1xuICAgIG5vcm1hbGl6ZSh2ZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgICAgICB2ZWN0b3IueCAvIHZlY3Rvckxlbmd0aCh2ZWN0b3IpLFxuICAgICAgICAgICAgdmVjdG9yLnkgLyB2ZWN0b3JMZW5ndGgodmVjdG9yKVxuICAgICAgICApO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3I7Il0sInNvdXJjZVJvb3QiOiIifQ==