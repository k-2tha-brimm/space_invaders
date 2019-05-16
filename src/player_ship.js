const vectors = require('./vectors');
const Entities = require('./entities');

const DEFAULTS = {
    COLOR: "#ffffff",
    WIDTH: 25,
    HEIGHT: 10,
}

class PlayerShip extends Entities {
    constructor(specs) {
        super(specs);
        // this.color = DEFAULTS.color;
        // this.width = DEFAULTS.width;
        // this.height = DEFAULTS.height;
        this.vel = specs.vel || [0, 0];
    }
}

module.exports = PlayerShip;