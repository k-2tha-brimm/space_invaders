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

    animate() {
        this.game.draw(this.ctx);
        this.game.isOutOfLives();
        this.game.moveObjects();
        this.game.checkCollisions();


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
        let speed = 9;
        let direction = { 
            x: 0,
            y: 0
        };
        
        document.addEventListener('keydown', e => {
            if(e.keyCode === 37) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.vel[0] = -speed;
                    // this.playerShip.pos[0] -= this.playerShip.vel[0];
                } else {
                    this.playerShip.vel[0] = -speed;
                }
            } else if(e.keyCode === 39) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.vel[0] = speed;
                    this.playerShip.pos[0] += speed;
                } else {
                    this.playerShip.vel[0] = speed;
                }
            } else if(e.keyCode === 32) {
                const position = [this.playerShip.pos[0] + 10, this.playerShip.pos[1] - 13];

                if(this.bullets.length < 7) { 
                    this.addBullet(new Bullet(position))
                }

            }
            this.playerShip.moveShip();
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

    const newNew = document.getElementById('new');
    
    newNew.addEventListener('click', () => {
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

    moveShip() {
        this.pos[0] += this.vel[0];
        console.log(this.vel[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9ib21icy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9lbmVteV9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXllcl9zaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Es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QTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSwgY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLnBsYXllclNoaXAgPSBnYW1lLmFkZFBsYXllclNoaXA7XG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICB0aGlzLmdhbWUuaXNPdXRPZkxpdmVzKCk7XG4gICAgICAgIHRoaXMuZ2FtZS5tb3ZlT2JqZWN0cygpO1xuICAgICAgICB0aGlzLmdhbWUuY2hlY2tDb2xsaXNpb25zKCk7XG5cblxuICAgICAgICBpZighdGhpcy5nYW1lLmdhbWVJc092ZXIpIHsgXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5nYW1lLmdhbWVJc092ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGdvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtb3ZlcicpO1xuICAgICAgICAgICAgZ28uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGxhc2gtcGFnZScpO1xuICAgICAgICAgICAgc2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQm9hcmQ7IiwiY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmNsYXNzIEJvbWIgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3IocG9zaXRpb24pIHtcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xuICAgICAgICB0aGlzLnBvcyA9IHBvc2l0aW9uWzBdO1xuICAgICAgICB0aGlzLnZlbCA9IFswLCAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCkpXTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1O1xuICAgICAgICB0aGlzLndpZHRoID0gMi41O1xuICAgICAgICB0aGlzLmNvbG9yID0gJ3doaXRlJztcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQm9tYjsiLCJjb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuY2xhc3MgQnVsbGV0IGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uKSB7XG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy52ZWwgPSBbMCwgMS41XTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA2O1xuICAgICAgICB0aGlzLndpZHRoID0gMztcbiAgICAgICAgdGhpcy5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnVsbGV0OyIsImNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuXG5jbGFzcyBFbmVteVNoaXAgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnBvcyA9IHByb3BzLnBvcztcbiAgICAgICAgdGhpcy52ZWwgPSBwcm9wcy52ZWw7XG4gICAgICAgIHRoaXMud2lkdGggPSAyNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMjtcbiAgICAgICAgdGhpcy5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIHRoaXMuZ2FtZSA9IHByb3BzLmdhbWU7XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHByb3BzLnZhbHVlXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZW15U2hpcDsiLCJjb25zdCBWZWN0b3IgPSByZXF1aXJlKCcuL3ZlY3RvcnMnKTtcblxuY2xhc3MgRW50aXRpZXMge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwcm9wcy5wb3M7XG4gICAgICAgIHRoaXMudmVsID0gcHJvcHMudmVsO1xuICAgICAgICB0aGlzLmNvbG9yID0gcHJvcHMuY29sb3I7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcHJvcHMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLmhlaWdodCAqIHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMud2lkdGggPSBwcm9wcy53aWR0aDtcbiAgICAgICAgdGhpcy5nYW1lID0gcHJvcHMuZ2FtZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIC8vIGNvbnN0IGRlbHRhID0gdGltZURlbHRhIHx8IDAuMDU7XG4gICAgICAgIHRoaXMucG9zWzBdICs9ICh0aGlzLnZlbFswXSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xuICAgIH1cbiAgICBcbn1cblxuY29uc3QgRlJBTUVfUkFURV9ERUxUQSA9IDEwMDAvNjA7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXRpZXM7IiwiY29uc3QgUGxheWVyU2hpcCA9IHJlcXVpcmUoJy4vcGxheWVyX3NoaXAnKTtcbmNvbnN0IEVuZW15U2hpcCA9IHJlcXVpcmUoJy4vZW5lbXlfc2hpcCcpO1xuY29uc3QgQnVsbGV0ID0gcmVxdWlyZSgnLi9idWxsZXQnKTtcbmNvbnN0IEJvbWIgPSByZXF1aXJlKCcuL2JvbWJzJyk7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVCb2FyZCwgc2NvcmUpIHtcbiAgICAgICAgdGhpcy5lbmVteVNoaXBzID0gW107XG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xuICAgICAgICB0aGlzLmJvbWJzID0gW107XG4gICAgICAgIHRoaXMud2F2ZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5lbmVtaWVzQWRkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTaGlwID0gbnVsbDtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBnYW1lQm9hcmQ7XG4gICAgICAgIHRoaXMucGxheWVyTGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmUgfHwgMDtcbiAgICAgICAgdGhpcy5nYW1lSXNPdmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmV3Um91bmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saWZlV2FzTG9zdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvbWJzID0gW107XG4gICAgICAgIHRoaXMubnVtQm9tYnMgPSA1O1xuXG4gICAgICAgIHRoaXMuYWRkRW5lbWllcygpO1xuICAgICAgICB0aGlzLmFkZFBsYXllclNoaXAoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xuICAgIH1cblxuICAgIGFkZFBsYXllclNoaXAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyU2hpcCA9IG5ldyBQbGF5ZXJTaGlwKHtcbiAgICAgICAgICAgIHBvczogWzMwMCwgNjUwXSxcbiAgICAgICAgICAgIHZlbDogWzAsIDBdLFxuICAgICAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgICAgIGNvbG9yOiAnbGltZSdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkKHNoaXApIHtcbiAgICAgICAgdGhpcy5lbmVteVNoaXBzLnB1c2goc2hpcCk7XG4gICAgfVxuXG4gICAgYWRkQnVsbGV0KGJ1bGxldCkge1xuICAgICAgICB0aGlzLmJ1bGxldHMucHVzaChidWxsZXQpO1xuICAgIH1cblxuICAgIGFkZEJvbWJzKGJvbWIpIHtcbiAgICAgICAgdGhpcy5ib21icy5wdXNoKGJvbWIpO1xuICAgIH1cblxuICAgIGFkZEVuZW1pZXMoKSB7XG5cbiAgICAgICAgbGV0IHkgPSAxMDA7XG4gICAgICAgIGZvcihsZXQgaSA9IDU7IGkgPiAxOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCB4ID0gNDA7XG4gICAgICAgICAgICBmb3IobGV0IG4gPSAwOyBuIDwgMTE7IG4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKG5ldyBFbmVteVNoaXAoe1xuICAgICAgICAgICAgICAgICAgICBwb3M6IFt4LCB5XSxcbiAgICAgICAgICAgICAgICAgICAgdmVsOiBbMSwgMF0sXG4gICAgICAgICAgICAgICAgICAgIGdhbWU6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpICogMTBcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICB4ICs9IDQ1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeSArPSAzNTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZW1pZXNBZGRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSAnLi4vYXNzZXRzL2ltYWdlcy9oYWxvLmpwZyc7XG5cbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAtNTAwLCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGN0eC5mb250ID0gXCIzMHB4IENvbWljIFNhbnMgTVNcIjtcbiAgICAgICAgY3R4LmZpbGxzdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dChgU2NvcmU6ICR7dGhpcy5zY29yZX1gLCA0MTAsIDUwKVxuICAgICAgICBcbiAgICAgICAgY3R4LmZvbnQgPSBcIjMwcHggQ29taWMgU2FucyBNU1wiO1xuICAgICAgICBjdHguZmlsbHN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KGBMaXZlczogJHt0aGlzLnBsYXllckxpdmVzfWAsIDIwLCA1MClcblxuICAgICAgICB0aGlzLmVuZW15U2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgc2hpcC5kcmF3KGN0eCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGxheWVyU2hpcC5kcmF3KGN0eCk7XG5cbiAgICAgICAgdGhpcy5idWxsZXRzLmZvckVhY2goKGJ1bGxldCkgPT4ge1xuICAgICAgICAgICAgYnVsbGV0LmRyYXcoY3R4KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmJvbWJzLmZvckVhY2goKGJvbWIpID0+IHtcbiAgICAgICAgICAgIGJvbWIuZHJhdyhjdHgpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgYm9tYnNBd2F5KCkge1xuICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKHRoaXMuZW5lbXlTaGlwcy5sZW5ndGgpKTtcbiAgICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZW5lbXlTaGlwc1tzaGlwSW5kZXhdO1xuICAgICAgICBjb25zdCBzaGlwUG9zID0gWyhzaGlwLnBvc1swXSAtIDEwKSwgKHNoaXAucG9zWzFdICsgMTMpXVxuICAgICAgICBjb25zdCBib21iUG9zaXRpb24gPSBbc2hpcFBvc107XG4gICAgICAgIHRoaXMuYWRkQm9tYnMobmV3IEJvbWIoYm9tYlBvc2l0aW9uKSk7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb25zKCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5lbmVteVNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZW5lbXkgPSB0aGlzLmVuZW15U2hpcHNbaV07XG4gICAgICAgICAgICBsZXQgZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmJ1bGxldHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidWxsZXQgPSB0aGlzLmJ1bGxldHNbal07XG5cbiAgICAgICAgICAgICAgICBpZihidWxsZXQucG9zWzBdID49IChlbmVteS5wb3NbMF0gLSBlbmVteS53aWR0aC8yKSAmJiBidWxsZXQucG9zWzBdIDw9IChlbmVteS5wb3NbMF0gKyBlbmVteS53aWR0aC8yKSAmJlxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3NbMV0gPj0gKGVuZW15LnBvc1sxXSAtIGVuZW15LmhlaWdodC8yKSAmJiBidWxsZXQucG9zWzFdIDw9IChlbmVteS5wb3NbMV0gKyBlbmVteS5oZWlnaHQvMikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxsZXRzLnNwbGljZShqLS0sIDEpO1xuICAgICAgICAgICAgICAgICAgICBkZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMuZW5lbXlTaGlwc1tpXS52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbmVteVNoaXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bUJvbWJzICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVuZW1pZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQbGF5ZXJTaGlwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoYnVsbGV0LnBvc1sxXSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxsZXRzLnNwbGljZSh0aGlzLmJ1bGxldHMuaW5kZXhPZihidWxsZXQpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZih0aGlzLmJvbWJzKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBuID0gMDsgbiA8IHRoaXMuYm9tYnMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9tYiA9IHRoaXMuYm9tYnNbbl07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXllciA9IHRoaXMucGxheWVyU2hpcDtcbiAgICAgICAgICAgICAgICAgICAgaWYoYm9tYi5wb3NbMF0gPj0gKHBsYXllci5wb3NbMF0gLSBwbGF5ZXIud2lkdGgpICYmIGJvbWIucG9zWzBdIDw9IChwbGF5ZXIucG9zWzBdICsgcGxheWVyLndpZHRoKSAmJlxuICAgICAgICAgICAgICAgICAgICBib21iLnBvc1sxXSA+PSAocGxheWVyLnBvc1sxXSAtIHBsYXllci5oZWlnaHQvMikgJiYgYm9tYi5wb3NbMV0gPD0gKHBsYXllci5wb3NbMV0gKyBwbGF5ZXIuaGVpZ2h0LzIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvbWJzLnNwbGljZSh0aGlzLmJvbWJzLmluZGV4T2YoYm9tYiksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJMaXZlcyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saWZlV2FzTG9zdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYm9tYnMuZm9yRWFjaCgoYm9tYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGJvbWIucG9zWzFdID4gNzIwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9tYnMuc3BsaWNlKHRoaXMuYm9tYnMuaW5kZXhPZihib21iKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU9iamVjdHMoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZ2FtZU92ZXIoc2hpcC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVteVNoaXBzLm1hcCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzaGlwLnZlbCA9IFswLCAwXTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbiA9IDE7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaXNPdXRPZkJvdW5kcyhzaGlwLnBvcykpIHtcblxuICAgICAgICAgICAgICAgIGlmKHNoaXAucG9zWzBdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hpcHMubWFwKChzaGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnBvc1sxXSArPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucG9zWzBdICs9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC52ZWwgPSBbbiwgMF07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteVNoaXBzLm1hcCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5wb3NbMV0gKz0gMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnBvc1swXSAtPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAudmVsID0gWy0obiksIDBdO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaGlwLm1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0KSA9PiB7XG4gICAgICAgICAgICBidWxsZXQucG9zWzFdIC09IGJ1bGxldC52ZWxbMV07XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5ib21icy5mb3JFYWNoKChib21iKSA9PiB7XG4gICAgICAgICAgICBib21iLnBvc1sxXSArPSBib21iLnZlbFsxXTtcbiAgICAgICAgfSlcblxuICAgICAgICBpZih0aGlzLmJvbWJzLmxlbmd0aCA8IHRoaXMubnVtQm9tYnMpIHtcbiAgICAgICAgICAgIHRoaXMuYm9tYnNBd2F5KCk7XG4gICAgICAgIH07XG5cblxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckV2ZW50cygpIHtcbiAgICAgICAgbGV0IHNwZWVkID0gOTtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHsgXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzT3V0T2ZCb3VuZHModGhpcy5wbGF5ZXJTaGlwLnBvcykpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllclNoaXAudmVsWzBdID0gLXNwZWVkO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnBsYXllclNoaXAucG9zWzBdIC09IHRoaXMucGxheWVyU2hpcC52ZWxbMF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLnZlbFswXSA9IC1zcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzT3V0T2ZCb3VuZHModGhpcy5wbGF5ZXJTaGlwLnBvcykpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllclNoaXAudmVsWzBdID0gc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyU2hpcC5wb3NbMF0gKz0gc3BlZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLnZlbFswXSA9IHNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZihlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBbdGhpcy5wbGF5ZXJTaGlwLnBvc1swXSArIDEwLCB0aGlzLnBsYXllclNoaXAucG9zWzFdIC0gMTNdO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5idWxsZXRzLmxlbmd0aCA8IDcpIHsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVsbGV0KG5ldyBCdWxsZXQocG9zaXRpb24pKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJTaGlwLm1vdmVTaGlwKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzT3V0T2ZCb3VuZHMocG9zKSB7XG4gICAgICAgIHJldHVybihwb3NbMF0gPCAwKSB8fCAocG9zWzBdICsgMjUgPj0gR2FtZS5XSURUSClcbiAgICB9XG5cbiAgICBpc091dE9mTGl2ZXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGxheWVyTGl2ZXMpO1xuICAgICAgICBpZih0aGlzLnBsYXllckxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVJc092ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIocG9zKSB7XG4gICAgICAgIGlmKHBvc1sxXSA+IDYyMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lSXNPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGVudGl0eSkge1xuICAgICAgICBpZihlbnRpdHkgaW5zdGFuY2VvZiBFbmVteVNoaXApIHtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlTaGlwcy5zcGxpY2UodGhpcy5lbmVteVNoaXBzLmluZGV4T2YoZW50aXR5KSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZihlbnRpdHkgaW5zdGFuY2VvZiBCdWxsZXQpIHtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0cy5zcGxpY2UodGhpcy5idWxsZXRzLmluZGV4T2YoZW50aXR5KSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuR2FtZS5OVU1fRU5FTUlFUyA9IDU1O1xuR2FtZS5IRUlHSFQgPSA3MjA7XG5HYW1lLldJRFRIID0gNjAwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiY29uc3QgUGxheWVyU2hpcCA9IHJlcXVpcmUoJy4vcGxheWVyX3NoaXAnKTtcbmNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnLi9lbnRpdGllcycpO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpO1xuY29uc3QgQm9hcmQgPSByZXF1aXJlKCcuL2JvYXJkJyk7XG4vLyBjb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpXG4vLyBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4vLyBjb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwXG5cbi8vIGV4cHJlc3MoKVxuLy8gICAubGlzdGVuKFBPUlQsICgpID0+IGNvbnNvbGUubG9nKGBMaXN0ZW5pbmcgb24gJHsgUE9SVCB9YCkpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1jYW52YXMnKTtcbiAgICBnYW1lQm9hcmQud2lkdGggPSA2MDA7XG4gICAgZ2FtZUJvYXJkLmhlaWdodCA9IDcyMDtcbiAgICBcbiAgICBjb25zdCBjdHggPSBnYW1lQm9hcmQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShnYW1lQm9hcmQpO1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGdhbWUsIGN0eCk7XG4gICAgZ2FtZS5kcmF3KGN0eCk7XG5cbiAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuICAgIFxuICAgIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2FtZUJvYXJkKTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoZ2FtZSwgY3R4KTtcbiAgICAgICAgZ2FtZS5kcmF3KGN0eCk7XG4gICAgICAgIGJvYXJkLnN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBuZXdOZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3Jyk7XG4gICAgXG4gICAgbmV3TmV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2FtZUJvYXJkKTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoZ2FtZSwgY3R4KTtcbiAgICAgICAgZ2FtZS5kcmF3KGN0eCk7XG4gICAgICAgIGJvYXJkLnN0YXJ0KCk7XG4gICAgfSk7XG5cbn0pOyIsImNvbnN0IFZlY3RvciA9IHJlcXVpcmUoJy4vdmVjdG9ycycpO1xuY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmNsYXNzIFBsYXllclNoaXAgZXh0ZW5kcyBFbnRpdGllcyB7XG4gICAgY29uc3RydWN0b3Ioc3BlY3MpIHtcbiAgICAgICAgc3VwZXIoc3BlY3MpO1xuICAgICAgICB0aGlzLnBvcyA9IHNwZWNzLnBvcztcbiAgICAgICAgdGhpcy5jb2xvciA9ICdsaW1lJztcbiAgICAgICAgdGhpcy53aWR0aCA9IDI1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDEwO1xuICAgICAgICB0aGlzLnZlbCA9IHNwZWNzLnZlbCB8fCBbMCwgMF07XG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBtb3ZlU2hpcCgpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gdGhpcy52ZWxbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudmVsWzBdKTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJTaGlwOyIsImNvbnN0IFZlY3RvciA9IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfSxcbiAgICAgICAgXG4gICAgYWRkKHYxLCB2Mikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHYxLnggKyB2Mi54LFxuICAgICAgICAgICAgdjEueSArIHYyLnlcbiAgICAgICAgKTtcbiAgICB9LFxuICAgICAgICAgICAgXG4gICAgc3VidHJhY3QodjEsIHYyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgdjEueCAtIHYyLngsXG4gICAgICAgICAgICB2MS55IC0gdjIueVxuICAgICAgICApXG4gICAgfSxcbiAgICBcbiAgICBtdWx0aXBseSh2LCBuKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgdi54ICogbixcbiAgICAgICAgICAgIHYueSAqIG5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcbiAgICB2ZWNMZW5ndGgodmVjdG9yKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodmVjdG9yLnggKiB2ZWN0b3IueCArIHZlY3Rvci55ICogdmVjdG9yLnkpO1xuICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFxuICAgIGRpc3RhbmNlKHAxLCBwMikge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3cocDFbMF0gLSBwMlswXSwgMikgKyBNYXRoLnBvdyhwMVsxXSArIHAyWzFdLCAyKVxuICAgICAgICApO1xuICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAvLyB0aGUgaWRlYSBoZXJlIGlzIHRvIHJlc2V0IHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvciB0byBvbmUuIEkgZmVlbCBsaWtlIEkgbWlnaHQgYmUgbWlzc2luZyBzb21lIFxuICAgIC8vIGVkZ2UgY2FzZXMgb3IgbmVlZCB0byBhY2NvdW50IGZvciAwLCBidXQgd2UgY2FuIGNpcmNsZSBiYWNrIHRvIHRoaXMgd2hlbiB3ZSBpbXBsZW1lbnRcbiAgICAvLyB0aGUgYWN0dWFsIGdhbWUgbWVjaGFuaWNzXG4gICAgbm9ybWFsaXplKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHZlY3Rvci54IC8gdmVjdG9yTGVuZ3RoKHZlY3RvciksXG4gICAgICAgICAgICB2ZWN0b3IueSAvIHZlY3Rvckxlbmd0aCh2ZWN0b3IpXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjsiXSwic291cmNlUm9vdCI6IiJ9