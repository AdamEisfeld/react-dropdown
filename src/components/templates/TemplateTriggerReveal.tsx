import { useEffect } from "react";
import React from "react";
import { helperMatchElementSize } from "../../helpers/helperMatchElementSize";
import { helperMonitorAndMatchElementSize } from "../../helpers/helperMonitorAndMatchElementSize";

interface TemplateTriggerRevealProps {
	
	containerClassName?: string;
	trigger: React.ReactNode;
	revealing: React.ReactNode;
	direction: "up" | "down";
	isRevealed: boolean;
	onClickOutside?: (event: MouseEvent) => void;

}

/**
 * A template component that reveals a hidden element when a trigger element is clicked, in the direction specified.
 * @param props 
 * @returns 
 */
const TemplateTriggerReveal = (props: TemplateTriggerRevealProps) => {

	const elementRoot = React.useRef<HTMLDivElement>(null);
	const elementTrigger = React.useRef<HTMLDivElement>(null);
	const elementReveal = React.useRef<HTMLDivElement>(null);
	const elementRevealContent = React.useRef<HTMLDivElement>(null);
	
	const { direction, isRevealed, containerClassName, onClickOutside } = props;

	// Always resize our trigger placeholder to match the size of our trigger
	useEffect(() => {
		const match = helperMonitorAndMatchElementSize(elementTrigger.current, elementRoot.current);
		return () => {
			match.disconnect();
		}
	}, [direction]);

	// When we are revealed, set our elementReveal's height to the height of our elementRevealContent
	// When we are hidden, shrink our elementReveal's height to 0.
	useEffect(() => {

		// If we are not revealed, hide our menu by setting our elementReveal's height to 0
		if (!isRevealed && elementReveal.current) {
			elementReveal.current.style.height = `0px`;
			elementReveal.current.style.width = `auto`;
			return;
		}
		
		// Otherwise, match our elementReveal's height to the height of it's content
		helperMatchElementSize(elementRevealContent.current, elementReveal.current, 'y');
		
	}, [isRevealed]);

	// Monitor clicks outside of our elementRoot and notify the parent component
	useEffect(() => {
		const handleWindowClick = (event: MouseEvent) => {
			
			if (!onClickOutside) {
				return;
			}

			const target = event.target as HTMLElement;
			
			if (!elementRoot.current) {
				// We need our root element to detect if we are clicking outside of it
				return;
			}

			if (elementRoot.current?.contains(target)) {
				// The click was inside our root element, ignore it
				return;
			}

			onClickOutside(event);
		}

		if (isRevealed) {
			window.addEventListener("click", handleWindowClick);
		}

		return () => {
			window.removeEventListener("click", handleWindowClick);
		}
	}, [isRevealed, onClickOutside]);

	return (
		<div ref={elementRoot} className="relative-element">
			{/* Container Element */}
			<div className={`container ${containerClassName} ${direction === "up" ? "direction-up" : ""} ${direction === "down" ? "direction-down" : ""}`}>
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
