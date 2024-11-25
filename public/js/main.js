// import { CanvasMouseMove, CanvasMouseDown, CanvasMouseUp } from './events.js'
import { GridEqualTri } from './Grid.js'

const canvas = document.querySelector("canvas");

let grid = null;

// Kumiko parameters
const frameRate = 30;

function draw4Sides(ctx) {
	ctx.strokeStyle = "rgb(220 220 220 / 100%)";
	ctx.lineWidth = strokeWidth;
	ctx.beginPath();

	for(let i = 1; i < canvasDims.y / delta; i++) {
		ctx.moveTo(0, i * delta);
		ctx.lineTo(canvasDims.x, i * delta);
	}

	for(let i = 1; i < canvasDims.x / delta; i++) {
		ctx.moveTo(i * delta, 0);
		ctx.lineTo(i * delta, canvasDims.y );
	}

	ctx.closePath();
	ctx.stroke();
}

function draw3Sides(ctx) {
	draw4Sides(ctx);

	ctx.beginPath();

	for(let i = - canvasDims.y / delta; i < canvasDims.y / delta; i++) {
		ctx.moveTo(0, i * delta);
		ctx.lineTo(canvasDims.x, canvasDims.y + (i * delta));
	}

	for(let i = - canvasDims.y / delta; i < canvasDims.y / delta; i++) {
		ctx.moveTo(canvasDims.x, i * delta);
		ctx.lineTo(0, canvasDims.y + (i * delta));
	}

	ctx.closePath();
	ctx.stroke();
}



// Draw loop
function draw() {

	grid.render();

	// Repeat draw loop
	setTimeout(draw, 1000 / frameRate);
	
}

// Drawing kumiko panel
if(canvas.getContext) {
	const ctx = canvas.getContext("2d");

	// Density parameter - To be implemented later
	// let density = parseInt(document.querySelector('.slider-bar#density').dataset.val);

	grid = new GridEqualTri(
		canvas,
		{
			x: canvas.width,
			y: canvas.height
		},
		parseInt(document.querySelector('.slider-bar#delta').dataset.val)
	);

	setTimeout(draw, 1000 / frameRate);
}
