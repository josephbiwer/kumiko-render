const canvas = document.querySelector("canvas");

const canvasDims = {
	x: canvas.width,
	y: canvas.height
}

let mouseCoords = {x: 0, y: 0};

// Kumiko parameters
const frameRate = 30;
const strokeWidth = 1.5;
let delta = parseInt(document.querySelector('.slider-bar#delta').dataset.val);
let density = parseInt(document.querySelector('.slider-bar#density').dataset.val);

let pieces = [];
let points = [];

// Logic to traverse through array
function moveUp(index) {
	return index - (2 * canvasDims.x / delta);
}

function moveDown(index) {
	return index + (2 * canvasDims.x / delta);
}

function moveLeft(index) {
	return index - 1;
}

function moveLeft(index) {
	return index - 1;
}

// Rendering logic
function drawRefDots (ctx, coords, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(coords.x * delta / density, coords.y * delta / density, 2, 0, Math.PI * 2, true); // Right eye
	ctx.closePath();
	ctx.fill();
}

function drawRawRefDot (ctx, coords, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(coords.x, coords.y, 2, 0, Math.PI * 2, true); // Right eye
	ctx.closePath();
	ctx.fill();
}

function drawDots(ctx) {
	// Drawing connection points
	for(let x = 0; x <= density * canvasDims.x / delta; x++){
		for(let y = 0; y <= density * canvasDims.y / delta; y++){
			drawRefDots(ctx, {x, y}, "rgb(150 0 0 / 100%)");
		}
	}
}

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

	/*
	for(let i = - canvasDims.y / deltaY; i < canvasDims.y / deltaY; i++) {
		ctx.moveTo(0, i * deltaY);
		ctx.lineTo(canvasDims.x, canvasDims.y + (i * deltaY));
	}

	for(let i = - canvasDims.y / deltaY; i < canvasDims.y / deltaY; i++) {
		ctx.moveTo(canvasDims.x, i * deltaY);
		ctx.lineTo(0, canvasDims.y + (i * deltaY));
	}
	*/

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

	/*
	for(let i = 0; i < canvasDims.y / deltaY; i += 0.5) {
		const y = i * deltaY;
		ctx.moveTo(0, y);
		ctx.lineTo(canvasDims.x, y);
	}
	*/

	ctx.closePath();
	ctx.stroke();
}

function drawEqualTri(ctx) {
	ctx.strokeStyle = "rgb(220 220 220 / 100%)";
	ctx.lineWidth = strokeWidth;
	ctx.beginPath();

	// const max = Math.round(canvasDims.x * Math.tan(Math.PI / 3));
	const max = canvasDims.x / delta; // number of triangles that can fit horizontally on the canvas
	const c = delta / 2 / Math.tan(Math.PI / 3);

	for(let i = delta / 2; i <= (canvasDims.x * 2); i += delta) {
		ctx.moveTo(i, 0);
		ctx.lineTo(0, i * Math.tan(Math.PI / 3));
	}
	
	for(let i = canvasDims.x - delta / 2; i >= -canvasDims.x; i -= delta) {
		ctx.moveTo(i, 0);
		ctx.lineTo(canvasDims.x, (canvasDims.x - i) * Math.tan(Math.PI / 3));
	}


	ctx.closePath();
	ctx.stroke();

	// Drawing horizontal lines
	const diff = delta / 2 * Math.tan(Math.PI / 3);
	for(let i = 0; i < canvasDims.y; i += diff) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(canvasDims.x, i);
		ctx.closePath();
		ctx.stroke();
	}


}

function addPiece(p) {
	pieces.push(p);
}

function drawPiece (ctx, start, end) {
	ctx.strokeStyle = "rgb(0 0 0)";
	ctx.lineWidth = strokeWidth + 1;
	ctx.beginPath();
	// ctx.moveTo(start.x * delta / density, start.y * delta / density);
	// ctx.lineTo(end.x * delta / density, end.y * delta / density);
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.closePath();
	ctx.stroke();
}

