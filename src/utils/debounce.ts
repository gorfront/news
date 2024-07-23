export function debounce<T extends (...args: string[]) => void>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeout: number | undefined;
	return (...args: Parameters<T>): void => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), delay);
	};
}
