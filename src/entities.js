class Entities {

    constructor(specs) {
        this.pos = specs.pos;
        this.vel = specs.vel;
        this.color = specs.color;
        this.height = specs.height;
        this.width = specs.width;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    }

    move() {
        // if the object hits a boundary, then reverse its direction and drop it down a row
        // if the object has not hit a boundary, then simply increment its movement speed by one
        //

    }


    // move(timeDelta) {
    //     const velocityIncrement = timeDelta / FRAME_RATE_DELTA,
    //     offsetX = this.vel[0] * velocityIncrement;
    //     offsetY = this.vel[1] * velocityIncrement;

    //     this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    //     // we are going to need some logic here to account for an entity hitting the
    //     // walls on either side of the board
    // }

    remove() {
        this.game.remove(this);
    }
}

const FRAME_RATE_DELTA = 1000/60;

module.exports = Entities;