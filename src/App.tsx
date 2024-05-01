import React from "react";

import DropdownMenu, { DropdownMenuOptionViewModel } from "./components/molecules/DropdownMenu";
import { useDropdownMenuController } from "./components/molecules/useDropdownMenuController";

function App() {

	// Create some dropdown menu controllers to manage the visual state of our dropdowns
	const dropdownOne = useDropdownMenuController();
	const dropdownTwo = useDropdownMenuController();
	const dropdownThree = useDropdownMenuController();
	const dropdownFour = useDropdownMenuController();

	// Create some state to manage the options / selected option exposed in our dropdowns. We will share this state with all dropdowns.
	const [selectedOption, setSelectedOption] = React.useState<DropdownMenuOptionViewModel<string> | null>(null);
	const options: DropdownMenuOptionViewModel<string>[] = [
		{
			key: "1",
			component: <div>One</div>,
			value: "One"
		},
		{
			key: "2",
			component: <div>Two</div>,
			value: "Two"
		},
		{
			key: "3",
			component: <div>Three</div>,
			value: "Three"
		},
		{
			key: "4",
			component: <div>Four</div>,
			value: "Four"
		},
	];

	return (
		<div className="flex flex-col w-full h-full gap-8 p-4 bg-gray-50">
			{ /* Heading */ }
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">Dropdowns</h1>
				<p><b>Selection: </b>{`${selectedOption?.value ?? 'None'}`}</p>
			</div>
			<div className="flex flex-row gap-4">
				{ /* A custom dropdown menu */ }
				<div className="flex flex-col gap-4">
					<p>A custom dropdown</p>
					<DropdownMenu
						className='w-96'
						direction={"down"}
						options={options}
						selectedOption={selectedOption}
						placeholderComponent={
							<div>Select Option</div>
						}
						resetComponent={
							<div>Clear</div>
						}
						onSelectOption={(option) => {
							setSelectedOption(option);
						}}
						isExpanded={dropdownOne.isExpanded}
						onRequestExpand={() => {
							dropdownOne.expand();
						}}
						onRequestCollapse={(reason) => {
							dropdownOne.collapse(reason);
						}}
					/>
				</div>

				{ /* A custom dropdown menu */ }
				<div className="flex flex-col gap-4">
					<p>A fixed-height dropdown</p>
					<DropdownMenu
						className='w-96 max-h-48'
						direction={"down"}
						options={options}
						selectedOption={selectedOption}
						placeholderComponent={
							<div>Select Option</div>
						}
						resetComponent={
							<div>Clear</div>
						}
						onSelectOption={(option) => {
							setSelectedOption(option);
						}}
						isExpanded={dropdownTwo.isExpanded}
						onRequestExpand={() => {
							dropdownTwo.expand();
						}}
						onRequestCollapse={(reason) => {
							dropdownTwo.collapse(reason);
						}}
					/>
				</div>

				{ /* A custom dropdown menu */ }
				<div className="flex flex-col gap-4">
					<p>An auto-width dropdown</p>
					<DropdownMenu
						className='w-max'
						direction={"down"}
						options={options}
						selectedOption={selectedOption}
						placeholderComponent={
							<div>Select Option</div>
						}
						resetComponent={
							<div>Clear</div>
						}
						onSelectOption={(option) => {
							setSelectedOption(option);
						}}
						isExpanded={dropdownThree.isExpanded}
						onRequestExpand={() => {
							dropdownThree.expand();
						}}
						onRequestCollapse={(reason) => {
							dropdownThree.collapse(reason);
						}}
					/>
				</div>

				{ /* A custom dropdown menu */ }
				<div className="flex flex-col gap-4">
					<p>A drop-"up"</p>
					<DropdownMenu
						className='w-48'
						direction={"up"}
						options={options}
						selectedOption={selectedOption}
						placeholderComponent={
							<div>Select Option</div>
						}
						resetComponent={
							<div>Clear</div>
						}
						onSelectOption={(option) => {
							setSelectedOption(option);
						}}
						isExpanded={dropdownFour.isExpanded}
						onRequestExpand={() => {
							dropdownFour.expand();
						}}
						onRequestCollapse={(reason) => {
							dropdownFour.collapse(reason);
						}}
					/>
				</div>
				
				
			</div>
		</div>
	)
}

export default App