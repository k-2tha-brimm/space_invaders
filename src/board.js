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