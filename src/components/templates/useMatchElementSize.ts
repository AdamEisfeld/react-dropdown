import { useEffect } from 'react';

const useMatchElementSize = (elementToModify: React.RefObject<HTMLElement>, matchingElement: React.RefObject<HTMLElement>) => {

	useEffect(() => {

		if (!matchingElement.current) {
			throw new Error("No matching element found.");
		}
	
		const monitorSize = () => {
			
			if (!matchingElement.current) {
				console.error("No matching element found.");
				return;
			}

			if (!elementToModify.current) {
				console.error("No element to modify found.");
				return;
			}

			elementToModify.current.style.width = `${matchingElement.current.offsetWidth}px`;
			elementToModify.current.style.height = `${matchingElement.current.offsetHeight}px`;

		};
	
		const observerSize = new ResizeObserver(monitorSize);
		observerSize.observe(matchingElement.current);
	
		return () => {
			observerSize.disconnect();
		}
	}, [elementToModify, matchingElement]);

}

export {
	useMatchElementSize
};