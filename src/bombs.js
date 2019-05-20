const Entities = require('./entities');

class Bomb extends Entities {
    constructor(position) {
        super(position);
        this.pos = position[0];
        this.vel = [0, (Math.floor(Math.random() * 4))];
        this.height = 5;
        this.width = 2.5;
        this.color = 'white';
    }
}

module.exports = Bomb;