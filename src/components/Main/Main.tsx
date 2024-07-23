import MainItem from "./MainItem";
import "./Main.css";

export type NewsItem = {
	description: string;
	urlToImage: string;
	title: string;
	publishedAt: string;
	author: string;
	url: string;
};

interface MainProps {
	news: NewsItem[];
}

const Main: React.FC<MainProps> = ({ news }) => {
	let a = 0;
	return (
		<div className="main">
			{news.length ? (
				news.map((el: NewsItem) => <MainItem {...el} key={++a} />)
			) : (
				<h2>Oops. Not news yet :(</h2>
			)}
		</div>
	);
};

export default Main;
