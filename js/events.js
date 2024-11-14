let m1 = null;


function getMousePos(element, e) {
	const rect = element.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	return { x, y };
}

canvas.addEventListener('mousemove', e => {
	if(m1 !== null) {
		const coords = getMousePos(e.target, e);
		const mouseCoords = {
			x: coords.x / (deltaX / density),
			y: coords.y / (deltaY / density)
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
	const coords = getMousePos(e.target, e);
	const mouseCoords = {
		x: coords.x / (deltaX / density),
		y: coords.y / (deltaY / density)
	}

	m1 = {
		x: Math.round(mouseCoords.x),
		y: Math.round(mouseCoords.y)
	}

	highlightPoint(e.target.getContext("2d"), m1, mouseCoords);

});

canvas.addEventListener('mouseup', e => {
	if(m1 !== null) {
		const coords = getMousePos(e.target, e);
		const mouseCoords = {
			x: coords.x / (deltaX / density),
			y: coords.y / (deltaY / density)
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
	}
	
});
