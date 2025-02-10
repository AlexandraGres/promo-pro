import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articles/articleSlice';
import authReducer from './auth/authSlice';
import notificationReducer from './notification/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
