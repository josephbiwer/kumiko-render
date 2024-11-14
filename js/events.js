let m1 = null;

canvas.addEventListener('mousemove', e => {
	if(m1 !== null) {
		const mouseCoords = {
			x: e.layerX / (deltaX / 2),
			y: e.layerY / (deltaY / 2)
		}

		const m2 = {
			x: mouseCoords.x > m1.x + 0.5? m1.x + 1: (mouseCoords.x < m1.x - 0.5? m1.x - 1: m1.x),
			y: mouseCoords.y > m1.y + 0.5? m1.y + 1: (mouseCoords.y < m1.y - 0.5? m1.y - 1: m1.y),
		}

		highlightPoint(e.target.getContext("2d"), m1, mouseCoords);
	}

});

canvas.addEventListener('mouseleave', e => {
	// highlightPoint(e.target.getContext("2d"), null, null);
});

canvas.addEventListener('mousedown', e => {
	const mouseCoords = {
		x: e.layerX / (deltaX / 2),
		y: e.layerY / (deltaY / 2)
	}

	m1 = {
		x: Math.round(mouseCoords.x),
		y: Math.round(mouseCoords.y)
	}

	highlightPoint(e.target.getContext("2d"), m1, mouseCoords);

});

canvas.addEventListener('mouseup', e => {
	const mouseCoords = {
		x: e.layerX / (deltaX / 2),
		y: e.layerY / (deltaY / 2)
	}

	const m2 = {
		x: Math.round(mouseCoords.x),
		y: Math.round(mouseCoords.y)
	}

	const p = {
		c1: m1,
		c2: m2
	};

	addPiece(p);

	m1 = null;
	highlightPoint(e.target.getContext("2d"), null, null);
	
});
