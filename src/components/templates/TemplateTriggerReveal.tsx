import React from "react";
import { useEffect } from "react";
import { useVerticalSpaceMonitoring } from "./useVerticalSpaceMonitoring";
import { useMatchElementSize } from "./useMatchElementSize";

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
	const verticalSpace = useVerticalSpaceMonitoring(elementRoot);

	// MARK: - Effects

	// Always resize our root element to match the size of our trigger.
	useMatchElementSize(elementRoot, elementTrigger);
	
	// Recompute the layout (our elementReveal's size) when:
	// - The dropdown is revealed or hidden
	// - The direction is modified
	// - The available space above or below the trigger is modified
	// - The optimal direction to reveal the dropdown is modified
	useEffect(() => {

		if (!elementReveal.current || !elementRevealContent.current) {
			return;
		}

		// If we aren't revealed, we can just set our content's size to 0 and exit early.
		if (!isRevealed) {
			elementReveal.current.style.height = `0px`;
			return;
		}

		// The maximum space required to reveal our content
		const requiredSpace = elementRevealContent.current.offsetHeight;
		
		// Set the height of our reveal element based on the direction / available space
		switch (direction) {
			case "auto":
				switch (verticalSpace.optimalDirection) {
					case "up":
						elementReveal.current.style.height = `${Math.min(requiredSpace, verticalSpace.availableSpaceAbove)}px`;
						break;
					case "down":
						elementReveal.current.style.height = `${Math.min(requiredSpace, verticalSpace.availableSpaceBelow)}px`;
						break;
				}
				break;
			case "up":
				elementReveal.current.style.height = `${Math.min(requiredSpace, verticalSpace.availableSpaceAbove)}px`;
				break;
			case "down":
				elementReveal.current.style.height = `${Math.min(requiredSpace, verticalSpace.availableSpaceBelow)}px`;
				break;
		}

	}, [isRevealed, direction, verticalSpace]);

	// Handle clicks outside of our root element
	useEffect(() => {

		const handleClick = (event: MouseEvent) => {

			if (!elementRoot.current || !isRevealed || !onClickOutside) {
				return;
			}

			if (elementRoot.current.contains(event.target as Node)) {
				return;
			}

			onClickOutside(event);

		}

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		}

	}, [isRevealed, onClickOutside, elementRoot]);
	
	// MARK: - Computed State

	const directionToUse = direction === "auto" ? verticalSpace.optimalDirection : direction;

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
