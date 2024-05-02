import { useState, useEffect } from "react";
import { useWindowSize } from "./useWindowSize";

/**
 * A hook that monitors the vertical space available above and below a given element.
 * @param element The element to monitor.
 * @returns An object containing the optimal direction to display some other element in relation to the element, and the available space above and below the element.
 */
const useVerticalSpaceMonitoring = (element: React.RefObject<HTMLElement>): {
	optimalDirection: "up" | "down",
	availableSpaceAbove: number,
	availableSpaceBelow: number
} => {

	const windowSize = useWindowSize();
	const [optimalDirection, setOptimalDirection] = useState<"up" | "down">("down");
	const [availableSpaceAbove, setAvailableSpaceAbove] = useState<number>(0);
	const [availableSpaceBelow, setAvailableSpaceBelow] = useState<number>(0);

	useEffect(() => {
		const triggerBounds = element.current?.getBoundingClientRect() ?? new DOMRect();
		const triggerOrigin = triggerBounds.top;
		const triggerSize = triggerBounds.height;

		const edgeUp = triggerOrigin;
		const edgeDown = windowSize.height - triggerOrigin - triggerSize;

		setAvailableSpaceAbove(edgeUp);
		setAvailableSpaceBelow(edgeDown);
		setOptimalDirection(edgeUp > edgeDown ? "up" : "down");

	}, [setOptimalDirection, element, windowSize]);

	return {
		optimalDirection,
		availableSpaceAbove,
		availableSpaceBelow,
	};

}

export {
	useVerticalSpaceMonitoring
};
