import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./newsAPI";

const newsSlice = createSlice({
	name: "news",
	initialState: [],
	reducers: {},
	extraReducers: build => {
		build.addCase(fetchNews.fulfilled, (_state, { payload }) => {
			return payload;
		});
	},
});

export const newsReducer = newsSlice.reducer;

export const newsSelect = (state: any) => state.news;
