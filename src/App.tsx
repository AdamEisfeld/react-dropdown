import React from "react";

import DropdownMenu, { DropdownMenuOptionViewModel } from "./components/molecules/DropdownMenu";

type Direction = "up" | "down";

function App() {

	const [isExpanded, setIsExpanded] = React.useState(false);
	const [selectedOption, setSelectedOption] = React.useState<DropdownMenuOptionViewModel<Direction> | null>(null);

	const options: DropdownMenuOptionViewModel<Direction>[] = [
		{
			key: "up",
			component: <div>Up</div>,
			value: "up"
		},
		{
			key: "down",
			component: <div>Down</div>,
			value: "down"
		}
	];

	return (
		<div className="flex flex-col items-center justify-center w-full h-full bg-gray-50">
			<DropdownMenu
				className='w-max'
				direction={selectedOption?.value ?? "down"}
				options={options}
				selectedOption={selectedOption}
				placeholderComponent={
					<div>Select Direction</div>
				}
				resetComponent={
					<div>Clear</div>
				}
				isExpanded={isExpanded}
				onRequestExpand={() => {
					setIsExpanded(true);
				}}
				onRequestCollapse={() => {
					setIsExpanded(false);
				}}
				onSelectOption={(option) => {
					setSelectedOption(option);
				}}
			/>
		</div>
	)
}

export default App