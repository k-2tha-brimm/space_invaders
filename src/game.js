const PlayerShip = require('./player_ship');
const EnemyShip = require('./enemy_ship');
const Bullet = require('./bullet');
const Bomb = require('./bombs');

class Game {
    constructor(gameBoard, score) {
        this.enemyShips = [];
        this.bullets = [];
        this.bombs = [];
        this.waveCount = 0;
        this.enemiesAdded = false;
        this.playerShip = null;
        this.gameBoard = gameBoard;
        this.playerLives = 3;
        this.score = score || 0;
        this.gameIsOver = false;
        this.newRound = false;
        this.lifeWasLost = false;
        this.bombs = [];
        this.numBombs = 5;

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

    addBombs(bomb) {
        this.bombs.push(bomb);
    }

    addEnemies() {

        let y = 100;
        for(let i = 5; i > 1; i--) {
            let x = 40;
            for(let n = 0; n < 11; n++) {
                this.add(new EnemyShip({
                    pos: [x, y],
                    vel: [1, 0],
                    game: this,
                    value: i * 10
                }))
                x += 45;
            }
            y += 35;
        }
        this.enemiesAdded = true;
    }

    draw(ctx) {
        const img = new Image();
        img.src = '../assets/images/halo.jpg';

        img.onload = () => {
            ctx.drawImage(img, -500, 0);
        };
        
        ctx.font = "30px Comic Sans MS";
        ctx.fillstyle = 'white';
        ctx.fillText(`Score: ${this.score}`, 410, 50)
        
        ctx.font = "30px Comic Sans MS";
        ctx.fillstyle = 'white';
        ctx.fillText(`Lives: ${this.playerLives}`, 20, 50)

        this.enemyShips.forEach((ship) => {
            ship.draw(ctx);
        });

        this.playerShip.draw(ctx);

        this.bullets.forEach((bullet) => {
            bullet.draw(ctx);
        })

        this.bombs.forEach((bomb) => {
            bomb.draw(ctx);
        })

    }

    bombsAway() {
        const shipIndex = Math.floor(Math.random() * Math.floor(this.enemyShips.length));
        const ship = this.enemyShips[shipIndex];
        const shipPos = [(ship.pos[0] - 15), (ship.pos[1] + 15)]
        const bombPosition = [shipPos];
        this.addBombs(new Bomb(bombPosition));
    }

    checkCollisions() {
        for(let i = 0; i < this.enemyShips.length; i++) {
            let enemy = this.enemyShips[i];
            let destroyed = false;

            for(let j = 0; j < this.bullets.length; j++) {
                const bullet = this.bullets[j];

                if(bullet.pos[0] >= (enemy.pos[0] - enemy.width/2) && bullet.pos[0] <= (enemy.pos[0] + enemy.width/2) &&
                bullet.pos[1] >= (enemy.pos[1] - enemy.height/2) && bullet.pos[1] <= (enemy.pos[1] + enemy.height/2)) {
                    this.bullets.splice(j--, 1);
                    destroyed = true;
                    break;
                }
            }
            if(destroyed) {
                this.score += this.enemyShips[i].value;
                this.enemyShips.splice(i--, 1);
                if(this.enemyShips.length === 0) {
                    this.numBombs += 2;
                    this.bullets = [];
                    this.addEnemies();
                    this.addPlayerShip();
                    this.registerEvents();
                }
            }
            this.bullets.forEach((bullet) => {
                if(bullet.pos[1] < 0) {
                    this.bullets.splice(this.bullets.indexOf(bullet), 1);
                }
            })

            if(this.bombs) {
                for(let n = 0; n < this.bombs.length; n++) {
                    const bomb = this.bombs[n];
                    const player = this.playerShip;
                    if(bomb.pos[0] >= (player.pos[0] - player.width) && bomb.pos[0] <= (player.pos[0] + player.width) &&
                    bomb.pos[1] >= (player.pos[1] - player.height/2) && bomb.pos[1] <= (player.pos[1] + player.height/2)) {
                        this.bombs.splice(this.bombs.indexOf(bomb), 1);
                        this.playerLives -= 1;
                        this.lifeWasLost = true;
                        break;
                    }
                };
            }

            this.bombs.forEach((bomb) => {
                if(bomb.pos[1] > 720) {
                    this.bombs.splice(this.bombs.indexOf(bomb), 1);
                }
            })

        }
    }

    moveObjects() {
        this.enemyShips.forEach((ship) => {

            if(this.gameOver(ship.pos)) {
                this.enemyShips.map((ship) => {
                    ship.vel = [0, 0];
                })
            }

            let n = 1;

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

        this.bombs.forEach((bomb) => {
            bomb.pos[1] += bomb.vel[1];
        })

        if(this.bombs.length < this.numBombs) {
            this.bombsAway();
        };


    }
    
    registerEvents() {
        let speed = 9;
        
        document.addEventListener('keydown', e => {
            if(e.keyCode === 37) {
                if(!this.isOutOfBounds(this.playerShip.pos)){
                    this.playerShip.vel[0] = -speed;
                } else {
                    this.playerShip.pos[0] += 2;
                }
            } else if(e.keyCode === 39) {
                if(!this.isOutOfBounds(this.playerShip.pos + 15)){
                    this.playerShip.vel[0] = speed;
                } else {
                    this.playerShip.pos[0] -= 20;
                }
            } else if(e.keyCode === 32) {
                const position = [this.playerShip.pos[0] + 10, this.playerShip.pos[1] - 13];

                if(this.bullets.length < 7) { 
                    this.addBullet(new Bullet(position))
                }

            }
            this.playerShip.moveShip();
        });
    }

    isOutOfBounds(pos) {
        return(pos[0] + 10 < 0) || (pos[0] + 25 >= Game.WIDTH)
    }

    isOutOfLives() {
        if(this.playerLives === 0) {
            this.gameIsOver = true;
        }
    }

    gameOver(pos) {
        if(pos[1] > 620) {
            this.gameIsOver = true;
            return true;
        } else {
            return false;
        }
    }

    remove(entity) {
        if(entity instanceof EnemyShip) {
            this.enemyShips.splice(this.enemyShips.indexOf(entity), 1);
        } else if(entity instanceof Bullet) {
            this.bullets.splice(this.bullets.indexOf(entity), 1);
        }
    }

}

Game.NUM_ENEMIES = 55;
Game.HEIGHT = 720;
Game.WIDTH = 600;

module.exports = Game;