const canvas = document.querySelector("canvas");

const canvasDims = {
	x: canvas.width,
	y: canvas.height
}

// Kumiko parameters
const length = 5;
const strokeWidth = 2;
const deltaY = 40;
const deltaX = 40;

function draw4Sides(ctx) {
	const dims = {
		x: Math.sqrt(2) * canvasDims.x,
		y: Math.sqrt(2) * canvasDims.y
	};

	console.log(dims);

	ctx.strokeStyle = "rgb(0 0 0 / 10%)";
	ctx.lineWidth = strokeWidth;
	ctx.beginPath();
	for(let i = - canvasDims.y / deltaY; i < canvasDims.y / deltaY; i++) {
		ctx.moveTo(0, i * deltaY);
		ctx.lineTo(dims.x, dims.y + (i * deltaY));
	}
	for(let i = - dims.y / deltaY; i < dims.y / deltaY; i++) {
		ctx.moveTo(dims.x, i * deltaY);
		ctx.lineTo(0, dims.y + (i * deltaY));
	}
	ctx.closePath();
	ctx.stroke();
}

function draw3Sides(ctx) {
	draw4Sides(ctx);

	ctx.beginPath();
	for(let i = 0; i < canvasDims.y / deltaY; i += 0.5) {
		const y = i * deltaY;
		ctx.moveTo(0, y);
		ctx.lineTo(canvasDims.x, y);
	}
	ctx.closePath();
	ctx.stroke();
}

function drawPiece (ctx, start, end) {
	ctx.strokeStyle = "rgb(0 0 0)";
	ctx.lineWidth = strokeWidth + 1;
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.closePath();
	ctx.stroke();
}

if(canvas.getContext) {
	const ctx = canvas.getContext("2d");

	// Drawing background of kumiko panel
	draw3Sides(ctx);
	// drawPiece(ctx, {x: 0, y:0}, {x: canvasDims.x / deltaX, y: canvasDims.y / deltaY});
	
	// Reference line
	/*
	ctx.strokeStyle = "rgb(255, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(25, 0);
	ctx.lineTo(25, 50);
	ctx.closePath();
	ctx.stroke();
	*/
}
