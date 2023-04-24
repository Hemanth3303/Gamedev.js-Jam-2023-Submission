export { Enemy };
import { worldSpeedScale } from "./config.js";

const ENEMY_SPEED=290;

class Enemy {
	constructor(pos, vel, size, color, renderer) {
		this.pos=pos;
		this.vel=vel;
		this.size=size;
		this.color=color;
		this.renderer=renderer;
	}

	update(dt) {
		this.pos.x+=this.vel.x*ENEMY_SPEED*dt*worldSpeedScale.value;
		this.pos.y+=this.vel.y*ENEMY_SPEED*dt*worldSpeedScale.value;
	}

	render() {
		this.renderer.drawRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.color);
	}
}