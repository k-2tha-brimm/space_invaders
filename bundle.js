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
        this.game.isOutOfLives();
        this.game.moveObjects();
        this.game.checkCollisions();
        // this.lastTime = time;

        // let's create a new method to check if that ROUND is over
        // if it is, the game should pause temporarily, and then resume after a moment's pause
        // if the game is over, then there should be a game over screen displaying the user's current score

        if(!this.game.gameIsOver) { 
            requestAnimationFrame(this.animate.bind(this));
        } else if(this.game.gameIsOver) {
            const go = document.getElementById('game-over');
            go.style.display = 'flex';
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

/***/ "./src/bombs.js":
/*!**********************!*\
  !*** ./src/bombs.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Entities = __webpack_require__(/*! ./entities */ "./src/entities.js");

class Bomb extends Entities {
    constructor(position) {
        super(position);
        this.pos = position[0];
        this.vel = [0, (Math.floor(Math.random() * 4))];
        this.height = 5;
        this.width = 2.5;
        this.color = 'white';
    }
}

module.exports = Bomb;

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
        this.vel = [0, 1.5];
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
const Bomb = __webpack_require__(/*! ./bombs */ "./src/bombs.js");

class Game {
    constructor(gameBoard, score) {
        this.enemyShips = [];
        this.bullets = [];
        this.bombs = [];
        this.waveCount = 0;
        this.enemiesAdded = false;
        this.playerShip = null;
        this.gameBoard = gameBoard;
        this.playerLives = 3;
        this.score = score || 0;
        this.gameIsOver = false;
        this.newRound = false;
        this.lifeWasLost = false;
        this.bombs = [];
        this.numBombs = 5;

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

    addBombs(bomb) {
        this.bombs.push(bomb);
    }

    addEnemies() {

        let y = 100;
        for(let i = 5; i > 1; i--) {
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
        this.enemiesAdded = true;
    }

    draw(ctx) {
        const img = new Image();
        img.src = '../assets/images/halo.jpg';

        img.onload = () => {
            ctx.drawImage(img, -500, 0);
        };
        
        ctx.font = "30px Comic Sans MS";
        ctx.fillstyle = 'white';
        ctx.fillText(`Score: ${this.score}`, 410, 50)
        
        ctx.font = "30px Comic Sans MS";
        ctx.fillstyle = 'white';
        ctx.fillText(`Lives: ${this.playerLives}`, 20, 50)

        this.enemyShips.forEach((ship) => {
            ship.draw(ctx);
        });

        this.playerShip.draw(ctx);

        this.bullets.forEach((bullet) => {
            bullet.draw(ctx);
        })

        this.bombs.forEach((bomb) => {
            bomb.draw(ctx);
        })

    }

    bombsAway() {
        const shipIndex = Math.floor(Math.random() * Math.floor(this.enemyShips.length));
        const ship = this.enemyShips[shipIndex];
        const shipPos = [(ship.pos[0] - 10), (ship.pos[1] + 13)]
        // const bombPosition = [this.enemyShips[shipIndex].pos[0] - 10, this.enemyShips[shipIndex].pos[1] + 13];
        const bombPosition = [shipPos];
        this.addBombs(new Bomb(bombPosition));
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
                this.score += this.enemyShips[i].value;
                this.enemyShips.splice(i--, 1);
                if(this.enemyShips.length === 0) {
                    this.numBombs += 2;
                    this.bullets = [];
                    this.addEnemies();
                    this.addPlayerShip();
                    this.registerEvents();
                }
            }
            this.bullets.forEach((bullet) => {
                if(bullet.pos[1] < 0) {
                    this.bullets.splice(this.bullets.indexOf(bullet), 1);
                }
            })

            if(this.bombs) {
                for(let n = 0; n < this.bombs.length; n++) {
                    const bomb = this.bombs[n];
                    const player = this.playerShip;
                    if(bomb.pos[0] >= (player.pos[0] - player.width) && bomb.pos[0] <= (player.pos[0] + player.width) &&
                    bomb.pos[1] >= (player.pos[1] - player.height/2) && bomb.pos[1] <= (player.pos[1] + player.height/2)) {
                        this.bombs.splice(this.bombs.indexOf(bomb), 1);
                        this.playerLives -= 1;
                        this.lifeWasLost = true;
                        break;
                    }
                };
            }

            this.bombs.forEach((bomb) => {
                if(bomb.pos[1] > 720) {
                    this.bombs.splice(this.bombs.indexOf(bomb), 1);
                }
            })

        }
    }

