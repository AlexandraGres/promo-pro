import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ArticleProps } from '../../components/ArticleForm/ArticleForm';

interface ArticleState {
  articles: null | ArticleProps[];
  searchQuery: string;
}

const initialState: ArticleState = {
  articles: null,
  searchQuery: '',
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<ArticleProps[]>) => {
      state.articles = action.payload;
    },
    updateArticles: (state, action: PayloadAction<string>) => {
      if (state.articles) {
        state.articles = state.articles.filter((article) => article.id !== action.payload);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setArticles, updateArticles, setSearchQuery } = articleSlice.actions;

export default articleSlice.reducer;
