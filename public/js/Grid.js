class Grid {
	constructor(ctx, dims, delta) {
		this.ctx = ctx;
		this.dims = dims;
		this.delta = delta;
		this.strokeWidth = 1.5;

		this.points = [];
		this.pieces = [];

		this.mouseCoords = {x: 0, y: 0};
	}

	render(){}
	addPiece(p) {this.pieces.push(p)}
}

class GridEqualTri extends Grid {

	constructor(ctx, dims, delta) {
		super(ctx, dims, delta);

		// Creating points
		const hn = this.delta / (4 * Math.pow(Math.cos(Math.PI / 6), 2));
		const off = Math.tan(Math.PI / 3) * this.delta / 2;

		let upright = false;
		for(let y = 0; y < this.dims.y; y += off) {
			let flip = false;
			if(upright === false)
				flip = true;
				
			for(let x = 0; x < this.dims.x; x += (this.delta / 2)) {
				this.points.push({x, y})
			}

			for(let x = 0; x < this.dims.x; x += (this.delta / 2)) {
				const yPt = y + (flip ? hn : off - hn);
				
				this.points.push({x, y: yPt})
				flip = !flip;
			}
			upright = !upright;
		}

	}

	getMousePts({ x, y}) {
		const yOff = Math.round(y / (((this.delta / 2) * Math.tan(Math.PI / 3)) / 2));
		const xOff = Math.round(x / (this.delta / 2));

		const index = yOff * this.dims.x / (this.delta / 2) + xOff;
		return this.points[index];

	}

	highlightPoint(c1, c2) {
		if(c1 !== null) {
			// Highlight new selected ref dot
			this.highlight = {c1, c2};
		} else {
			this.highlight = null;
		}
	}

	// Rendering logic
	drawRefDots (coords, color) {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(coords.x * this.delta / this.density, coords.y * this.delta / this.density, 2, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.fill();
	}

	drawRawRefDot (coords, color) {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(coords.x, coords.y, 2, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.fill();
	}
	
	drawPiece (start, end) {
		this.ctx.strokeStyle = "rgb(0 0 0)";
		this.ctx.lineWidth = this.strokeWidth + 1;
		this.ctx.beginPath();
		this.ctx.moveTo(start.x, start.y);
		this.ctx.lineTo(end.x, end.y);
		this.ctx.closePath();
		this.ctx.stroke();
	}

	render () {
		// Resetting background to white
		this.ctx.fillStyle = "rgb(255 255 255)";
		this.ctx.fillRect(0, 0, this.dims.x, this.dims.y);

		// Drawing grid lines
		this.ctx.strokeStyle = "rgb(220 220 220 / 100%)";
		this.ctx.lineWidth = this.strokeWidth;
		this.ctx.beginPath();

		// const max = Math.round(canvasDims.x * Math.tan(Math.PI / 3));
		const max = this.dims.x / this.delta; // number of triangles that can fit horizontally on the canvas
		const c = this.delta / 2 / Math.tan(Math.PI / 3);

		for(let i = this.delta / 2; i <= (this.dims.x * 2); i += this.delta) {
			this.ctx.moveTo(i, 0);
			this.ctx.lineTo(0, i * Math.tan(Math.PI / 3));
		}
		
		for(let i = this.dims.x - this.delta / 2; i >= -this.dims.x; i -= this.delta) {
			this.ctx.moveTo(i, 0);
			this.ctx.lineTo(this.dims.x, (this.dims.x - i) * Math.tan(Math.PI / 3));
		}


		this.ctx.closePath();
		this.ctx.stroke();

		// Drawing horizontal lines
		const diff = this.delta / 2 * Math.tan(Math.PI / 3);
		for(let i = 0; i < this.dims.y; i += diff) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, i);
			this.ctx.lineTo(this.dims.x, i);
			this.ctx.closePath();
			this.ctx.stroke();
		}

		// Add logic here to draw additional pieces on the kumiko panel
		this.pieces.forEach(p => this.drawPiece(p.c1, p.c2));
		this.points.forEach(p => this.drawRawRefDot(p, "rgb(150 0 0)"));

		this.ctx.fillStyle = "rgb(0 0 0)";
		this.ctx.font = "10px serif"; this.ctx.fillText("(" + this.mouseCoords.x + "," + this.mouseCoords.y + ")", 2, 12);

	}
} // end of GridEqualTri class

