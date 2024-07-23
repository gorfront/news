import { useEffect, useState, lazy, Suspense } from "react";
import { fetchNews } from "./store/slices/news/newsAPI";
import { newsSelect } from "./store/slices/news/newsSlice";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import Loading from "./components/Loading/Loading";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import { delayForDemo } from "./utils/delay";

const Main = lazy(() => delayForDemo(import("./components/Main/Main")));

const today = new Date();
const getDate = today.setDate(today.getDate());
const date = new Date(getDate).toISOString().split("T")[0];

const App = () => {
	const [text, setText] = useState("");
	const [from, setFrom] = useState(date);
	const [to, setTo] = useState(date);
	const [category, setCategory] = useState<Record<string, string>[]>([]);
	const dispatch = useAppDispatch();
	const news = useAppSelector(newsSelect);

	useEffect(() => {
		if (news) dispatch(fetchNews({ text, from, to, category }));
	}, [text, from, to, category, dispatch]);

	return (
		<div>
			<Header {...{ text, setText, to, setFrom, setTo }} />
			<Categories {...{ setCategory }} />
			<Suspense fallback={<Loading />}>
				<Main {...{ news }} />
			</Suspense>
		</div>
	);
};

export default App;
