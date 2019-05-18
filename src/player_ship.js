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

    move() {
        document.addEventListener('keydown', () => {
            if(e.keyCode === 37) {
                this.vel[1] -= 2.5;
                e.preventDefault();
            } else if(e.keyCode === 39) {
                this.vel[1] += 2.5;
                e.preventDefault();
            }
        });
        this.pos[1] += this.vel[1]
        requestAnimationFrame(move);
    }

}

module.exports = PlayerShip;