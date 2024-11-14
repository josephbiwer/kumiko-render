const canvas = document.querySelector("canvas");

const canvasDims = {
	x: canvas.width,
	y: canvas.height
}

// Kumiko parameters
const frameRate = 30;
const strokeWidth = 1.5;
let deltaY = 100;
let deltaX = 100;
let density = 8;

const pieces = [];

// Rendering logic
function drawRefDots (ctx, coords, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(coords.x * deltaX / density, coords.y * deltaY / density, 2, 0, Math.PI * 2, true); // Right eye
	ctx.closePath();
	ctx.fill();
}

function drawDots(ctx) {
	// Drawing connection points
	for(let x = 0; x <= density * canvasDims.x / deltaX; x++){
		for(let y = 0; y <= density * canvasDims.y / deltaY; y++){
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

function addPiece(p) {
	pieces.push(p);
}

function drawPiece (ctx, start, end) {
	ctx.strokeStyle = "rgb(0 0 0)";
	ctx.lineWidth = strokeWidth + 1;
	ctx.beginPath();
	ctx.moveTo(start.x * deltaX / density, start.y * deltaY / density);
	ctx.lineTo(end.x * deltaX / density, end.y * deltaY / density);
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

	// Draw hover indicator
	if(highlight !== null) {
		// Set previous highlighted one to its default state
		drawRefDots(ctx, highlight.c1, "rgb(0 0 150 / 100%)");
		drawRefDots(ctx, highlight.c2, "rgb(0 0 150 / 100%)");
		drawPiece(ctx, highlight.c1, highlight.c2);
	}
	
	// Add logic here to draw additional pieces on the kumiko panel
	pieces.forEach(p => drawPiece(ctx, p.c1, p.c2));

	// Repeat draw loop
	setTimeout(draw, 1000 / frameRate, ctx);
}

// Drawing kumiko panel
if(canvas.getContext) {
	const ctx = canvas.getContext("2d");

	setTimeout(draw, 1000 / frameRate, ctx);
}
