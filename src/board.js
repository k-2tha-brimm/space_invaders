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