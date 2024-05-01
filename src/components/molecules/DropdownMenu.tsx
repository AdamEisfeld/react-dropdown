import React from "react";
import TemplateTriggerReveal from "../templates/TemplateTriggerReveal";
import DropdownMenuWrapperButton from "./DropdownMenuWrapperButton";

type DropdownMenuCollapseRequestReason = "didSelectOption" | "didClickRoot" | "didClickOutside";

export interface DropdownMenuOptionViewModel<ValueType> {
	key: string;
	component: React.ReactNode;
	value: ValueType;
}

interface DropdownMenuProps<ValueType> {
	className?: string;
	isExpanded: boolean;
	direction: "up" | "down";
	options: DropdownMenuOptionViewModel<ValueType>[];
	selectedOption?: DropdownMenuOptionViewModel<ValueType> | null;
	placeholderComponent: React.ReactNode;
	resetComponent?: React.ReactNode | null;
	onRequestExpand: () => void;
	onRequestCollapse: (reason: DropdownMenuCollapseRequestReason) => void;
	onSelectOption: (option: DropdownMenuOptionViewModel<ValueType> | null) => void;
}

function DropdownMenu<ValueType>(props: DropdownMenuProps<ValueType>) {

	const { direction, isExpanded, selectedOption, placeholderComponent, resetComponent, className } = props;

	const handleTriggerClick = () => {
		console.log("handleTriggerClick");
		if (isExpanded) {
			props.onRequestCollapse("didClickRoot");
		} else {
			props.onRequestExpand();
		}
	}

	const handleOptionClick = (option: DropdownMenuOptionViewModel<ValueType> | null) => {
		props.onSelectOption(option);
		props.onRequestCollapse("didSelectOption");
	}

	return (
		<TemplateTriggerReveal
			direction={direction}
			isRevealed={isExpanded}
			containerClassName={`
				rounded-lg transition-all duration-300 overflow-hidden
				${isExpanded ? 'shadow-lg' : ''}
				${className}
			`}
			trigger={
				<DropdownMenuWrapperButton onClick={() => handleTriggerClick()} className="w-full bg-yellow-300">
					{ selectedOption?.component ?? placeholderComponent }
				</DropdownMenuWrapperButton>
			}
			revealing={
				<div className="flex flex-col">
					{ resetComponent &&
						<DropdownMenuWrapperButton onClick={() => handleOptionClick(null)} className="w-full">
							{ resetComponent }
						</DropdownMenuWrapperButton>
					}
					{ props.options.map((option) => (
						<DropdownMenuWrapperButton onClick={() => handleOptionClick(option)} key={option.key} className="w-full">
							{ option.component }
						</DropdownMenuWrapperButton>
					)) }
				</div>
			}
		/>
	)
}

export default DropdownMenu;