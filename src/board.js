class Board {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.playerShip = game.addPlayerShip;
    }

    start() {
        setInterval(() => {
            this.game.draw(this.ctx);
            this.game.checkCollisions();
            // this.game.moveObjects();
        }, 150);
    }
    
}

module.exports = Board;