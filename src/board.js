class Board {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.playerShip = game.addPlayerShip;
    }

    bindKeyHandlers() {
        const ship = this.playerShip;
        Object.keys(Board.MOVES).forEach((key) => {
            const move = Board.MOVES[key];
            keyCode(key, () => { ship.move(move); });
        })

    }

    start() {
        this.bindKeyHandlers();
        setInterval(() => {
            this.game.draw(this.ctx);
        }, 200);
    }
    
}

Board.MOVES = {
    37: [0, -1],
    39: [0, 1]
}

module.exports = Board;