import { Renderer2D } from "./renderer2d.js";
import { loadImage } from "./utils.js";
import { Vec2 } from "./vectors.js";

let renderer

let now, prev;
let dt, fps;

function main() {

	let canvas=document.getElementById("canvas");
	canvas.width=600;
	canvas.height=600;

	renderer=new Renderer2D();
	now=performance.now();
	prev=performance.now();

	addEventListener("keydown", (e)=>{
	
	});

	gameLoop();
}

function gameLoop() {

	now=performance.now();
	dt=(now-prev)/1000;
	fps=1/dt;
	prev=now;
	
	update();

	renderer.clearBackground();
	render();
	requestAnimationFrame(gameLoop);
}

function update() {
	// console.log(`deltaTime: ${dt}, FPS: ${fps}`);
}

function render() {
	renderer.setFont("Consolas", 30);
	renderer.drawText(`FPS: ${Math.round(fps)}`, 10, 24, "Grey");
}

window.onload=main;