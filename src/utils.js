export { loadImage, getRandomValue, collision };

function loadImage(filepath) {
	let img=new Image();
	img.src=filepath;
	img.classList.add("image");

	return img;
}

function getRandomValue(min, max) {
	return Math.floor(Math.random()*(max-min))+min;
}

function collision(obj1, obj2) {
	if(obj1.pos.x+obj1.size.x>obj2.pos.x &&
		obj1.pos.x<obj2.pos.x+obj2.size.x &&
		obj1.pos.y+obj1.size.y>obj2.pos.y &&
		obj1.pos.y<obj2.pos.y+obj2.size.y) {
			return true;
		}
}