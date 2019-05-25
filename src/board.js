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