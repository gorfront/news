interface CalendarProps {
	defaultValue: string;
	setDefaultValue: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar: React.FC<CalendarProps> = ({
	defaultValue,
	setDefaultValue,
}) => {
	return (
		<input
			type="date"
			defaultValue={defaultValue}
			onChange={e => setDefaultValue(e.target.value)}
		/>
	);
};

export default Calendar;
