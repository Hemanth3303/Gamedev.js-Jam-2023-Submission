export { loadImage };

function loadImage(filepath) {
	let img=new Image();
	img.src=filepath;
	img.classList.add("image");

	return img;
}