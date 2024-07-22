import { NewsItem } from "./Main";
import "./Main.css";

const MainItem: React.FC<NewsItem> = ({
	description,
	urlToImage,
	title,
	publishedAt,
	author,
}) => {
	return (
		<div className="mainItem">
			<img
				src={
					urlToImage
						? urlToImage
						: "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
				}
				alt="About News"
				className="mainItem--img"
			/>
			<h2 className="mainItem--title">{title}</h2>
			<p className="mainItem--description">{description}</p>
			<div className="mainItem--time">
				<p>
					<span>Published At:</span> {publishedAt.slice(0, 10)}
				</p>
				<p>
					<span>Author:</span> {author ? author : "Unknown"}
				</p>
			</div>
			<p className="mainItem--author"></p>
		</div>
	);
};

export default MainItem;
