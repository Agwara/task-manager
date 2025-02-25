// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