function getMousePts({ x, y}) {
	const yOff = Math.round(y / (((delta / 2) * Math.tan(Math.PI / 3)) / 2));
	const xOff = Math.round(x / (delta / 2));

	const index = yOff * canvasDims.x / (delta / 2) + xOff;
	return points[index];

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
	drawEqualTri(ctx);

	// Draw hover indicator
	if(highlight !== null) {
		// Set previous highlighted one to its default state
		drawRawRefDot(ctx, highlight.c1, "rgb(0 0 150 / 100%)");
		drawRawRefDot(ctx, highlight.c2, "rgb(0 0 150 / 100%)");
		drawPiece(ctx, highlight.c1, highlight.c2);
	}
	
	// Add logic here to draw additional pieces on the kumiko panel
	pieces.forEach(p => drawPiece(ctx, p.c1, p.c2));
	points.forEach(p => drawRawRefDot(ctx, p, "rgb(150 0 0)"));

	// Draw coords in top left corner
	ctx.fillStyle = "rgb(0 0 0)";
	ctx.font = "10px serif"; ctx.fillText("(" + mouseCoords.x + "," + mouseCoords.y + ")", 2, 12);

	// Repeat draw loop
	setTimeout(draw, 1000 / frameRate, ctx);
	
}

// Drawing kumiko panel
if(canvas.getContext) {
	const ctx = canvas.getContext("2d");

	setTimeout(draw, 1000 / frameRate, ctx);
}


// Creating points
const hn = delta / (4 * Math.pow(Math.cos(Math.PI / 6), 2));
const off = Math.tan(Math.PI / 3) * delta / 2;
let upright = false;
for(let y = 0; y < canvasDims.y; y += off) {
	let flip = false;
	if(upright === false)
		flip = true;
		
	for(let x = 0; x < canvasDims.x; x += (delta / 2)) {
		points.push({x, y})
	}

	for(let x = 0; x < canvasDims.x; x += (delta / 2)) {
		const yPt = y + (flip ? hn : off - hn);
		
		points.push({x, y: yPt})
		flip = !flip;
	}
	upright = !upright;
}


function fractal(count, index) {
	if(index >= 0) {
		if(count < 3) {
			const up = moveUp(index);
			let upLeft = up;
			for(let i = 0; i < count; i++)
				upLeft = moveLeft(upLeft);

			if(up < 0)
				return;

			addPiece({c1: points[index], c2: points[upLeft]});
			addPiece({c1: points[index], c2: points[up]});
			fractal(++count, upLeft);
			fractal(++count, up);
			return;
		}
	}
}
const temp = (2 * canvasDims.x / delta) * (2 * Math.floor(canvasDims.y / off)) + (canvasDims.y / delta);
fractal(0, temp);


