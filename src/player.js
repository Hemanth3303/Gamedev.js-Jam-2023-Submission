import { WIN_WIDTH, WIN_HEIGHT, worldSpeedScale } from "./config.js";

export { Player };

const PLAYER_SPEED=300;

class Player {
	constructor(pos, vel, size, color, renderer) {
		this.pos=pos;
		this.vel=vel;
		this.size=size;
		this.color=color;
		this.renderer=renderer;
		this.bullets=[];
	}

	update(dt) {
		if(this.pos.x+this.size.x<0) {
			this.pos.x=WIN_WIDTH;
		}
		if(this.pos.x>WIN_WIDTH) {
			this.pos.x=0;
		}
		if(this.pos.y+this.size.y<0) {
			this.pos.y=WIN_HEIGHT;
		}
		if(this.pos.y>WIN_HEIGHT) {
			this.pos.y=0;
		}

		this.pos.x+=this.vel.x*PLAYER_SPEED*dt*worldSpeedScale.value;
		this.pos.y+=this.vel.y*PLAYER_SPEED*dt*worldSpeedScale.value;
	}

	render() {
		this.renderer.drawRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.color);
	}
}