import React, { useMemo } from "react";
import Calendar from "./Calendar";
import { debounce } from "../../utils/debounce";
import "./Header.css";

interface HeaderProps {
	text: string;
	to: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	setFrom: React.Dispatch<React.SetStateAction<string>>;
	setTo: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
	text,
	to,
	setText,
	setFrom,
	setTo,
}) => {
	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	const debouncedSetText = useMemo(() => debounce(setText, 300), [setText]);

	return (
		<form onSubmit={submitHandler} className="header">
			<div>
				<Calendar defaultValue={to} setDefaultValue={setFrom} />
				<span> To </span>
				<Calendar defaultValue={to} setDefaultValue={setTo} />
			</div>
			<input
				type="text"
				className="header--search"
				placeholder="Search..."
				value={text}
				onChange={e => debouncedSetText(e.target.value)}
			/>
		</form>
	);
};

export default Header;
