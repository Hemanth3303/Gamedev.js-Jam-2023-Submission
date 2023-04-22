import { WIN_WIDTH, WIN_HEIGHT } from "./config.js";
import { Renderer2D } from "./renderer2d.js";
import { loadImage } from "./utils.js";
import { Vec2 } from "./vec2.js";
import { Player } from "./player.js";

let renderer

let now, prev;
let deltaTime, fps;
let player;

function main() {

	let canvas=document.getElementById("canvas");
	canvas.width=WIN_WIDTH;
	canvas.height=WIN_HEIGHT;

	
	renderer=new Renderer2D();
	player=new Player(new Vec2(100, 100), new Vec2(0, 0), new Vec2(20, 50), "Red", renderer);
	now=performance.now();
	prev=performance.now();

	addEventListener("keydown", (e)=>{
		if(e.key==="a") {
			player.vel.x=-1;
		}
		if(e.key==="d") {
			player.vel.x=1;
		}
		if(e.key==="w") {
			player.vel.y=-1;
		}
		if(e.key==="s") {
			player.vel.y=1;
		}
	});

	addEventListener("keyup", (e)=>{
		if(e.key==="a" || e.key==="d") {
			player.vel.x=0;
		}
		if(e.key==="w" || e.key==="s") {
			player.vel.y=0;
		}
	});

	gameLoop();
}

function gameLoop() {

	now=performance.now();
	deltaTime=(now-prev)/1000;
	fps=1/deltaTime;
	prev=now;
	
	update(deltaTime);

	renderer.clearBackground();
	render();
	requestAnimationFrame(gameLoop);
}

function update(dt) {
	// console.log(`deltaTime: ${dt}, FPS: ${fps}`);
	player.update(dt);
}

function render() {
	renderer.setFont("Consolas", 20);
	renderer.drawText(`FPS: ${Math.round(fps)}`, 10, 24, "Grey");

	player.render(Renderer2D)
}

window.onload=main;