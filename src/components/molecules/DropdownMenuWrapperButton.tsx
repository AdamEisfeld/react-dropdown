interface DropdownMenuWrapperButtonProps {
	className?: string;
	onClick?: () => void;
	children?: React.ReactNode;
}

function DropdownMenuWrapperButton(props: DropdownMenuWrapperButtonProps) {

	const { className, onClick } = props;

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	}

	return (
		<button onClick={handleClick} className={`
			p-4 transition-all duration-300 hover:bg-slate-700 bg-slate-800 text-white
			${className}
		`}>
			{ props.children }
		</button>
	)
}

export default DropdownMenuWrapperButton;