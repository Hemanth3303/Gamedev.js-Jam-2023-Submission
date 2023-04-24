import { WIN_WIDTH, WIN_HEIGHT, worldSpeedScale, worldSpeedScaleModifier } from "./config.js";
import { Renderer2D } from "./renderer2d.js";
import { Vec2 } from "./vec2.js";
import { Player } from "./player.js";
import { Bullet } from "./bullet.js";
import { Enemy } from "./enemy.js";
import { getRandomValue, collision } from "./utils.js";

let renderer;
let now, prev;
let deltaTime, fps;
let player;
let bullets=[], enemies=[];
let score=0, enemyTimer=0;
let gameOver=false;

function main() {

	let canvas=document.getElementById("canvas");
	canvas.width=WIN_WIDTH;
	canvas.height=WIN_HEIGHT;
	
	renderer=new Renderer2D();
	player=new Player(
		new Vec2(WIN_WIDTH/2-12.5, WIN_WIDTH/2-12.5), 
		new Vec2(0, 0), 
		new Vec2(25, 25), 
		"Red", 
		renderer
	);
	now=performance.now();
	prev=performance.now();

	window.addEventListener("keydown", (e)=>{
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
		
		if(e.key==="c") {
			if(worldSpeedScale.value>0) {
				worldSpeedScale.value-=worldSpeedScaleModifier;
			}
			if(worldSpeedScale.value<0) {
				worldSpeedScale.value=0;
			}
		}
		if(e.key==="v") {
			if(worldSpeedScale.value<2) {
				worldSpeedScale.value+=worldSpeedScaleModifier;
			}
			if(worldSpeedScale.value>2) {
				worldSpeedScale.value=2;
			}
		}
	});

	window.addEventListener("keyup", (e)=>{
		if(e.key==="a" || e.key==="d") {
			player.vel.x=0;
		}
		if(e.key==="w" || e.key==="s") {
			player.vel.y=0;
		}
	});

	canvas.addEventListener("mousedown", (e)=>{
		let mousePos=getWorldMousePos(canvas, e);
		let angle=Math.atan2(mousePos.y-player.pos.y, mousePos.x-player.pos.x);

		bullets.push(new Bullet(
			new Vec2(player.pos.x, player.pos.y),
			new Vec2(Math.cos(angle), Math.sin(angle)),
			renderer
		));
	});

	gameLoop();
}

function gameLoop() {
	if(!gameOver) {
		now=performance.now();
		deltaTime=(now-prev)/1000;
		fps=1/deltaTime;
		prev=now;
		
		update(deltaTime);
	
		renderer.clearBackground();
		render();
		requestAnimationFrame(gameLoop);
	}
}

function update(dt) {
	// console.log(`deltaTime: ${dt}, FPS: ${fps}`);
	enemyTimer+=dt;

	if(enemyTimer>1.5) {
		enemyTimer=0;
		let x, y;
		let size=getRandomValue(10, 25);
		if(getRandomValue(0, 1)<0.5) {
			x=getRandomValue(0, 1)<0.5?0-size:WIN_WIDTH+size;
			y=getRandomValue(0, WIN_HEIGHT);
		}
		else {
			x=getRandomValue(0, WIN_WIDTH);
			y=getRandomValue(0, 1)<0.5?0-size:WIN_HEIGHT+size;
		}

		let angle=Math.atan2(player.pos.y-y, player.pos.x-x);

		enemies.push(new Enemy(
			new Vec2(x, y),
			new Vec2(Math.cos(angle), Math.sin(angle)),
			new Vec2(size, size),
			"Magenta",
			renderer
		));
	}
	
	player.update(dt);

	bullets.forEach((bullet, index)=>{
		bullet.update(dt);

		if(bullet.pos.x<0 || bullet.pos.x>WIN_WIDTH || bullet.pos.y<0 || bullet.pos.y>WIN_HEIGHT) {
			bullets.splice(index, 1);
		}
	});

	enemies.forEach((enemy, index)=>{
		let angle=Math.atan2(player.pos.y-enemy.pos.y, player.pos.x-enemy.pos.x);
		enemy.vel.x=Math.cos(angle);
		enemy.vel.y=Math.sin(angle);
		enemy.update(dt);

		if(collision(enemy, player)) {
			gameOver=true;
		}
	});

	enemies.forEach((enemy, enemyIndex)=>{
		bullets.forEach((bullet, bulletIndex)=>{
			if(collision(bullet, enemy)) {
				bullets.splice(bulletIndex, 1);
				enemies.splice(enemyIndex, 1);
				score++;
			}
		});
	});
}

function render() {
	renderer.setFont("Consolas", 24);
	// renderer.drawText(`FPS: ${Math.round(fps)}`, 10, 24, "Grey");
	renderer.drawText(`TimeScale: ${worldSpeedScale.value}`, 10, 24, "Cyan");
	renderer.drawText(`Score: ${score}`, 450, 24, "Cyan");

	player.render(renderer);

	bullets.forEach((bullet, index)=>{
		bullet.render();
	});

	enemies.forEach((enemy, index)=>{
		enemy.render();
	});
}

function getWorldMousePos(canvas, event) {
	let rect = canvas.getBoundingClientRect();
 return {
 		x: event.clientX - rect.left,
 		y: event.clientY - rect.top 
	}
}


window.onload=main;