

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-canvas');
    gameBoard.width = 600;
    gameBoard.height = 720;
    
    const ctx = gameBoard.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(10, 10, 580, 700);
})