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
        this.pos[0] += this.vel[0]
    }

    remove() {
        this.game.remove(this);
    }
}

const FRAME_RATE_DELTA = 1000/60;

module.exports = Entities;