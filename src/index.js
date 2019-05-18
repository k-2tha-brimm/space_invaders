const PlayerShip = require('./player_ship');
const Entities = require('./entities');
const Game = require('./game');
const Board = require('./board');

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