    moveObjects() {
        this.enemyShips.forEach((ship) => {

            if(this.gameOver(ship.pos)) {
                this.enemyShips.map((ship) => {
                    ship.vel = [0, 0];
                })
            }

            let n = 1;

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

        this.bombs.forEach((bomb) => {
            bomb.pos[1] += bomb.vel[1];
        })

        if(this.bombs.length < this.numBombs) {
            this.bombsAway();
        };


    }
    
    registerEvents() {
        let speed = 2;
        let direction = { 
            x: 0,
            y: 0
        };
        
        document.addEventListener('keydown', e => {
            if(e.keyCode === 37) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.pos[0] -= 20;
                } else {
                    this.playerShip.vel[0] = -speed;
                }
            } else if(e.keyCode === 39) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.pos[0] += 20
                } else {
                    this.playerShip.vel[0] = speed;
                }
            } else if(e.keyCode === 32) {
                const position = [this.playerShip.pos[0] + 10, this.playerShip.pos[1] - 13];

                if(this.bullets.length < 7) { 
                    this.addBullet(new Bullet(position))
                }

            }
            this.playerShip.moveShip(direction);
        });
    }

    isOutOfBounds(pos) {
        return(pos[0] < 0) || (pos[0] + 25 >= Game.WIDTH)
    }

    isOutOfLives() {
        console.log(this.playerLives);
        if(this.playerLives === 0) {
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
// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

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
    });

});

/***/ }),

