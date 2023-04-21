export { loadImage };

function loadImage(filepath) {
	let img=new Image();
	img.src=filepath;
	img.classList.add("image");
	document.body.appendChild(img);

	return img;
}