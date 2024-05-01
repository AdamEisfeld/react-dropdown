import React from "react";
import { useCallback, useEffect } from "react";
import { useGetOptimalRevealDirection } from "./useGetOptimalRevealDirection";
import { useMatchElementSize } from "./useMatchElementSize";
import { useWindowSize } from "./useWindowSize";

interface TemplateTriggerRevealProps {
	
	containerClassName?: string;
	trigger: React.ReactNode;
	revealing: React.ReactNode;
	direction: "up" | "down" | "auto";
	isRevealed: boolean;
	onClickOutside?: (event: MouseEvent) => void;

}

/**
 * A template component that reveals a hidden element when a trigger element is clicked, in the direction specified.
 * @param props 
 * @returns 
 */
const TemplateTriggerReveal = (props: TemplateTriggerRevealProps) => {

	// MARK: - Props 

	const { direction, isRevealed, containerClassName, onClickOutside } = props;

	// MARK: - Reactive State

	const elementRoot = React.useRef<HTMLDivElement>(null);
	const elementTrigger = React.useRef<HTMLDivElement>(null);
	const elementReveal = React.useRef<HTMLDivElement>(null);
	const elementRevealContent = React.useRef<HTMLDivElement>(null);
	const [optimalDirection, computeOptimalDirection] = useGetOptimalRevealDirection(elementTrigger);
	
	// MARK: - Effects

	// Always resize our root element to match the size of our trigger
	useMatchElementSize(elementRoot, elementTrigger);

	// Update the layout of our elementReveal based on the direction and state
	const updateLayout = useCallback((checkDirection: "up" | "down", state: "in" | "out", elementToResize: HTMLElement, toMatchElement: HTMLElement, attachedToElement: HTMLElement) => {
		
		// If we are not revealed, hide our menu by setting our elementReveal's height to 0
		if (state === "out") {
			elementToResize.style.height = `0px`;
			elementToResize.style.width = `auto`;
			return;
		}

		const triggerBounds = attachedToElement.getBoundingClientRect();
		const triggerOrigin = triggerBounds.top;
		const triggerSize = triggerBounds.height;

		// First, we need to determine the required height to display all of our dropdown options.
		// We can obtain this by measuring the height of our elementRevealContent ref's element.
		const contentSize = toMatchElement.offsetHeight || 0;
		let desiredSize = contentSize;

		// Now we need to determine if the container element around our options would be cut off by the window
		// if it were set to this height.
		const windowSize = window.innerHeight;

		if (checkDirection === "up") {

			// If the container would be cut off by the window, we need to adjust the height of our elementReveal
			// to fit within the window.
			const edge = triggerOrigin - desiredSize;
			if (edge < 0) {
				desiredSize = triggerOrigin;
			}

		} else {

			// If the container would be cut off by the window, we need to adjust the height of our elementReveal
			// to fit within the window.
			const edge = triggerOrigin + triggerSize + desiredSize;
			if (edge > windowSize) {
				desiredSize = windowSize - triggerOrigin - triggerSize;
			}

		}

		// Set our elementReveal's height to the desired height
		elementToResize.style.height = `${desiredSize}px`;

	}, []);
	
	// Monitor window resize events to update our layout and recompute our direction if it is set to "auto"
	const windowSize = useWindowSize();
	useEffect(() => {
		if (direction === "auto") {
			computeOptimalDirection();
			updateLayout(optimalDirection, isRevealed ? "in" : "out", elementReveal.current!, elementRevealContent.current!, elementTrigger.current!);
		} else {
			updateLayout(direction, isRevealed ? "in" : "out", elementReveal.current!, elementRevealContent.current!, elementTrigger.current!);
		}
	}, [windowSize, isRevealed, updateLayout, direction, computeOptimalDirection, optimalDirection]);

	// Monitor clicks outside of our elementRoot and notify the parent component
	useEffect(() => {

		if (!onClickOutside || !isRevealed) {
			return;
		}

		const handleWindowClick = (event: MouseEvent) => {
			
			const target = event.target as HTMLElement;
			
			if (!elementRoot.current) {
				// We need our root element to detect if we are clicking outside of it
				return;
			}

			if (elementRoot.current.contains(target)) {
				// The click was inside our root element, ignore it
				return;
			}

			onClickOutside(event);
		}

		return () => {
			window.removeEventListener("click", handleWindowClick);
		}

	}, [isRevealed, onClickOutside]);

	// MARK: - Computed State

	const directionToUse = direction === "auto" ? optimalDirection : direction;

	// MARK: - Component
	
	return (
		<div ref={elementRoot} className="relative-element">
			{/* Container Element */}
			<div className={`container ${containerClassName} ${directionToUse === "up" ? "direction-up" : ""} ${directionToUse === "down" ? "direction-down" : ""}`}>
				{/* Trigger Element */}
				<div ref={elementTrigger} className="trigger-element">
					{props.trigger}
				</div>
				{/* Reveal Element */}
				<div ref={elementReveal} className="reveal-element">
					<div ref={elementRevealContent} className="reveal-content">
						{props.revealing}
					</div>
				</div>
			</div>
		</div>
	)
};

export default TemplateTriggerReveal;