/***/ "./src/player_ship.js":
/*!****************************!*\
  !*** ./src/player_ship.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vector = __webpack_require__(/*! ./vectors */ "./src/vectors.js");
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

    moveShip(velocity) {
        this.vel[0] = velocity[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9ib21icy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9lbmVteV9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcl9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLnBsYXllclNoaXAgPSBnYW1lLmFkZFBsYXllclNoaXA7XG4gICAgICAgIC8vIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgIH1cblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIC8vIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XG5cbiAgICAgICAgdGhpcy5nYW1lLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICB0aGlzLmdhbWUuaXNPdXRPZkxpdmVzKCk7XG4gICAgICAgIHRoaXMuZ2FtZS5tb3ZlT2JqZWN0cygpO1xuICAgICAgICB0aGlzLmdhbWUuY2hlY2tDb2xsaXNpb25zKCk7XG4gICAgICAgIC8vIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xuXG4gICAgICAgIC8vIGxldCdzIGNyZWF0ZSBhIG5ldyBtZXRob2QgdG8gY2hlY2sgaWYgdGhhdCBST1VORCBpcyBvdmVyXG4gICAgICAgIC8vIGlmIGl0IGlzLCB0aGUgZ2FtZSBzaG91bGQgcGF1c2UgdGVtcG9yYXJpbHksIGFuZCB0aGVuIHJlc3VtZSBhZnRlciBhIG1vbWVudCdzIHBhdXNlXG4gICAgICAgIC8vIGlmIHRoZSBnYW1lIGlzIG92ZXIsIHRoZW4gdGhlcmUgc2hvdWxkIGJlIGEgZ2FtZSBvdmVyIHNjcmVlbiBkaXNwbGF5aW5nIHRoZSB1c2VyJ3MgY3VycmVudCBzY29yZVxuXG4gICAgICAgIGlmKCF0aGlzLmdhbWUuZ2FtZUlzT3ZlcikgeyBcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmdhbWUuZ2FtZUlzT3Zlcikge1xuICAgICAgICAgICAgY29uc3QgZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1vdmVyJyk7XG4gICAgICAgICAgICBnby5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwbGFzaC1wYWdlJyk7XG4gICAgICAgICAgICBzY3JlZW4uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZDsiLCJjb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuY2xhc3MgQm9tYiBleHRlbmRzIEVudGl0aWVzIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbikge1xuICAgICAgICBzdXBlcihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMucG9zID0gcG9zaXRpb25bMF07XG4gICAgICAgIHRoaXMudmVsID0gWzAsIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KSldO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDU7XG4gICAgICAgIHRoaXMud2lkdGggPSAyLjU7XG4gICAgICAgIHRoaXMuY29sb3IgPSAnd2hpdGUnO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb21iOyIsImNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuXG5jbGFzcyBCdWxsZXQgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3IocG9zaXRpb24pIHtcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xuICAgICAgICB0aGlzLnBvcyA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLnZlbCA9IFswLCAxLjVdO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDY7XG4gICAgICAgIHRoaXMud2lkdGggPSAzO1xuICAgICAgICB0aGlzLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5oZWlnaHQgKiB0aGlzLndpZHRoO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdWxsZXQ7IiwiY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmNsYXNzIEVuZW15U2hpcCBleHRlbmRzIEVudGl0aWVzIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMucG9zID0gcHJvcHMucG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHByb3BzLnZlbDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDI1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDEyO1xuICAgICAgICB0aGlzLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgdGhpcy5nYW1lID0gcHJvcHMuZ2FtZTtcbiAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5oZWlnaHQgKiB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLnZhbHVlID0gcHJvcHMudmFsdWVcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW5lbXlTaGlwOyIsImNvbnN0IFZlY3RvciA9IHJlcXVpcmUoJy4vdmVjdG9ycycpO1xuXG5jbGFzcyBFbnRpdGllcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICB0aGlzLnBvcyA9IHByb3BzLnBvcztcbiAgICAgICAgdGhpcy52ZWwgPSBwcm9wcy52ZWw7XG4gICAgICAgIHRoaXMuY29sb3IgPSBwcm9wcy5jb2xvcjtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwcm9wcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHByb3BzLndpZHRoO1xuICAgICAgICB0aGlzLmdhbWUgPSBwcm9wcy5nYW1lO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgLy8gY29uc3QgZGVsdGEgPSB0aW1lRGVsdGEgfHwgMC4wNTtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gKHRoaXMudmVsWzBdKTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XG4gICAgfVxuICAgIFxufVxuXG5jb25zdCBGUkFNRV9SQVRFX0RFTFRBID0gMTAwMC82MDtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdGllczsiLCJjb25zdCBQbGF5ZXJTaGlwID0gcmVxdWlyZSgnLi9wbGF5ZXJfc2hpcCcpO1xuY29uc3QgRW5lbXlTaGlwID0gcmVxdWlyZSgnLi9lbmVteV9zaGlwJyk7XG5jb25zdCBCdWxsZXQgPSByZXF1aXJlKCcuL2J1bGxldCcpO1xuY29uc3QgQm9tYiA9IHJlcXVpcmUoJy4vYm9tYnMnKTtcblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZUJvYXJkLCBzY29yZSkge1xuICAgICAgICB0aGlzLmVuZW15U2hpcHMgPSBbXTtcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XG4gICAgICAgIHRoaXMuYm9tYnMgPSBbXTtcbiAgICAgICAgdGhpcy53YXZlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmVuZW1pZXNBZGRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXllclNoaXAgPSBudWxsO1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IGdhbWVCb2FyZDtcbiAgICAgICAgdGhpcy5wbGF5ZXJMaXZlcyA9IDM7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZSB8fCAwO1xuICAgICAgICB0aGlzLmdhbWVJc092ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZXdSb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpZmVXYXNMb3N0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYm9tYnMgPSBbXTtcbiAgICAgICAgdGhpcy5udW1Cb21icyA9IDU7XG5cbiAgICAgICAgdGhpcy5hZGRFbmVtaWVzKCk7XG4gICAgICAgIHRoaXMuYWRkUGxheWVyU2hpcCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgYWRkUGxheWVyU2hpcCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwID0gbmV3IFBsYXllclNoaXAoe1xuICAgICAgICAgICAgcG9zOiBbMzAwLCA2NTBdLFxuICAgICAgICAgICAgdmVsOiBbMCwgMF0sXG4gICAgICAgICAgICBoZWlnaHQ6IDIwLFxuICAgICAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICAgICAgY29sb3I6ICdsaW1lJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGQoc2hpcCkge1xuICAgICAgICB0aGlzLmVuZW15U2hpcHMucHVzaChzaGlwKTtcbiAgICB9XG5cbiAgICBhZGRCdWxsZXQoYnVsbGV0KSB7XG4gICAgICAgIHRoaXMuYnVsbGV0cy5wdXNoKGJ1bGxldCk7XG4gICAgfVxuXG4gICAgYWRkQm9tYnMoYm9tYikge1xuICAgICAgICB0aGlzLmJvbWJzLnB1c2goYm9tYik7XG4gICAgfVxuXG4gICAgYWRkRW5lbWllcygpIHtcblxuICAgICAgICBsZXQgeSA9IDEwMDtcbiAgICAgICAgZm9yKGxldCBpID0gNTsgaSA+IDE7IGktLSkge1xuICAgICAgICAgICAgbGV0IHggPSA0MDtcbiAgICAgICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCAxMTsgbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobmV3IEVuZW15U2hpcCh7XG4gICAgICAgICAgICAgICAgICAgIHBvczogW3gsIHldLFxuICAgICAgICAgICAgICAgICAgICB2ZWw6IFsxLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGkgKiAxMFxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIHggKz0gNDU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ICs9IDM1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbWllc0FkZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9ICcuLi9hc3NldHMvaW1hZ2VzL2hhbG8uanBnJztcblxuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIC01MDAsIDApO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgY3R4LmZvbnQgPSBcIjMwcHggQ29taWMgU2FucyBNU1wiO1xuICAgICAgICBjdHguZmlsbHN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KGBTY29yZTogJHt0aGlzLnNjb3JlfWAsIDQxMCwgNTApXG4gICAgICAgIFxuICAgICAgICBjdHguZm9udCA9IFwiMzBweCBDb21pYyBTYW5zIE1TXCI7XG4gICAgICAgIGN0eC5maWxsc3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFRleHQoYExpdmVzOiAke3RoaXMucGxheWVyTGl2ZXN9YCwgMjAsIDUwKVxuXG4gICAgICAgIHRoaXMuZW5lbXlTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgICBzaGlwLmRyYXcoY3R4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLmRyYXcoY3R4KTtcblxuICAgICAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0KSA9PiB7XG4gICAgICAgICAgICBidWxsZXQuZHJhdyhjdHgpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYm9tYnMuZm9yRWFjaCgoYm9tYikgPT4ge1xuICAgICAgICAgICAgYm9tYi5kcmF3KGN0eCk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBib21ic0F3YXkoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IodGhpcy5lbmVteVNoaXBzLmxlbmd0aCkpO1xuICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5lbmVteVNoaXBzW3NoaXBJbmRleF07XG4gICAgICAgIGNvbnN0IHNoaXBQb3MgPSBbKHNoaXAucG9zWzBdIC0gMTApLCAoc2hpcC5wb3NbMV0gKyAxMyldXG4gICAgICAgIC8vIGNvbnN0IGJvbWJQb3NpdGlvbiA9IFt0aGlzLmVuZW15U2hpcHNbc2hpcEluZGV4XS5wb3NbMF0gLSAxMCwgdGhpcy5lbmVteVNoaXBzW3NoaXBJbmRleF0ucG9zWzFdICsgMTNdO1xuICAgICAgICBjb25zdCBib21iUG9zaXRpb24gPSBbc2hpcFBvc107XG4gICAgICAgIHRoaXMuYWRkQm9tYnMobmV3IEJvbWIoYm9tYlBvc2l0aW9uKSk7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb25zKCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5lbmVteVNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLmVuZW15U2hpcHNbaV07XG4gICAgICAgICAgICBsZXQgZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmJ1bGxldHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidWxsZXQgPSB0aGlzLmJ1bGxldHNbal07XG5cbiAgICAgICAgICAgICAgICBpZihidWxsZXQucG9zWzBdID49IChlbmVteS5wb3NbMF0gLSBlbmVteS53aWR0aC8yKSAmJiBidWxsZXQucG9zWzBdIDw9IChlbmVteS5wb3NbMF0gKyBlbmVteS53aWR0aC8yKSAmJlxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3NbMV0gPj0gKGVuZW15LnBvc1sxXSAtIGVuZW15LmhlaWdodC8yKSAmJiBidWxsZXQucG9zWzFdIDw9IChlbmVteS5wb3NbMV0gKyBlbmVteS5oZWlnaHQvMikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxsZXRzLnNwbGljZShqLS0sIDEpO1xuICAgICAgICAgICAgICAgICAgICBkZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMuZW5lbXlTaGlwc1tpXS52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbmVteVNoaXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bUJvbWJzICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVuZW1pZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQbGF5ZXJTaGlwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnBvc1sxXSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxsZXRzLnNwbGljZSh0aGlzLmJ1bGxldHMuaW5kZXhPZihidWxsZXQpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZih0aGlzLmJvbWJzKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBuID0gMDsgbiA8IHRoaXMuYm9tYnMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9tYiA9IHRoaXMuYm9tYnNbbl07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXllciA9IHRoaXMucGxheWVyU2hpcDtcbiAgICAgICAgICAgICAgICAgICAgaWYoYm9tYi5wb3NbMF0gPj0gKHBsYXllci5wb3NbMF0gLSBwbGF5ZXIud2lkdGgpICYmIGJvbWIucG9zWzBdIDw9IChwbGF5ZXIucG9zWzBdICsgcGxheWVyLndpZHRoKSAmJlxuICAgICAgICAgICAgICAgICAgICBib21iLnBvc1sxXSA+PSAocGxheWVyLnBvc1sxXSAtIHBsYXllci5oZWlnaHQvMikgJiYgYm9tYi5wb3NbMV0gPD0gKHBsYXllci5wb3NbMV0gKyBwbGF5ZXIuaGVpZ2h0LzIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvbWJzLnNwbGljZSh0aGlzLmJvbWJzLmluZGV4T2YoYm9tYiksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJMaXZlcyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saWZlV2FzTG9zdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYm9tYnMuZm9yRWFjaCgoYm9tYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGJvbWIucG9zWzFdID4gNzIwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9tYnMuc3BsaWNlKHRoaXMuYm9tYnMuaW5kZXhPZihib21iKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU9iamVjdHMoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZ2FtZU92ZXIoc2hpcC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVteVNoaXBzLm1hcCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzaGlwLnZlbCA9IFswLCAwXTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbiA9IDE7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaXNPdXRPZkJvdW5kcyhzaGlwLnBvcykpIHtcblxuICAgICAgICAgICAgICAgIGlmKHNoaXAucG9zWzBdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMubWFwKChzaGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnBvc1sxXSArPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucG9zWzBdICs9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC52ZWwgPSBbbiwgMF07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteVNoaXBzLm1hcCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5wb3NbMV0gKz0gMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnBvc1swXSAtPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAudmVsID0gWy0obiksIDBdO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaGlwLm1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0KSA9PiB7XG4gICAgICAgICAgICBidWxsZXQucG9zWzFdIC09IGJ1bGxldC52ZWxbMV07XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5ib21icy5mb3JFYWNoKChib21iKSA9PiB7XG4gICAgICAgICAgICBib21iLnBvc1sxXSArPSBib21iLnZlbFsxXTtcbiAgICAgICAgfSlcblxuICAgICAgICBpZih0aGlzLmJvbWJzLmxlbmd0aCA8IHRoaXMubnVtQm9tYnMpIHtcbiAgICAgICAgICAgIHRoaXMuYm9tYnNBd2F5KCk7XG4gICAgICAgIH07XG5cblxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckV2ZW50cygpIHtcbiAgICAgICAgbGV0IHNwZWVkID0gMjtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHsgXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzT3V0T2ZCb3VuZHModGhpcy5wbGF5ZXJTaGlwLnBvcykpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllclNoaXAucG9zWzBdIC09IDIwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyU2hpcC52ZWxbMF0gPSAtc3BlZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc091dE9mQm91bmRzKHRoaXMucGxheWVyU2hpcC5wb3MpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLnBvc1swXSArPSAyMFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyU2hpcC52ZWxbMF0gPSBzcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gW3RoaXMucGxheWVyU2hpcC5wb3NbMF0gKyAxMCwgdGhpcy5wbGF5ZXJTaGlwLnBvc1sxXSAtIDEzXTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnVsbGV0cy5sZW5ndGggPCA3KSB7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1bGxldChuZXcgQnVsbGV0KHBvc2l0aW9uKSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5tb3ZlU2hpcChkaXJlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc091dE9mQm91bmRzKHBvcykge1xuICAgICAgICByZXR1cm4ocG9zWzBdIDwgMCkgfHwgKHBvc1swXSArIDI1ID49IEdhbWUuV0lEVEgpXG4gICAgfVxuXG4gICAgaXNPdXRPZkxpdmVzKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBsYXllckxpdmVzKTtcbiAgICAgICAgaWYodGhpcy5wbGF5ZXJMaXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lSXNPdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdhbWVPdmVyKHBvcykge1xuICAgICAgICBpZihwb3NbMV0gPiA2MjApIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUlzT3ZlciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZShlbnRpdHkpIHtcbiAgICAgICAgaWYoZW50aXR5IGluc3RhbmNlb2YgRW5lbXlTaGlwKSB7XG4gICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMuc3BsaWNlKHRoaXMuZW5lbXlTaGlwcy5pbmRleE9mKGVudGl0eSksIDEpO1xuICAgICAgICB9IGVsc2UgaWYoZW50aXR5IGluc3RhbmNlb2YgQnVsbGV0KSB7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldHMuc3BsaWNlKHRoaXMuYnVsbGV0cy5pbmRleE9mKGVudGl0eSksIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbkdhbWUuTlVNX0VORU1JRVMgPSA1NTtcbkdhbWUuSEVJR0hUID0gNzIwO1xuR2FtZS5XSURUSCA9IDYwMDtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNvbnN0IFBsYXllclNoaXAgPSByZXF1aXJlKCcuL3BsYXllcl9zaGlwJyk7XG5jb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL2dhbWUnKTtcbmNvbnN0IEJvYXJkID0gcmVxdWlyZSgnLi9ib2FyZCcpO1xuLy8gY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKVxuLy8gY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuLy8gY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMFxuXG4vLyBleHByZXNzKClcbi8vICAgLmxpc3RlbihQT1JULCAoKSA9PiBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIG9uICR7IFBPUlQgfWApKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG4gICAgZ2FtZUJvYXJkLndpZHRoID0gNjAwO1xuICAgIGdhbWVCb2FyZC5oZWlnaHQgPSA3MjA7XG4gICAgXG4gICAgY29uc3QgY3R4ID0gZ2FtZUJvYXJkLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2FtZUJvYXJkKTtcbiAgICBjb25zdCBib2FyZCA9IG5ldyBCb2FyZChnYW1lLCBjdHgpO1xuICAgIGdhbWUuZHJhdyhjdHgpO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcbiAgICBcbiAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGdhbWVCb2FyZCk7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGdhbWUsIGN0eCk7XG4gICAgICAgIGdhbWUuZHJhdyhjdHgpO1xuICAgICAgICBib2FyZC5zdGFydCgpO1xuICAgIH0pO1xuXG59KTsiLCJjb25zdCBWZWN0b3IgPSByZXF1aXJlKCcuL3ZlY3RvcnMnKTtcbmNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuXG5jbGFzcyBQbGF5ZXJTaGlwIGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNzKSB7XG4gICAgICAgIHN1cGVyKHNwZWNzKTtcbiAgICAgICAgdGhpcy5wb3MgPSBzcGVjcy5wb3M7XG4gICAgICAgIHRoaXMuY29sb3IgPSAnbGltZSc7XG4gICAgICAgIHRoaXMud2lkdGggPSAyNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMDtcbiAgICAgICAgdGhpcy52ZWwgPSBzcGVjcy52ZWwgfHwgWzAsIDBdO1xuICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLmhlaWdodCAqIHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgbW92ZVNoaXAodmVsb2NpdHkpIHtcbiAgICAgICAgdGhpcy52ZWxbMF0gPSB2ZWxvY2l0eVswXTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJTaGlwOyIsImNvbnN0IFZlY3RvciA9IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfSxcbiAgICAgICAgXG4gICAgYWRkKHYxLCB2Mikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHYxLnggKyB2Mi54LFxuICAgICAgICAgICAgdjEueSArIHYyLnlcbiAgICAgICAgKTtcbiAgICB9LFxuICAgICAgICAgICAgXG4gICAgc3VidHJhY3QodjEsIHYyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgdjEueCAtIHYyLngsXG4gICAgICAgICAgICB2MS55IC0gdjIueVxuICAgICAgICApXG4gICAgfSxcbiAgICBcbiAgICBtdWx0aXBseSh2LCBuKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgdi54ICogbixcbiAgICAgICAgICAgIHYueSAqIG5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcbiAgICB2ZWNMZW5ndGgodmVjdG9yKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodmVjdG9yLnggKiB2ZWN0b3IueCArIHZlY3Rvci55ICogdmVjdG9yLnkpO1xuICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFxuICAgIGRpc3RhbmNlKHAxLCBwMikge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3cocDFbMF0gLSBwMlswXSwgMikgKyBNYXRoLnBvdyhwMVsxXSArIHAyWzFdLCAyKVxuICAgICAgICApO1xuICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAvLyB0aGUgaWRlYSBoZXJlIGlzIHRvIHJlc2V0IHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciB0byBvbmUuIEkgZmVlbCBsaWtlIEkgbWlnaHQgYmUgbWlzc2luZyBzb21lIFxuICAgIC8vIGVkZ2UgY2FzZXMgb3IgbmVlZCB0byBhY2NvdW50IGZvciAwLCBidXQgd2UgY2FuIGNpcmNsZSBiYWNrIHRvIHRoaXMgd2hlbiB3ZSBpbXBsZW1lbnRcbiAgICAvLyB0aGUgYWN0dWFsIGdhbWUgbWVjaGFuaWNzXG4gICAgbm9ybWFsaXplKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHZlY3Rvci54IC8gdmVjdG9yTGVuZ3RoKHZlY3RvciksXG4gICAgICAgICAgICB2ZWN0b3IueSAvIHZlY3Rvckxlbmd0aCh2ZWN0b3IpXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjsiXSwic291cmNlUm9vdCI6IiJ9