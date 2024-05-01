import { useState } from "react";
import { DropdownMenuCollapseRequestReason } from "./DropdownMenu";

/**
 * A hook that provides the state and methods to control a dropdown menu.
 * @returns An object containing the state and methods to control a dropdown menu.
 */
const useDropdownMenuController = () => {
	
	const [isExpanded, setIsExpanded] = useState(false);

	const handleRequestExpand = () => {
		setIsExpanded(true);
	}

	/* eslint-disable @typescript-eslint/no-unused-vars */
	const handleRequestCollapse = (reason: DropdownMenuCollapseRequestReason) => {
		setIsExpanded(false);
	}

	return {
		isExpanded,
		expand: handleRequestExpand,
		collapse: handleRequestCollapse,
	}

}

export {
	useDropdownMenuController
}
