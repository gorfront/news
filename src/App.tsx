import { useEffect, useState, lazy, Suspense } from "react";
import { fetchNews } from "./store/slices/news/newsAPI";
import { newsSelect } from "./store/slices/news/newsSlice";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import Loading from "./components/Loading/Loading";

const Header = lazy(() => delayForDemo(import("./components/Header/Header")));
const Main = lazy(() => delayForDemo(import("./components/Main/Main")));
const Categories = lazy(() =>
	delayForDemo(import("./components/Categories/Categories"))
);

const today = new Date();
const fromDate = today.setDate(today.getDate() - 30);
const toDate = today.setDate(today.getDate());

function delayForDemo(promise: any) {
	return new Promise(resolve => {
		setTimeout(resolve, 2000);
	}).then(() => promise);
}

const App = () => {
	const [text, setText] = useState("");
	const [from, setFrom] = useState(
		new Date(fromDate).toISOString().split("T")[0]
	);
	const [to, setTo] = useState(new Date(toDate).toISOString().split("T")[0]);
	const [category, setCategory] = useState<Record<string, string>[]>([]);
	const dispatch = useAppDispatch();
	const news = useAppSelector(newsSelect);

	useEffect(() => {
		if (news) dispatch(fetchNews({ text, from, to, category }));
	}, [text, from, to, category, dispatch]);

	return (
		<div>
			<Suspense fallback={<Loading />}>
				<Header {...{ text, setText, from, to, setFrom, setTo }} />
				<Categories {...{ setCategory }} />
				<Main {...{ news }} />
			</Suspense>
		</div>
	);
};

export default App;
