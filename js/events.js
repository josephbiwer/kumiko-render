canvas.addEventListener('mousemove', e => {
	const mouseCoords = {
		x: e.layerX / (deltaX / 2),
		y: e.layerY / (deltaY / 2)
	}

	const m1 = {
		x: Math.floor(mouseCoords.x),
		y: Math.floor(mouseCoords.y)
	}
	
	const m2 = {
		x: mouseCoords.x > m1.x + 0.5? m1.x + 1: (mouseCoords.x < m1.x - 0.5? m1.x - 1: m1.x),
		y: mouseCoords.y > m1.y + 0.5? m1.y + 1: (mouseCoords.y < m1.y - 0.5? m1.y - 1: m1.y),
	}

	highlightPoint(e.target.getContext("2d"), m1, m2);

});

canvas.addEventListener('mouseleave', e => {
	highlightPoint(e.target.getContext("2d"), null, null);
});

canvas.addEventListener('click', e => {
	// Clicked the canvas
});
