class Board {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.playerShip = game.addPlayerShip;
    }

    start() {
        setInterval(() => {
            this.game.draw(this.ctx);
            // this.game.moveObjects();
        }, 250);
    }
    
}

module.exports = Board;