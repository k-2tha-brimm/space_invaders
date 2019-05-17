class Board {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.playerShip = game.addPlayerShip;
        // this.lastTime = 0;
    }

    animate(time) {
        // const delta = time - this.lastTime;

        this.game.draw(this.ctx);
        this.game.moveObjects();
        // this.lastTime = time;

        requestAnimationFrame(this.animate.bind(this));
    }

    start() {
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }
    
}

module.exports = Board;