class Entities {

    constructor(props) {
        this.pos = props.pos;
        this.vel = props.vel;
        this.color = props.color;
        this.height = props.height;
        this.width = props.width;
        this.game = props.game;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    }

    move() {
        // if the object hits a boundary, then reverse its direction and drop it down a row
        if(this.game.isOutOfBounds(this.pos)) {
            if(this.pos[0] < 0) {
                this.pos[1] -= 30;
                this.pos[0] -= 10;
                this.vel = [-5, 0];
            } else {
                this.pos[1] -= 30;
                this.pos[0] += 10;
                this.vel = [5, 0];
            }
        } else {
            this.pos[0] += this.vel[0]
        }
        // if the object has not hit a boundary, then simply increment its movement speed by one
        //

    }

    remove() {
        this.game.remove(this);
    }
}

const FRAME_RATE_DELTA = 1000/60;

module.exports = Entities;