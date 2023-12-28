import { RootState } from "@/lib/create-store";
import { articleAdapter } from "@/lib/watch-box/model/article.entity";
import { getAuthUserWatchBox } from "@/lib/watch-box/usecases/get-auth-user-watch-box.usecase";

import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
    name: "articles",
    initialState: articleAdapter.getInitialState(),
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAuthUserWatchBox.fulfilled, (state, action) => {
            const articles = action.payload.articles;
            articleAdapter.addMany(state, articles)
        })
    }
})

export const selectArticle = (id: string, state: RootState) => articleAdapter.getSelectors().selectById(state.watchBoxes.articles, id)
export const selectArticles = (ids: string[], state: RootState) => ids.map(id => selectArticle(id, state)).filter(Boolean);
