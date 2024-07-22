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

const API_KEY = "f648e8a4efc342cda618b31b28bd6884";

export const fetchNews = createAsyncThunk<Article[], FetchNewsParams>(
	"news/fetchNews",
	async ({ text, from, to, category }) => {
		console.log(category);

		if (category.length > 0) {
			try {
				const requests = category.map(el =>
					axios.get(
						`https://newsapi.org/v2/top-headlines?q=${
							text ? text : "a"
						}&country=us&category=${el?.text}&apiKey=${API_KEY}`
					)
				);

				const responses = await Promise.all(requests);
				const combinedData = responses.flatMap(
					response => response.data.articles
				);

				console.log(combinedData);
				return combinedData;
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		}

		try {
			const response = await axios.get(
				`https://newsapi.org/v2/top-headlines?q=${
					text ? text : "a"
				}&from=${from}&to=${to}&sortBy=last&apiKey=${API_KEY}`
			);

			const data = response.data.articles.filter(
				(el: Article) =>
					el.description !== "[Removed]" && el.title !== "[Removed]"
			);
			return data;
		} catch (error) {
			console.error("Error fetching news:", error);
			throw error;
		}
	}
);
