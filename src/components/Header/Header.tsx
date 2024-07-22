import Calendar from "./Calendar";
import "./Header.css";

interface HeaderProps {
	text: string;
	from: string;
	to: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	setFrom: React.Dispatch<React.SetStateAction<string>>;
	setTo: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
	text,
	from,
	to,
	setText,
	setFrom,
	setTo,
}) => {
	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={submitHandler} className="header">
			<div>
				<Calendar defaultValue={from} setDefaultValue={setFrom} />
				<span> To </span>
				<Calendar defaultValue={to} setDefaultValue={setTo} />
			</div>
			<input
				type="text"
				className="header--search"
				placeholder="Search..."
				value={text}
				onChange={e => setText(e.target.value)}
			/>
		</form>
	);
};

export default Header;
