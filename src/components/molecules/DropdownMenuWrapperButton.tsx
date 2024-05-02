interface DropdownMenuWrapperButtonProps {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	onFocus?: () => void;
}

/**
 * The button component that wraps each component rendered in a DropdownMenu.
 */
function DropdownMenuWrapperButton(props: DropdownMenuWrapperButtonProps) {

	const { className, onClick, onFocus } = props;

	return (
		<button onClick={onClick} onFocus={onFocus} className={`
			outline-none focus:outline-none
			${className}
		`}>
			{ props.children }
		</button>
	)
}

export default DropdownMenuWrapperButton;