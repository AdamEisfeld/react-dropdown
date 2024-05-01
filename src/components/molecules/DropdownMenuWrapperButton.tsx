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
			p-4 transition-all duration-300 hover:bg-slate-700 bg-slate-800 text-white border-t border-slate-700 outline-none focus:bg-slate-500 active:bg-slate-500
			${className}
		`}>
			{ props.children }
		</button>
	)
}

export default DropdownMenuWrapperButton;