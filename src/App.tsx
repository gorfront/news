import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { fetchNews } from "./store/slices/news/newsAPI";
import { newsSelect } from "./store/slices/news/newsSlice";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import Categories from "./components/Categories/Categories";

const today = new Date();
const date = today.setDate(today.getDate() - 1);
const defaultValue = new Date(date).toISOString().split("T")[0];

const App = () => {
	const [text, setText] = useState("");
	const [from, setFrom] = useState("2024-06-22");
	const [to, setTo] = useState(defaultValue);
	const [category, setCategory] = useState<Record<string, string>[]>([]);
	const dispatch = useAppDispatch();
	const news = useAppSelector(newsSelect);

	useEffect(() => {
		if (news) dispatch(fetchNews({ text, from, to, category }));
	}, [text, from, to, category, dispatch]);

	return (
		<div>
			<Header {...{ text, setText, from, to, setFrom, setTo }} />
			<Categories {...{ setCategory }} />
			<Main {...{ news }} />
		</div>
	);
};

export default App;
