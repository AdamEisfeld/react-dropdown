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

}

const TemplateTriggerReveal = (props: TemplateTriggerRevealProps) => {

	const elementRoot = React.useRef<HTMLDivElement>(null);
	const elementTrigger = React.useRef<HTMLDivElement>(null);
	const elementReveal = React.useRef<HTMLDivElement>(null);
	const elementRevealContent = React.useRef<HTMLDivElement>(null);
	
	const { direction, isRevealed, containerClassName } = props;

	// Always resize our trigger placeholder to match the size of our trigger
	useEffect(() => {
		const match = helperMonitorAndMatchElementSize(elementTrigger.current, elementRoot.current);
		return () => {
			match.disconnect();
		}
	}, [direction]);

	// When we are revealed, set our elementReveal's height to auto
	// When we are hidden, shrink our elementReveal's height to 0.
	useEffect(() => {

		if (!isRevealed && elementReveal.current) {
			elementReveal.current.style.height = `0px`;
			elementReveal.current.style.width = `auto`;
			return;
		}

		helperMatchElementSize(elementRevealContent.current, elementReveal.current, 'y');

	}, [isRevealed]);

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
}

export default TemplateTriggerReveal;
