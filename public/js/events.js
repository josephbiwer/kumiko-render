function gridBridge() {
	return grid;
}

let m1 = null;

function getMousePos(element, e) {
	const rect = element.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	return { x, y };
}

canvas.addEventListener('mousemove', e => {
	const coords = getMousePos(e.target, e);
	gridBridge().mouseCoords = coords;

	if(m1 !== null) {
		const coords = getMousePos(e.target, e);

		gridBridge().highlightPoint(m1, coords);
	}

});

canvas.addEventListener('mouseleave', e => {
	// highlightPoint(e.target.getContext("2d"), null, null);
});

canvas.addEventListener('mousedown', e => {
	const coords = getMousePos(e.target, e);

	m1 = gridBridge().getMousePts(coords);

	gridBridge().highlightPoint(m1, m1);

});

canvas.addEventListener('mouseup', e => {
	if(m1 !== null) {
		const coords = getMousePos(e.target, e);

		const p = {
			c1: m1,
			c2: gridBridge().getMousePts(coords)
		};

		gridBridge().addPiece(p);

		m1 = null;
		gridBridge().highlightPoint(null, null);
	}
	gridBridge().highlightPoint(null, null);
	
});
