const vectors = require('./vectors');
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

    move() {
        document.addEventListener('keydown', () => {
            if(e.keyCode === 37) {
                this.pos[1] -= 2.5;
                e.preventDefault();
            } else if(e.keyCode === 39) {
                this.pos[1] += 2.5;
                e.preventDefault();
            }
        });
    }

}

module.exports = PlayerShip;