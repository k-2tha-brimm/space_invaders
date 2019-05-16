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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayerShip = __webpack_require__(/*! ./player_ship */ "./src/player_ship.js");
const Entities = __webpack_require__(/*! ./entities */ "./src/entities.js");

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-canvas');
    gameBoard.width = 600;
    gameBoard.height = 720;
    
    const ctx = gameBoard.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 720);

    const player = new PlayerShip({
        pos: [gameBoard.width - 310, gameBoard.height - 50],
        vel: [0, 2],
        height: 20,
        width: 40,
        color: 'white'
    });
    player.draw(ctx);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyX3NoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlY3RvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7QUNqQ0EsbUJBQW1CLG1CQUFPLENBQUMsMkNBQWU7QUFDMUMsaUJBQWlCLG1CQUFPLENBQUMscUNBQVk7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBLDJCOzs7Ozs7Ozs7OztBQ3hCQSxnQkFBZ0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNuQyxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUEsNEI7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY2xhc3MgRW50aXRpZXMge1xuXG4gICAgY29uc3RydWN0b3Ioc3BlY3MpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBzcGVjcy5wb3M7XG4gICAgICAgIHRoaXMudmVsID0gc3BlY3MudmVsO1xuICAgICAgICB0aGlzLmNvbG9yID0gc3BlY3MuY29sb3I7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc3BlY3MuaGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gc3BlY3Mud2lkdGg7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBtb3ZlKHRpbWVEZWx0YSkge1xuICAgICAgICBjb25zdCB2ZWxvY2l0eUluY3JlbWVudCA9IHRpbWVEZWx0YSAvIEZSQU1FX1JBVEVfREVMVEEsXG4gICAgICAgIG9mZnNldFggPSB0aGlzLnZlbFswXSAqIHZlbG9jaXR5SW5jcmVtZW50O1xuICAgICAgICBvZmZzZXRZID0gdGhpcy52ZWxbMV0gKiB2ZWxvY2l0eUluY3JlbWVudDtcblxuICAgICAgICB0aGlzLnBvcyA9IFt0aGlzLnBvc1swXSArIG9mZnNldFgsIHRoaXMucG9zWzFdICsgb2Zmc2V0WV07XG5cbiAgICAgICAgLy8gd2UgYXJlIGdvaW5nIHRvIG5lZWQgc29tZSBsb2dpYyBoZXJlIHRvIGFjY291bnQgZm9yIGFuIGVudGl0eSBoaXR0aW5nIHRoZVxuICAgICAgICAvLyB3YWxscyBvbiBlaXRoZXIgc2lkZSBvZiB0aGUgYm9hcmRcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XG4gICAgfVxufVxuXG5jb25zdCBGUkFNRV9SQVRFX0RFTFRBID0gMTAwMC82MDtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdGllczsiLCJjb25zdCBQbGF5ZXJTaGlwID0gcmVxdWlyZSgnLi9wbGF5ZXJfc2hpcCcpO1xuY29uc3QgRW50aXRpZXMgPSByZXF1aXJlKCcuL2VudGl0aWVzJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1jYW52YXMnKTtcbiAgICBnYW1lQm9hcmQud2lkdGggPSA2MDA7XG4gICAgZ2FtZUJvYXJkLmhlaWdodCA9IDcyMDtcbiAgICBcbiAgICBjb25zdCBjdHggPSBnYW1lQm9hcmQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCA2MDAsIDcyMCk7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyU2hpcCh7XG4gICAgICAgIHBvczogW2dhbWVCb2FyZC53aWR0aCAtIDMxMCwgZ2FtZUJvYXJkLmhlaWdodCAtIDUwXSxcbiAgICAgICAgdmVsOiBbMCwgMl0sXG4gICAgICAgIGhlaWdodDogMjAsXG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICB9KTtcbiAgICBwbGF5ZXIuZHJhdyhjdHgpO1xuXG59KVxuXG53aW5kb3cuUGxheWVyU2hpcCA9IFBsYXllclNoaXA7XG53aW5kb3cuRW50aXRpZXMgPSBFbnRpdGllczsiLCJjb25zdCB2ZWN0b3JzID0gcmVxdWlyZSgnLi92ZWN0b3JzJyk7XG5jb25zdCBFbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuY29uc3QgREVGQVVMVFMgPSB7XG4gICAgQ09MT1I6IFwiI2ZmZmZmZlwiLFxuICAgIFdJRFRIOiAyNSxcbiAgICBIRUlHSFQ6IDEwLFxufVxuXG5jbGFzcyBQbGF5ZXJTaGlwIGV4dGVuZHMgRW50aXRpZXMge1xuICAgIGNvbnN0cnVjdG9yKHNwZWNzKSB7XG4gICAgICAgIHN1cGVyKHNwZWNzKTtcbiAgICAgICAgLy8gdGhpcy5jb2xvciA9IERFRkFVTFRTLmNvbG9yO1xuICAgICAgICAvLyB0aGlzLndpZHRoID0gREVGQVVMVFMud2lkdGg7XG4gICAgICAgIC8vIHRoaXMuaGVpZ2h0ID0gREVGQVVMVFMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnZlbCA9IHNwZWNzLnZlbCB8fCBbMCwgMF07XG4gICAgfVxuXG4gICAgbW92ZShlKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB7XG4gICAgICAgICAgICBpZihlLmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NbMV0gLT0gMVxuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1sxXSArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclNoaXA7IiwiY2xhc3MgVmVjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGQodjEsIHYyKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IgKFxuICAgICAgICB2MS54ICsgdjIueCxcbiAgICAgICAgdjEueSArIHYyLnlcbiAgICApO1xufVxuXG5mdW5jdGlvbiBhZGQodjEsIHYyKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgIHYxLnggKyB2Mi54LFxuICAgICAgICB2MS55ICsgdjIueVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHN1YnRyYWN0KHYxLCB2Mikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICB2MS54IC0gdjIueCxcbiAgICAgICAgdjEueSAtIHYyLnlcbiAgICApXG59XG5cbmZ1bmN0aW9uIG11bHRpcGx5KHYsIG4pIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdi54ICogbixcbiAgICAgICAgdi55ICogblxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHZlY0xlbmd0aCh2ZWN0b3IpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHZlY3Rvci54ICogdmVjdG9yLnggKyB2ZWN0b3IueSAqIHZlY3Rvci55KTtcbn1cblxuLy8gdGhlIGlkZWEgaGVyZSBpcyB0byByZXNldCB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgdG8gb25lLiBJIGZlZWwgbGlrZSBJIG1pZ2h0IGJlIG1pc3Npbmcgc29tZSBcbi8vIGVkZ2UgY2FzZXMgb3IgbmVlZCB0byBhY2NvdW50IGZvciAwLCBidXQgd2UgY2FuIGNpcmNsZSBiYWNrIHRvIHRoaXMgd2hlbiB3ZSBpbXBsZW1lbnRcbi8vIHRoZSBhY3R1YWwgZ2FtZSBtZWNoYW5pY3NcbmZ1bmN0aW9uIG5vcm1hbGl6ZSh2ZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgdmVjdG9yLnggLyB2ZWN0b3JMZW5ndGgodmVjdG9yKSxcbiAgICAgICAgdmVjdG9yLnkgLyB2ZWN0b3JMZW5ndGgodmVjdG9yKVxuICAgICk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==