import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FetchNewsParams {
	text: string;
	from: string;
	to: string;
	category: Record<string, string>[];
}

interface Article {
	title: string;
	description: string;
}

// a4470fed925744239c6f02485bab219e , f648e8a4efc342cda618b31b28bd6884, 94f7f94c6c554edeaad987ef8d9c3824

const API_KEY = "94f7f94c6c554edeaad987ef8d9c3824";

export const fetchNews = createAsyncThunk<Article[], FetchNewsParams>(
	"news/fetchNews",
	async ({ text, from, to, category }) => {
		if (category.length > 0) {
			try {
				const requests = category.map(el =>
					axios.get(
						`https://newsapi.org/v2/top-headlines?q=${
							text ? text : "a"
						}&country=us&category=${
							el?.text
						}&from=${from}&to=${to}&apiKey=${API_KEY}`
					)
				);

				const responses = await Promise.all(requests);
				const combinedData = responses.flatMap(
					response => response.data.articles
				);

				const uniqueArticles = Array.from(
					new Map(combinedData.map(article => [article.url, article])).values()
				);

				return uniqueArticles;
			} catch (error) {
				console.error(error);
			}
		}

		try {
			const response = await axios.get(
				`https://newsapi.org/v2/top-headlines?q=${text ? text : "a"}
				&from=${from}&to=${to}&sortBy=publishedAt&apiKey=${API_KEY}`
			);

			const data = response.data.articles.filter(
				(el: Article) =>
					el.description !== "[Removed]" && el.title !== "[Removed]"
			);

			const uniqueArticles = Array.from(
				new Map(
					data.map((article: { url: string }) => [article.url, article])
				).values()
			);

			return uniqueArticles;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);
