const helperMatchElementSize = (element: HTMLDivElement | null, target: HTMLDivElement | null, axis: 'x' | 'y' | 'xy') => {
	
	if (!element) {
		console.error("No element found");
		return;
	}

	if (!target) {
		console.error("No target found");
		return;
	}

	if (axis === 'x' || axis === 'xy') {
		target.style.width = `${element.offsetWidth}px`;
	} else {
		target.style.width = `auto`;
	}
	if (axis === 'y' || axis === 'xy') {
		target.style.height = `${element.offsetHeight}px`;
	} else {
		target.style.height = `auto`;
	}

}

export {
	helperMatchElementSize,
}
