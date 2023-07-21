'use client'; // it has to be a client-side component for redux toolkit to work

import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';

// 我要存什麼資料寫在這
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
