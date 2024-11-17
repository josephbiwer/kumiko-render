let m1 = null;


function getMousePos(element, e) {
	const rect = element.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	return { x, y };
}

canvas.addEventListener('mousemove', e => {
	const coords = getMousePos(e.target, e);
	mouseCoords = coords;

	if(m1 !== null) {
		const coords = getMousePos(e.target, e);

		highlightPoint(e.target.getContext("2d"), m1, coords);
	}

});

canvas.addEventListener('mouseleave', e => {
	// highlightPoint(e.target.getContext("2d"), null, null);
});

canvas.addEventListener('mousedown', e => {
	const coords = getMousePos(e.target, e);
	/*
	const mouseCoords = {
		x: coords.x / (delta / density),
		y: coords.y / (delta / density)
	}
	*/
	m1 = getMousePts(coords);

	highlightPoint(e.target.getContext("2d"), m1, m1);

});

canvas.addEventListener('mouseup', e => {
	if(m1 !== null) {
		const coords = getMousePos(e.target, e);

		const p = {
			c1: m1,
			c2: getMousePts(coords)
		};

		addPiece(p);

		m1 = null;
		highlightPoint(e.target.getContext("2d"), null, null);
	}
	highlightPoint(e.target.getContext("2d"), null, null);
	
});
