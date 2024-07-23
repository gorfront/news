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

// a4470fed925744239c6f02485bab219e , f648e8a4efc342cda618b31b28bd6884

const API_KEY = "a4470fed925744239c6f02485bab219e";

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

				return combinedData;
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		}

		try {
			const response = await axios.get(
				`https://newsapi.org/v2/top-headlines?q=${text ? text : "today"}
				&from=${from}&to=${to}&sortBy=last&apiKey=${API_KEY}`
			);

			const data = response.data.articles.filter(
				(el: Article) =>
					el.description !== "[Removed]" && el.title !== "[Removed]"
			);

			return data.filter(
				(_el: any, i: number, data: { [x: string]: { url: string } }) =>
					data[i]?.url !== data[i + 1]?.url
			);
		} catch (error) {
			console.error("Error fetching news:", error);
			throw error;
		}
	}
);
