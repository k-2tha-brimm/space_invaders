const PlayerShip = require('./player_ship');
const EnemyShip = require('./enemy_ship');
const Bullet = require('./bullet');

class Game {
    constructor(gameBoard) {
        this.enemyShips = [];
        this.bullets = [];
        this.playerShip = null;
        this.gameBoard = gameBoard;
        this.playerLives = 3;
        this.score = 0;

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

    addBullet(bullet) {
        this.bullets.push(bullet);
    }

    addEnemies() {

        let y = 100;
        for(let i = 1; i < 6; i++) {
            let x = 40;
            for(let n = 0; n < 11; n++) {
                this.add(new EnemyShip({
                    pos: [x, y],
                    vel: [1.2, 0],
                    game: this,
                    value: i * 10
                }))
                x += 45;
            }
            y += 35;
        }
    }

    draw(ctx) {
        // ctx.clearRect(0, 0, 600, 720);
        // ctx.fillStyle = 'black';
        // ctx.fillRect(0, 0, 600, 720);

        const img = new Image();
        img.src = '../assets/images/halo.jpg';
        img.onload = () => {
            ctx.drawImage(img, -500, 0);
        };

        this.enemyShips.forEach((ship) => {
            ship.draw(ctx);
        });
        this.playerShip.draw(ctx);
        this.bullets.forEach((bullet) => {
            bullet.draw(ctx);
        })
    }

    checkCollisions() {
        for(let i = 0; i < this.bullets.length; i++) {
            for(let j = 0; j < this.enemyShips.length; j++) {
                if(this.bullets[i].didCollide(this.enemyShips[j])) {
                    console.log(this.enemyShips[j].value);
                    this.game.remove(this.bullets[i]);
                    return 0;
                }
            }
        }
    }

    moveObjects() {
        this.enemyShips.forEach((ship) => {

            if(this.gameOver(ship.pos)) {
                this.enemyShips.map((ship) => {
                    ship.vel = [0, 0];
                })
            }

            let n = 1.2;

            if(this.isOutOfBounds(ship.pos)) {

                if(ship.pos[0] < 0) {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] += 10;
                        ship.vel = [n, 0];
                    })
                } else {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] -= 10;
                        ship.vel = [-(n), 0];
                    })
                }

            } else {
                ship.move();
            }
        })

        this.bullets.forEach((bullet) => {
            bullet.pos[1] -= bullet.vel[1];
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
                const position = [this.playerShip.pos[0] + 10, this.playerShip.pos[1] - 13];
                this.addBullet(new Bullet(position))
            }
        });
    }

    isOutOfBounds(pos) {
        return(pos[0] < 0) || (pos[0] + 25 >= Game.WIDTH)
    }

    gameOver(pos) {
        if(pos[1] > 620) {
            return true;
        } else {
            return false;
        }
    }

    remove(entity) {
        if(entity instanceof EnemyShip) {
            this.enemyShips.splice(enemyShips.indexOf(entity), 1);
        } else if(entity instanceof Bullet) {
            this.bullets.splice(bullets.indexOf(entity), 1);
        }
    }

}

Game.NUM_ENEMIES = 55;
Game.HEIGHT = 720;
Game.WIDTH = 600;

module.exports = Game;