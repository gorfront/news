import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNews } from "./newsAPI";
import { NewsItem } from "../../../components/Main/Main";

const newsSlice = createSlice({
	name: "news",
	initialState: [] as NewsItem[],
	reducers: {},
	extraReducers: build => {
		build.addCase(
			fetchNews.fulfilled.type,
			(_state, action: PayloadAction<NewsItem[]>) => {
				return action.payload;
			}
		);
	},
});

export const newsReducer = newsSlice.reducer;

export const newsSelect = (state: any) => state.news;
