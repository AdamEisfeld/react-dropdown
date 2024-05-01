import React from "react";
import TemplateTriggerReveal from "../templates/TemplateTriggerReveal";
import DropdownMenuWrapperButton from "./DropdownMenuWrapperButton";

// MARK: - Types / Interfaces

export type DropdownMenuCollapseRequestReason = "didSelectOption" | "didClickRoot" | "didClickOutside";

export interface DropdownMenuOptionViewModel<ValueType> {
	key: string;
	component: React.ReactNode;
	value: ValueType;
}

export interface DropdownMenuProps<ValueType> {
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

// MARK: - Component

/**
 * A dropdown menu component that can be used to select an option from a list of options.
 * 1. Provide a placeholder component that will be wrapped in a button / displayed when no option is selected / used to open the menu when clicked.
 * 2. Provide an optional reset component that will be wrapped in a button / displayed at the top of the menu to clear the selection.
 * 3. Provide a list of DropdownMenuOptionViewModels to display in the dropdown menu, each will be wrapped in a button.
 * 4. Provide a selected DropdownMenuOptionViewModel that will replace the placeholder component when selected.
 * 5. Provide a direction for the dropdown menu to expand.
 * 6. Provide a boolean to determine if the dropdown menu is expanded.
 * 7. Control the expansion and collapse of the dropdown menu using onRequestExpand and onRequestCollapse.
 * 8. Handle the selection of an option using onSelectOption.
 */
const DropdownMenu = <ValueType,>(props: DropdownMenuProps<ValueType>)  => {

	const { direction, isExpanded, selectedOption, placeholderComponent, resetComponent, className, onRequestExpand, onRequestCollapse, onSelectOption } = props;

	// MARK: - Helpers

	const blurSelection = () => {
		(document.activeElement as HTMLElement)?.blur();
	}

	// MARK: - Event Handlers

	const handleTriggerClick = () => {
		console.log("handleTriggerClick");
		if (isExpanded) {
			onRequestCollapse("didClickRoot");
		} else {
			onRequestExpand();
		}
		// We don't want the button remaining in an active state after selection, so blur it
		blurSelection();
	}

	const handleOptionClick = (option: DropdownMenuOptionViewModel<ValueType> | null) => {
		onSelectOption(option);
		onRequestCollapse("didSelectOption");
	}

	const handleOptionFocused = () => {
		if (isExpanded) {
			return;
		}
		// If an option is focused while we are collapsed, we want to request an expansion to reveal the menu
		onRequestExpand();
	};

	const handleOutsideClick = () => {
		if (!isExpanded) {
			return;
		}
		onRequestCollapse("didClickOutside");
	};

	// MARK: - Render
	
	return (
		<TemplateTriggerReveal
			direction={direction}
			isRevealed={isExpanded}
			onClickOutside={handleOutsideClick}
			containerClassName={`
				rounded-lg transition-all duration-300 overflow-hidden
				${isExpanded ? 'shadow-lg' : ''}
				${className}
			`}
			trigger={
				<DropdownMenuWrapperButton onClick={handleTriggerClick}>
					{ selectedOption?.component ?? placeholderComponent }
				</DropdownMenuWrapperButton>
			}
			revealing={
				<div className="flex flex-col">
					{ resetComponent &&
						<DropdownMenuWrapperButton onClick={() => handleOptionClick(null)} onFocus={handleOptionFocused}>
							{ resetComponent }
						</DropdownMenuWrapperButton>
					}
					{ props.options.map((option) => (
						<DropdownMenuWrapperButton onClick={() => handleOptionClick(option)} key={option.key} onFocus={handleOptionFocused}>
							{ option.component }
						</DropdownMenuWrapperButton>
					)) }
				</div>
			}
		/>
	)
}

export default DropdownMenu;