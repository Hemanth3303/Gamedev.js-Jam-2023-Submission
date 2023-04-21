import { Renderer2D } from "./renderer2d.js";
import { loadImage } from "./utils.js";

let renderer, img;
let x=150, y=100;

let now, prev;
let dt, fps;

function main() {

	let canvas=document.getElementById("canvas");
	canvas.width=600;
	canvas.height=600;

	renderer=new Renderer2D();
	img=loadImage("assets/blob.png");
	now=performance.now();
	prev=performance.now();

	gameLoop();

	addEventListener("keydown", (e)=>{
		if(e.key=='a') {
			x-=1000*dt;
		}
		if(e.key=='d') {
			x+=1000*dt;
		}
		if(e.key=='w') {
			y-=1000*dt;
		}
		if(e.key=='s') {
			y+=1000*dt;
		}
	})
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
	renderer.drawRect(0, 0, 20, 50, "Cyan");
	renderer.drawRect(120, 350, 80, 40, "Red");
	renderer.drawRect(200, 120, 100, 10, "Yellow");
	renderer.drawCircle(130, 30, 20, "Magenta");
	renderer.drawImage(img, x, y);
}

window.onload=main;