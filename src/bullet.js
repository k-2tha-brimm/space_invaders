const Entities = require('./entities');

class Bullet extends Entities {
    constructor(ship) {
        super(ship);
        this.pos = ship.pos;
        this.vel = [0, 5];
        this.height = 6;
        this.width = 3;
    }
}

module.exports = Bullet;