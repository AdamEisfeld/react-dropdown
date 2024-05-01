import { useState, useCallback } from "react";

const useGetOptimalRevealDirection = (element: React.RefObject<HTMLElement>): ["up" | "down", () => void, React.RefObject<HTMLElement>] => {

	const [optimalDirection, setOptimalDirection] = useState<"up" | "down">("down");

	const computeOptimalDirection = useCallback(() => {
		const triggerBounds = element.current?.getBoundingClientRect() ?? new DOMRect();
		const triggerOrigin = triggerBounds.top;
		const triggerSize = triggerBounds.height;
		const windowSize = window.innerHeight;

		const edgeUp = triggerOrigin;
		const edgeDown = windowSize - triggerOrigin - triggerSize;


		if (edgeUp > edgeDown) {
			setOptimalDirection("up");
		} else {
			setOptimalDirection("down");
		}

	}, [setOptimalDirection, element]);

	return [optimalDirection, computeOptimalDirection, element];

}

export {
	useGetOptimalRevealDirection
};
