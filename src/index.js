const PlayerShip = require('./player_ship');
const Entities = require('./entities');
const Game = require('./game');
const Board = require('./board');

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-canvas');
    gameBoard.width = 600;
    gameBoard.height = 720;
    
    const ctx = gameBoard.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 720);

    const game = new Game(gameBoard);
    const board = new Board(game, ctx);

    board.start();

})

window.PlayerShip = PlayerShip;
window.Entities = Entities;