// Asanoha Pattern
// delta: 50
// pieces = [{"c1":{"x":100,"y":216.5063509461096},"c2":{"x":150,"y":216.5063509461096}},{"c1":{"x":150,"y":216.5063509461096},"c2":{"x":175,"y":259.8076211353315}},{"c1":{"x":175,"y":259.8076211353315},"c2":{"x":150,"y":303.1088913245534}},{"c1":{"x":150,"y":303.1088913245534},"c2":{"x":100,"y":303.1088913245534}},{"c1":{"x":100,"y":303.1088913245534},"c2":{"x":75,"y":259.8076211353315}},{"c1":{"x":75,"y":259.8076211353315},"c2":{"x":100,"y":216.5063509461096}},{"c1":{"x":100,"y":216.5063509461096},"c2":{"x":150,"y":303.1088913245534}},{"c1":{"x":100,"y":303.1088913245534},"c2":{"x":150,"y":216.5063509461096}},{"c1":{"x":175,"y":259.8076211353315},"c2":{"x":75,"y":259.8076211353315}},{"c1":{"x":75,"y":259.8076211353315},"c2":{"x":100,"y":243.14095446866486}},{"c1":{"x":100,"y":243.14095446866486},"c2":{"x":100,"y":216.5063509461096}},{"c1":{"x":100,"y":243.14095446866486},"c2":{"x":125,"y":259.8076211353315}},{"c1":{"x":125,"y":259.8076211353315},"c2":{"x":125,"y":233.17301761277625}},{"c1":{"x":125,"y":233.17301761277625},"c2":{"x":150,"y":216.5063509461096}},{"c1":{"x":125,"y":233.17301761277625},"c2":{"x":100,"y":216.5063509461096}},{"c1":{"x":150,"y":243.14095446866486},"c2":{"x":150,"y":216.5063509461096}},{"c1":{"x":150,"y":243.14095446866486},"c2":{"x":125,"y":259.8076211353315}},{"c1":{"x":150,"y":243.14095446866486},"c2":{"x":175,"y":259.8076211353315}},{"c1":{"x":125,"y":259.8076211353315},"c2":{"x":150,"y":276.4742878019982}},{"c1":{"x":150,"y":276.4742878019982},"c2":{"x":150,"y":303.1088913245534}},{"c1":{"x":150,"y":259.8076211353315},"c2":{"x":150,"y":259.8076211353315}},{"c1":{"x":150,"y":276.4742878019982},"c2":{"x":175,"y":259.8076211353315}},{"c1":{"x":150,"y":303.1088913245534},"c2":{"x":125,"y":286.44222465788675}},{"c1":{"x":125,"y":286.44222465788675},"c2":{"x":125,"y":259.8076211353315}},{"c1":{"x":125,"y":286.44222465788675},"c2":{"x":100,"y":303.1088913245534}},{"c1":{"x":100,"y":303.1088913245534},"c2":{"x":100,"y":276.4742878019982}},{"c1":{"x":100,"y":276.4742878019982},"c2":{"x":125,"y":259.8076211353315}},{"c1":{"x":100,"y":276.4742878019982},"c2":{"x":75,"y":259.8076211353315}}]
// delta: 100
// pieces = [{"c1":{"x":150,"y":173.20508075688767},"c2":{"x":100,"y":259.8076211353315}},{"c1":{"x":100,"y":259.8076211353315},"c2":{"x":150,"y":346.41016151377534}},{"c1":{"x":150,"y":346.41016151377534},"c2":{"x":250,"y":346.41016151377534}},{"c1":{"x":250,"y":346.41016151377534},"c2":{"x":300,"y":259.8076211353315}},{"c1":{"x":300,"y":259.8076211353315},"c2":{"x":250,"y":173.20508075688767}},{"c1":{"x":250,"y":173.20508075688767},"c2":{"x":150,"y":173.20508075688767}},{"c1":{"x":150,"y":173.20508075688767},"c2":{"x":250,"y":346.41016151377534}},{"c1":{"x":150,"y":346.41016151377534},"c2":{"x":250,"y":173.20508075688767}},{"c1":{"x":100,"y":259.8076211353315},"c2":{"x":300,"y":259.8076211353315}},{"c1":{"x":300,"y":259.8076211353315},"c2":{"x":250,"y":293.1409544686648}},{"c1":{"x":250,"y":293.1409544686648},"c2":{"x":200,"y":259.8076211353315}},{"c1":{"x":250,"y":293.1409544686648},"c2":{"x":250,"y":346.41016151377534}},{"c1":{"x":250,"y":346.41016151377534},"c2":{"x":200,"y":313.076828180442}},{"c1":{"x":200,"y":313.076828180442},"c2":{"x":200,"y":259.8076211353315}},{"c1":{"x":200,"y":313.076828180442},"c2":{"x":150,"y":346.41016151377534}},{"c1":{"x":150,"y":293.1409544686648},"c2":{"x":150,"y":346.41016151377534}},{"c1":{"x":150,"y":293.1409544686648},"c2":{"x":200,"y":259.8076211353315}},{"c1":{"x":100,"y":259.8076211353315},"c2":{"x":150,"y":293.1409544686648}},{"c1":{"x":100,"y":259.8076211353315},"c2":{"x":150,"y":226.47428780199817}},{"c1":{"x":150,"y":226.47428780199817},"c2":{"x":200,"y":259.8076211353315}},{"c1":{"x":150,"y":226.47428780199817},"c2":{"x":150,"y":173.20508075688767}},{"c1":{"x":200,"y":206.538414090221},"c2":{"x":200,"y":259.8076211353315}},{"c1":{"x":200,"y":206.538414090221},"c2":{"x":150,"y":173.20508075688767}},{"c1":{"x":200,"y":206.538414090221},"c2":{"x":250,"y":173.20508075688767}},{"c1":{"x":250,"y":173.20508075688767},"c2":{"x":250,"y":226.47428780199817}},{"c1":{"x":250,"y":226.47428780199817},"c2":{"x":200,"y":259.8076211353315}},{"c1":{"x":250,"y":226.47428780199817},"c2":{"x":300,"y":259.8076211353315}}];
