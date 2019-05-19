const Entities = require('./entities');

class Bombs extends Entities {
    constructor(position) {
        super(position);
        this.pos = position;
        this.vel = [0, 1];
        this.height = 5;
        this.width = 2.5;
        this.color = 'gray';
    }
}

module.exports = Bomb;