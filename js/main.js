const canvas = document.querySelector("canvas");

const canvasDims = {
	x: canvas.width,
	y: canvas.height
}

// Kumiko parameters
const frameRate = 30;
const strokeWidth = 1.5;
const deltaY = 50;
const deltaX = 50;

// Rendering logic
function drawRefDots (ctx, coords, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(coords.x * deltaX / 2, coords.y * deltaY / 2, 2, 0, Math.PI * 2, true); // Right eye
	ctx.closePath();
	ctx.fill();
}

function drawDots(ctx) {
	// Drawing connection points
	for(let x = 0; x <= 2 * canvasDims.x / deltaX; x++){
		for(let y = 0; y <= 2 * canvasDims.y / deltaY; y++){
			drawRefDots(ctx, {x, y}, "rgb(150 0 0 / 100%)");
		}
	}
}

function draw4Sides(ctx) {
	ctx.strokeStyle = "rgb(220 220 220 / 100%)";
	ctx.lineWidth = strokeWidth;
	ctx.beginPath();
	for(let i = - canvasDims.y / deltaY; i < canvasDims.y / deltaY; i++) {
		ctx.moveTo(0, i * deltaY);
		ctx.lineTo(canvasDims.x, canvasDims.y + (i * deltaY));
	}
	for(let i = - canvasDims.y / deltaY; i < canvasDims.y / deltaY; i++) {
		ctx.moveTo(canvasDims.x, i * deltaY);
		ctx.lineTo(0, canvasDims.y + (i * deltaY));
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
	ctx.moveTo(start.x * deltaX / 2, start.y * deltaY / 2);
	ctx.lineTo(end.x * deltaX / 2, end.y * deltaY / 2);
	ctx.closePath();
	ctx.stroke();
}

let highlight = null;
function highlightPoint(ctx, c1, c2) {
	if(c1 !== null) {
		// Highlight new selected ref dot
		highlight = {c1, c2};
	} else {
			highlight = null;
	}
}

// Draw loop
function draw(ctx) {

	// Resetting background to white
	ctx.fillStyle = "rgb(255 255 255)";
	ctx.fillRect(0, 0, canvasDims.x, canvasDims.y);

	// Drawing background of kumiko panel
	draw3Sides(ctx);
	drawDots(ctx);

	// Draw list of pieces
	drawPiece(ctx, {x: 0, y:0}, {x: 1, y: 1});
	drawPiece(ctx, {x: 1, y:0}, {x: 1, y: 1});

	// Draw hover indicator
	if(highlight !== null) {
		// Set previous highlighted one to its default state
		drawRefDots(ctx, highlight.c1, "rgb(0 0 150 / 100%)");
		drawRefDots(ctx, highlight.c2, "rgb(0 0 150 / 100%)");
		drawPiece(ctx, highlight.c1, highlight.c2);
	}
	
	// Reference line
	/*
	ctx.strokeStyle = "rgb(255, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(25, 0);
	ctx.lineTo(25, 50);
	ctx.closePath();
	ctx.stroke();
	*/
	setTimeout(draw, 1000 / frameRate, ctx);
}

// Drawing kumiko panel
if(canvas.getContext) {
	const ctx = canvas.getContext("2d");

	setTimeout(draw, 1000 / frameRate, ctx);
}
