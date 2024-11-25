const sliders = document.querySelectorAll(".slider"); 

sliders.forEach(s => {
	// Set initial values vased on data-val in HTML
	s.querySelector('label').innerHTML = s.querySelector('label').htmlFor + ": " + parseInt(s.querySelector('.slider-bar').dataset.val);

	// Set slider position
	const bar = s.querySelector('.slider-bar');
	const min = bar.dataset.min;
	const max = bar.dataset.max;
	s.querySelector('.slider-bar span').style.left = (100 * (bar.dataset.val - min) / (max - min)) + "%";

	// Event handling
	const span = s.querySelector('span');

	span.addEventListener('mousedown', e => {
		e.target.parentElement.classList.add('click');
	})

	s.addEventListener('mousemove', e => {
		const sliderContainer = s.querySelector('.slider-bar');

		if(sliderContainer.classList.contains('click')) {
			const { x } = getMousePos(sliderContainer, e);
			let width = 100 * x / sliderContainer.getBoundingClientRect().width;
			width = width >= 100 ? 100 : width < 0 ? 0: width;
			const val = Math.round(width / (100/ (sliderContainer.dataset.max - sliderContainer.dataset.min))) + parseInt(sliderContainer.dataset.min);
			sliderContainer.children[0].style.left = width + "%";

			s.querySelector('label').innerHTML = s.querySelector('label').htmlFor + ": " + val;

			switch(s.querySelector('label').htmlFor) {
				case 'density':
					density = val;
					break;
				case 'delta':
					delta = val;
					break;
			}
		}

	});

	span.addEventListener('mouseup', e => {
		e.target.parentElement.classList.remove('click');
	})
})

window.addEventListener('mouseup', e => {
	const s = document.querySelectorAll('.slider-bar.click')
	s.forEach(c => c.classList.remove('click'))
})
