

class Game {
    constructor() {
        enemyShips = [];
        playerShip = null;

        this.addEnemies();
        this.addPlayerShip();
    }

    addPlayerShip() {
        this.playerShip = new PlayerShip({
            pos: [gameBoard.width - 310, gameBoard.height - 50],
            vel: [0, 0],
            height: 20,
            width: 40,
            color: 'lime'
        });
    }

    add(ship) {
        this.enemyShips.push(ship);
    }

    addEnemies() {
        for(let i = 0; i < Game.NUM_ENEMIES; i++) {
            this.addEnemies(new EnemyShip( { game: this.game } ))
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, 600, 720);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 600, 720);

        this.enemyShips.forEach((ship) => {
            ship.draw(ctx);
        });
        this.playerShip.draw(ctx);
    }
}

Game.NUM_ENEMIES = 55;

module.exports = Game;