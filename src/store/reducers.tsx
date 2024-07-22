import { combineReducers } from "@reduxjs/toolkit";
import { newsReducer } from "./slices/news/newsSlice";

const rootReducer = combineReducers({
	news: newsReducer,
});

export default rootReducer;
