import { helperMatchElementSize } from "./helperMatchElementSize";

const helperMonitorAndMatchElementSize = (element: HTMLDivElement | null, target: HTMLDivElement | null): { disconnect: () => void } => {
		
	if (!element) {
		console.error("No element found");
		return {
			disconnect: () => {}
		}
	}

	if (!target) {
		console.error("No target found");
		return {
			disconnect: () => {}
		}
	}

	const monitorSize = () => {
		helperMatchElementSize(element, target, 'xy');
	};

	const observerSize = new ResizeObserver(monitorSize);
	observerSize.observe(element as Element);

	return {
		disconnect: () => {
			observerSize.disconnect();
		}
	}

}

export {
	helperMonitorAndMatchElementSize,
}