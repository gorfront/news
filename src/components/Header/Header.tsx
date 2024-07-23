import React, { useMemo, ChangeEvent, FormEvent } from "react";
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
	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const debouncedSetText = useMemo(() => debounce(setText, 300), [setText]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		debouncedSetText(e.target.value);
	};

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
				onChange={handleInputChange}
			/>
		</form>
	);
};

export default Header;
