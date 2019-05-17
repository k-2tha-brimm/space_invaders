const PlayerShip = require('./player_ship');
const EnemyShip = require('./enemy_ship');
const Bullet = require('./bullet');

class Game {
    constructor(gameBoard) {
        this.enemyShips = [];
        this.bullets = [];
        this.playerShip = null;
        this.gameBoard = gameBoard;

        this.addEnemies();
        this.addPlayerShip();
        this.registerEvents();
    }

    addPlayerShip() {
        this.playerShip = new PlayerShip({
            pos: [300, 650],
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

        let y = 100;
        for(let i = 0; i < 5; i++) {
            let x = 40;
            for(let n = 0; n < 11; n++) {
                this.add(new EnemyShip({
                    pos: [x, y],
                    vel: [2, 0],
                    game: this
                }))
                x += 45;
            }
            y += 35;
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
        this.bullets.forEach((bullet) => {
            bullet.draw(ctx);
        })
    }

    moveObjects() {
        let n = 5;
        this.enemyShips.forEach((ship) => {
            if(this.isOutOfBounds(ship.pos)) {
                if(ship.pos[0] < 0) {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] += 10;
                        ship.vel = [n, 0];
                    }).then(() => n += 5).then(ship => ship.move())
                } else {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] -= 10;
                        ship.vel = [-n, 0];
                    }).then(() => n += 5).then(ship => ship.move())
                }
            } else {
                ship.move();
            }
        })
    }

    registerEvents() {
        document.addEventListener('keydown', e => {
            if(e.keyCode === 37) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.pos[0] -= 20;
                } else {
                    this.playerShip.pos[0] += 10;
                }
            } else if(e.keyCode === 39) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.pos[0] += 20
                } else {
                    this.playerShip.pos[0] -= 10;
                }
            } else if(e.keyCode === 32) {
                console.log('you pushed space');
                this.bullets.push(new Bullet(this.playerShip))
            }
        });
    }

    isOutOfBounds(pos) {
        return(pos[0] < 0) || (pos[0] + 25 >= Game.WIDTH)
    }

}

Game.NUM_ENEMIES = 55;
Game.HEIGHT = 720;
Game.WIDTH = 600;

module.exports = Game;