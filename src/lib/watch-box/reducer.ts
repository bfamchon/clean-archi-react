
import { articlesSlice } from "@/lib/watch-box/slices/articles.slice";
import { watchBoxesSlice } from "@/lib/watch-box/slices/watch-boxes.slice";
import { combineReducers } from "@reduxjs/toolkit";

export const reducer = combineReducers({
    [articlesSlice.name]: articlesSlice.reducer,
    [watchBoxesSlice.name]: watchBoxesSlice.reducer,
})
