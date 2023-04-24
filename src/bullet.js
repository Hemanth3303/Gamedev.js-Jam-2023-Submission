import { Vec2 } from "./vec2.js";
import { WIN_WIDTH, WIN_HEIGHT, worldSpeedScale } from "./config.js";

export { Bullet };

const BULLET_SPEED=400;

class Bullet {
	constructor(pos, vel, renderer) {
		this.pos=pos;
		this.size=new Vec2(10, 10);
		this.vel=vel;
		this.color="Blue";
		this.renderer=renderer;
	}
	
	update(dt) {
		this.pos.x+=this.vel.x*BULLET_SPEED*dt*worldSpeedScale.value;
		this.pos.y+=this.vel.y*BULLET_SPEED*dt*worldSpeedScale.value;
	}

	render() {
		this.renderer.drawRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.color);
	}
}