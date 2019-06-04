const Vector = require('./vectors');
const Entities = require('./entities');

class PlayerShip extends Entities {
    constructor(specs) {
        super(specs);
        this.pos = specs.pos;
        this.color = 'lime';
        this.width = 25;
        this.height = 10;
        this.vel = specs.vel || [0, 0];
        this.area = this.height * this.width;
    }

    moveShip() {
        this.pos[0] += this.vel[0];
    }

}

module.exports = PlayerShip;