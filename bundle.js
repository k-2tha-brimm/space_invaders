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
        this.vel = [0, 1.7];
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

        // ctx.textAlign = 'center';
        
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

        if(this.bombs.length < 2) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9ib21icy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9lbmVteV9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcl9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMucGxheWVyU2hpcCA9IGdhbWUuYWRkUGxheWVyU2hpcDtcbiAgICAgICAgLy8gdGhpcy5sYXN0VGltZSA9IDA7XG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgLy8gY29uc3QgZGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcblxuICAgICAgICB0aGlzLmdhbWUuZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgIHRoaXMuZ2FtZS5pc091dE9mTGl2ZXMoKTtcbiAgICAgICAgdGhpcy5nYW1lLm1vdmVPYmplY3RzKCk7XG4gICAgICAgIHRoaXMuZ2FtZS5jaGVja0NvbGxpc2lvbnMoKTtcbiAgICAgICAgLy8gdGhpcy5sYXN0VGltZSA9IHRpbWU7XG5cbiAgICAgICAgLy8gbGV0J3MgY3JlYXRlIGEgbmV3IG1ldGhvZCB0byBjaGVjayBpZiB0aGF0IFJPVU5EIGlzIG92ZXJcbiAgICAgICAgLy8gaWYgaXQgaXMsIHRoZSBnYW1lIHNob3VsZCBwYXVzZSB0ZW1wb3JhcmlseSwgYW5kIHRoZW4gcmVzdW1lIGFmdGVyIGEgbW9tZW50J3MgcGF1c2VcbiAgICAgICAgLy8gaWYgdGhlIGdhbWUgaXMgb3ZlciwgdGhlbiB0aGVyZSBzaG91bGQgYmUgYSBnYW1lIG92ZXIgc2NyZWVuIGRpc3BsYXlpbmcgdGhlIHVzZXIncyBjdXJyZW50IHNjb3JlXG5cbiAgICAgICAgaWYoIXRoaXMuZ2FtZS5nYW1lSXNPdmVyKSB7IFxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuZ2FtZS5nYW1lSXNPdmVyKSB7XG4gICAgICAgICAgICBjb25zdCBnbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW92ZXInKTtcbiAgICAgICAgICAgIGdvLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BsYXNoLXBhZ2UnKTtcbiAgICAgICAgICAgIHNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvYXJkOyIsImNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuXG5jbGFzcyBCb21iIGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3NpdGlvblswXTtcbiAgICAgICAgdGhpcy52ZWwgPSBbMCwgMS43XTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1O1xuICAgICAgICB0aGlzLndpZHRoID0gMi41O1xuICAgICAgICB0aGlzLmNvbG9yID0gJ3doaXRlJztcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQm9tYjsiLCJjb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuY2xhc3MgQnVsbGV0IGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy52ZWwgPSBbMCwgMS41XTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA2O1xuICAgICAgICB0aGlzLndpZHRoID0gMztcbiAgICAgICAgdGhpcy5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnVsbGV0OyIsImNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuXG5jbGFzcyBFbmVteVNoaXAgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnBvcyA9IHByb3BzLnBvcztcbiAgICAgICAgdGhpcy52ZWwgPSBwcm9wcy52ZWw7XG4gICAgICAgIHRoaXMud2lkdGggPSAyNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMjtcbiAgICAgICAgdGhpcy5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIHRoaXMuZ2FtZSA9IHByb3BzLmdhbWU7XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHByb3BzLnZhbHVlXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZW15U2hpcDsiLCJjb25zdCBWZWN0b3IgPSByZXF1aXJlKCcuL3ZlY3RvcnMnKTtcblxuY2xhc3MgRW50aXRpZXMge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwcm9wcy5wb3M7XG4gICAgICAgIHRoaXMudmVsID0gcHJvcHMudmVsO1xuICAgICAgICB0aGlzLmNvbG9yID0gcHJvcHMuY29sb3I7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcHJvcHMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLmhlaWdodCAqIHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMud2lkdGggPSBwcm9wcy53aWR0aDtcbiAgICAgICAgdGhpcy5nYW1lID0gcHJvcHMuZ2FtZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIC8vIGNvbnN0IGRlbHRhID0gdGltZURlbHRhIHx8IDAuMDU7XG4gICAgICAgIHRoaXMucG9zWzBdICs9ICh0aGlzLnZlbFswXSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xuICAgIH1cbiAgICBcbn1cblxuY29uc3QgRlJBTUVfUkFURV9ERUxUQSA9IDEwMDAvNjA7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXRpZXM7IiwiY29uc3QgUGxheWVyU2hpcCA9IHJlcXVpcmUoJy4vcGxheWVyX3NoaXAnKTtcbmNvbnN0IEVuZW15U2hpcCA9IHJlcXVpcmUoJy4vZW5lbXlfc2hpcCcpO1xuY29uc3QgQnVsbGV0ID0gcmVxdWlyZSgnLi9idWxsZXQnKTtcbmNvbnN0IEJvbWIgPSByZXF1aXJlKCcuL2JvbWJzJyk7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVCb2FyZCwgc2NvcmUpIHtcbiAgICAgICAgdGhpcy5lbmVteVNoaXBzID0gW107XG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xuICAgICAgICB0aGlzLmJvbWJzID0gW107XG4gICAgICAgIHRoaXMud2F2ZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5lbmVtaWVzQWRkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwID0gbnVsbDtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBnYW1lQm9hcmQ7XG4gICAgICAgIHRoaXMucGxheWVyTGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmUgfHwgMDtcbiAgICAgICAgdGhpcy5nYW1lSXNPdmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmV3Um91bmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saWZlV2FzTG9zdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvbWJzID0gW107XG5cbiAgICAgICAgdGhpcy5hZGRFbmVtaWVzKCk7XG4gICAgICAgIHRoaXMuYWRkUGxheWVyU2hpcCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgYWRkUGxheWVyU2hpcCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwID0gbmV3IFBsYXllclNoaXAoe1xuICAgICAgICAgICAgcG9zOiBbMzAwLCA2NTBdLFxuICAgICAgICAgICAgdmVsOiBbMCwgMF0sXG4gICAgICAgICAgICBoZWlnaHQ6IDIwLFxuICAgICAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICAgICAgY29sb3I6ICdsaW1lJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGQoc2hpcCkge1xuICAgICAgICB0aGlzLmVuZW15U2hpcHMucHVzaChzaGlwKTtcbiAgICB9XG5cbiAgICBhZGRCdWxsZXQoYnVsbGV0KSB7XG4gICAgICAgIHRoaXMuYnVsbGV0cy5wdXNoKGJ1bGxldCk7XG4gICAgfVxuXG4gICAgYWRkQm9tYnMoYm9tYikge1xuICAgICAgICB0aGlzLmJvbWJzLnB1c2goYm9tYik7XG4gICAgfVxuXG4gICAgYWRkRW5lbWllcygpIHtcblxuICAgICAgICBsZXQgeSA9IDEwMDtcbiAgICAgICAgZm9yKGxldCBpID0gNTsgaSA+IDE7IGktLSkge1xuICAgICAgICAgICAgbGV0IHggPSA0MDtcbiAgICAgICAgICAgIGZvcihsZXQgbiA9IDA7IG4gPCAxMTsgbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobmV3IEVuZW15U2hpcCh7XG4gICAgICAgICAgICAgICAgICAgIHBvczogW3gsIHldLFxuICAgICAgICAgICAgICAgICAgICB2ZWw6IFsxLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgZ2FtZTogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGkgKiAxMFxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIHggKz0gNDU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ICs9IDM1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbWllc0FkZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9ICcuLi9hc3NldHMvaW1hZ2VzL2hhbG8uanBnJztcblxuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIC01MDAsIDApO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgXG4gICAgICAgIGN0eC5mb250ID0gXCIzMHB4IENvbWljIFNhbnMgTVNcIjtcbiAgICAgICAgY3R4LmZpbGxzdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dChgU2NvcmU6ICR7dGhpcy5zY29yZX1gLCA0MTAsIDUwKVxuICAgICAgICBcbiAgICAgICAgY3R4LmZvbnQgPSBcIjMwcHggQ29taWMgU2FucyBNU1wiO1xuICAgICAgICBjdHguZmlsbHN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KGBMaXZlczogJHt0aGlzLnBsYXllckxpdmVzfWAsIDIwLCA1MClcblxuICAgICAgICB0aGlzLmVuZW15U2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgc2hpcC5kcmF3KGN0eCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGxheWVyU2hpcC5kcmF3KGN0eCk7XG5cbiAgICAgICAgdGhpcy5idWxsZXRzLmZvckVhY2goKGJ1bGxldCkgPT4ge1xuICAgICAgICAgICAgYnVsbGV0LmRyYXcoY3R4KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmJvbWJzLmZvckVhY2goKGJvbWIpID0+IHtcbiAgICAgICAgICAgIGJvbWIuZHJhdyhjdHgpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgYm9tYnNBd2F5KCkge1xuICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKHRoaXMuZW5lbXlTaGlwcy5sZW5ndGgpKTtcbiAgICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZW5lbXlTaGlwc1tzaGlwSW5kZXhdO1xuICAgICAgICBjb25zdCBzaGlwUG9zID0gWyhzaGlwLnBvc1swXSAtIDEwKSwgKHNoaXAucG9zWzFdICsgMTMpXVxuICAgICAgICAvLyBjb25zdCBib21iUG9zaXRpb24gPSBbdGhpcy5lbmVteVNoaXBzW3NoaXBJbmRleF0ucG9zWzBdIC0gMTAsIHRoaXMuZW5lbXlTaGlwc1tzaGlwSW5kZXhdLnBvc1sxXSArIDEzXTtcbiAgICAgICAgY29uc3QgYm9tYlBvc2l0aW9uID0gW3NoaXBQb3NdO1xuICAgICAgICB0aGlzLmFkZEJvbWJzKG5ldyBCb21iKGJvbWJQb3NpdGlvbikpO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucygpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZW5lbXlTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5lbmVteVNoaXBzW2ldO1xuICAgICAgICAgICAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5idWxsZXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnVsbGV0ID0gdGhpcy5idWxsZXRzW2pdO1xuXG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnBvc1swXSA+PSAoZW5lbXkucG9zWzBdIC0gZW5lbXkud2lkdGgvMikgJiYgYnVsbGV0LnBvc1swXSA8PSAoZW5lbXkucG9zWzBdICsgZW5lbXkud2lkdGgvMikgJiZcbiAgICAgICAgICAgICAgICBidWxsZXQucG9zWzFdID49IChlbmVteS5wb3NbMV0gLSBlbmVteS5oZWlnaHQvMikgJiYgYnVsbGV0LnBvc1sxXSA8PSAoZW5lbXkucG9zWzFdICsgZW5lbXkuaGVpZ2h0LzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0cy5zcGxpY2Uoai0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSB0aGlzLmVuZW15U2hpcHNbaV0udmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVteVNoaXBzLnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlTaGlwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxsZXRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRW5lbWllcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBsYXllclNoaXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYnVsbGV0cy5mb3JFYWNoKChidWxsZXQpID0+IHtcbiAgICAgICAgICAgICAgICBpZihidWxsZXQucG9zWzFdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldHMuc3BsaWNlKHRoaXMuYnVsbGV0cy5pbmRleE9mKGJ1bGxldCksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKHRoaXMuYm9tYnMpIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IG4gPSAwOyBuIDwgdGhpcy5ib21icy5sZW5ndGg7IG4rKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib21iID0gdGhpcy5ib21ic1tuXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheWVyID0gdGhpcy5wbGF5ZXJTaGlwO1xuICAgICAgICAgICAgICAgICAgICBpZihib21iLnBvc1swXSA+PSAocGxheWVyLnBvc1swXSAtIHBsYXllci53aWR0aCkgJiYgYm9tYi5wb3NbMF0gPD0gKHBsYXllci5wb3NbMF0gKyBwbGF5ZXIud2lkdGgpICYmXG4gICAgICAgICAgICAgICAgICAgIGJvbWIucG9zWzFdID49IChwbGF5ZXIucG9zWzFdIC0gcGxheWVyLmhlaWdodC8yKSAmJiBib21iLnBvc1sxXSA8PSAocGxheWVyLnBvc1sxXSArIHBsYXllci5oZWlnaHQvMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9tYnMuc3BsaWNlKHRoaXMuYm9tYnMuaW5kZXhPZihib21iKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckxpdmVzIC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpZmVXYXNMb3N0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5ib21icy5mb3JFYWNoKChib21iKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoYm9tYi5wb3NbMV0gPiA3MjApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib21icy5zcGxpY2UodGhpcy5ib21icy5pbmRleE9mKGJvbWIpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlT2JqZWN0cygpIHtcbiAgICAgICAgdGhpcy5lbmVteVNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcblxuICAgICAgICAgICAgaWYodGhpcy5nYW1lT3ZlcihzaGlwLnBvcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMubWFwKChzaGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXAudmVsID0gWzAsIDBdO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBuID0gMTtcblxuICAgICAgICAgICAgaWYodGhpcy5pc091dE9mQm91bmRzKHNoaXAucG9zKSkge1xuXG4gICAgICAgICAgICAgICAgaWYoc2hpcC5wb3NbMF0gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlTaGlwcy5tYXAoKHNoaXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucG9zWzFdICs9IDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5wb3NbMF0gKz0gMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnZlbCA9IFtuLCAwXTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMubWFwKChzaGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnBvc1sxXSArPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucG9zWzBdIC09IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC52ZWwgPSBbLShuKSwgMF07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNoaXAubW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYnVsbGV0cy5mb3JFYWNoKChidWxsZXQpID0+IHtcbiAgICAgICAgICAgIGJ1bGxldC5wb3NbMV0gLT0gYnVsbGV0LnZlbFsxXTtcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmJvbWJzLmZvckVhY2goKGJvbWIpID0+IHtcbiAgICAgICAgICAgIGJvbWIucG9zWzFdICs9IGJvbWIudmVsWzFdO1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmKHRoaXMuYm9tYnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgdGhpcy5ib21ic0F3YXkoKTtcbiAgICAgICAgfTtcblxuXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyRXZlbnRzKCkge1xuICAgICAgICBsZXQgc3BlZWQgPSAyO1xuICAgICAgICBsZXQgZGlyZWN0aW9uID0geyBcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBpZihlLmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNPdXRPZkJvdW5kcyh0aGlzLnBsYXllclNoaXAucG9zKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5wb3NbMF0gLT0gMjA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLnZlbFswXSA9IC1zcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzT3V0T2ZCb3VuZHModGhpcy5wbGF5ZXJTaGlwLnBvcykpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllclNoaXAucG9zWzBdICs9IDIwXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLnZlbFswXSA9IHNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBbdGhpcy5wbGF5ZXJTaGlwLnBvc1swXSArIDEwLCB0aGlzLnBsYXllclNoaXAucG9zWzFdIC0gMTNdO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5idWxsZXRzLmxlbmd0aCA8IDcpIHsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVsbGV0KG5ldyBCdWxsZXQocG9zaXRpb24pKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLm1vdmVTaGlwKGRpcmVjdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzT3V0T2ZCb3VuZHMocG9zKSB7XG4gICAgICAgIHJldHVybihwb3NbMF0gPCAwKSB8fCAocG9zWzBdICsgMjUgPj0gR2FtZS5XSURUSClcbiAgICB9XG5cbiAgICBpc091dE9mTGl2ZXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGxheWVyTGl2ZXMpO1xuICAgICAgICBpZih0aGlzLnBsYXllckxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVJc092ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIocG9zKSB7XG4gICAgICAgIGlmKHBvc1sxXSA+IDYyMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lSXNPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGVudGl0eSkge1xuICAgICAgICBpZihlbnRpdHkgaW5zdGFuY2VvZiBFbmVteVNoaXApIHtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlTaGlwcy5zcGxpY2UodGhpcy5lbmVteVNoaXBzLmluZGV4T2YoZW50aXR5KSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZihlbnRpdHkgaW5zdGFuY2VvZiBCdWxsZXQpIHtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0cy5zcGxpY2UodGhpcy5idWxsZXRzLmluZGV4T2YoZW50aXR5KSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuR2FtZS5OVU1fRU5FTUlFUyA9IDU1O1xuR2FtZS5IRUlHSFQgPSA3MjA7XG5HYW1lLldJRFRIID0gNjAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY29uc3QgUGxheWVyU2hpcCA9IHJlcXVpcmUoJy4vcGxheWVyX3NoaXAnKTtcbmNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpO1xuY29uc3QgQm9hcmQgPSByZXF1aXJlKCcuL2JvYXJkJyk7XG4vLyBjb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpXG4vLyBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4vLyBjb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwXG5cbi8vIGV4cHJlc3MoKVxuLy8gICAubGlzdGVuKFBPUlQsICgpID0+IGNvbnNvbGUubG9nKGBMaXN0ZW5pbmcgb24gJHsgUE9SVCB9YCkpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1jYW52YXMnKTtcbiAgICBnYW1lQm9hcmQud2lkdGggPSA2MDA7XG4gICAgZ2FtZUJvYXJkLmhlaWdodCA9IDcyMDtcbiAgICBcbiAgICBjb25zdCBjdHggPSBnYW1lQm9hcmQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShnYW1lQm9hcmQpO1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGdhbWUsIGN0eCk7XG4gICAgZ2FtZS5kcmF3KGN0eCk7XG5cbiAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuICAgIFxuICAgIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2FtZUJvYXJkKTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoZ2FtZSwgY3R4KTtcbiAgICAgICAgZ2FtZS5kcmF3KGN0eCk7XG4gICAgICAgIGJvYXJkLnN0YXJ0KCk7XG4gICAgfSk7XG5cbn0pXG5cbndpbmRvdy5QbGF5ZXJTaGlwID0gUGxheWVyU2hpcDtcbndpbmRvdy5FbnRpdGllcyA9IEVudGl0aWVzOyIsImNvbnN0IFZlY3RvciA9IHJlcXVpcmUoJy4vdmVjdG9ycycpO1xuY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmNsYXNzIFBsYXllclNoaXAgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3Ioc3BlY3MpIHtcbiAgICAgICAgc3VwZXIoc3BlY3MpO1xuICAgICAgICB0aGlzLnBvcyA9IHNwZWNzLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9ICdsaW1lJztcbiAgICAgICAgdGhpcy53aWR0aCA9IDI1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDEwO1xuICAgICAgICB0aGlzLnZlbCA9IHNwZWNzLnZlbCB8fCBbMCwgMF07XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBtb3ZlU2hpcCh2ZWxvY2l0eSkge1xuICAgICAgICB0aGlzLnZlbFswXSA9IHZlbG9jaXR5WzBdO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclNoaXA7IiwiY29uc3QgVmVjdG9yID0ge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9LFxuICAgICAgICBcbiAgICBhZGQodjEsIHYyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgdjEueCArIHYyLngsXG4gICAgICAgICAgICB2MS55ICsgdjIueVxuICAgICAgICApO1xuICAgIH0sXG4gICAgICAgICAgICBcbiAgICBzdWJ0cmFjdCh2MSwgdjIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgICAgICB2MS54IC0gdjIueCxcbiAgICAgICAgICAgIHYxLnkgLSB2Mi55XG4gICAgICAgIClcbiAgICB9LFxuICAgIFxuICAgIG11bHRpcGx5KHYsIG4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgICAgICB2LnggKiBuLFxuICAgICAgICAgICAgdi55ICogblxuICAgICAgICApO1xuICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFxuICAgIHZlY0xlbmd0aCh2ZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh2ZWN0b3IueCAqIHZlY3Rvci54ICsgdmVjdG9yLnkgKiB2ZWN0b3IueSk7XG4gICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgZGlzdGFuY2UocDEsIHAyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoXG4gICAgICAgICAgICBNYXRoLnBvdyhwMVswXSAtIHAyWzBdLCAyKSArIE1hdGgucG93KHAxWzFdICsgcDJbMV0sIDIpXG4gICAgICAgICk7XG4gICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIC8vIHRoZSBpZGVhIGhlcmUgaXMgdG8gcmVzZXQgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIHRvIG9uZS4gSSBmZWVsIGxpa2UgSSBtaWdodCBiZSBtaXNzaW5nIHNvbWUgXG4gICAgLy8gZWRnZSBjYXNlcyBvciBuZWVkIHRvIGFjY291bnQgZm9yIDAsIGJ1dCB3ZSBjYW4gY2lyY2xlIGJhY2sgdG8gdGhpcyB3aGVuIHdlIGltcGxlbWVudFxuICAgIC8vIHRoZSBhY3R1YWwgZ2FtZSBtZWNoYW5pY3NcbiAgICBub3JtYWxpemUodmVjdG9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgdmVjdG9yLnggLyB2ZWN0b3JMZW5ndGgodmVjdG9yKSxcbiAgICAgICAgICAgIHZlY3Rvci55IC8gdmVjdG9yTGVuZ3RoKHZlY3RvcilcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yOyJdLCJzb3VyY2VSb290IjoiIn0=