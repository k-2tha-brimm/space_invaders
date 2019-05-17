class Board {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.playerShip = game.addPlayerShip;
    }

    start() {
        setInterval(() => {
            this.game.draw(this.ctx);
            this.game.moveObjects();
        }, 200);
    }
    
}

Board.MOVES = {
    37: [0, -1],
    39: [0, 1]
}

module.exports = Board;