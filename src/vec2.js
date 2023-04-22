export { Vec2 };

class Vec2 {
	constructor(x, y) {
		this.x=x;
		this.y=y;
	}

	// Returns a new vector without modifying the originals
	add(other) {
		return new Vec2(
			this.x+other.x, 
			this.y+other.y
		);
	}

	// Returns a new vector without modifying the originals
	subtract(other) {
		return new Vec2(
			this.x-other.x, 
			this.y-other.y
		);
	}

	magnitude() {
		return Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
	}

	// Returns a new vector without modifying the originals
	normalize() {
		return new Vec2(
			this.x/this.magnitude(),
			this.y/this.magnitude(),
		);
	}


	dotProduct(other) {
		return (this.x*other.x+this.y*other.y);
	}

	print() {
		console.log(`Vec2(${this.x}, ${this.y})`);
	}
}