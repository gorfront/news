import React, { useCallback, useState, memo } from "react";
import "./Categories.css";

interface CategoryItem {
	active: boolean;
	id: string;
	text: string;
}

interface CategoryProps {
	setCategory: React.Dispatch<React.SetStateAction<Record<string, string>[]>>;
}

const Categories: React.FC<CategoryProps> = memo(({ setCategory }) => {
	const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([
		{ active: false, id: "0", text: "business" },
		{ active: false, id: "1", text: "entertainment" },
		{ active: false, id: "2", text: "general" },
		{ active: false, id: "3", text: "health" },
		{ active: false, id: "4", text: "science" },
		{ active: false, id: "5", text: "sports" },
		{ active: false, id: "6", text: "technology" },
	]);

	const clickHandler = useCallback(
		(id: string) => {
			setCategoryItems(prev => {
				const updatedItems = prev.map(item =>
					item.id === id ? { ...item, active: !item.active } : item
				);

				setCategory(
					updatedItems
						.filter(item => item.active)
						.map(item => ({ text: item.text }))
				);

				return updatedItems;
			});
		},
		[setCategory]
	);

	return (
		<ul className="category__list">
			{categoryItems.map(el => (
				<li
					key={el.id}
					onClick={() => clickHandler(el.id)}
					className={`category__list--item ${el.active ? "active" : ""}`}
				>
					{el.text}
				</li>
			))}
		</ul>
	);
});

export default Categories;
