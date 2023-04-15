export { Renderer2D };

class Renderer2D {
	constructor() {
		this.canvas=document.getElementById("canvas");
		this.ctx=this.canvas.getContext("2d");
	}

	#beginDraw(color) {
		this.ctx.beginPath();
		if(!color) {
			this.ctx.fillStyle="White";
		}
		else {
			this.ctx.fillStyle=color;
		}
	}
	clearBackground() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawRect(x, y, width, height, color) {
		this.#beginDraw(color);
		this.ctx.fillRect(x, y, width, height);
	}

	drawCircle(x, y, radius, color) {
		this.#beginDraw(color);
		this.ctx.arc(x, y, radius, 0, 2*Math.PI, true);
		this.ctx.fill();
	}

	drawImage(image, x, y) {
		this.ctx.drawImage(image, x, y);
	}
}