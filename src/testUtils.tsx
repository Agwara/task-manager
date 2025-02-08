// src/testUtils.tsx
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import tasksReducer from './redux/tasksSlice';

export function createTestStore(initialState = {}) {
  return configureStore({
    reducer: { tasks: tasksReducer },
    preloadedState: initialState,
  });
}

interface WrapperProps {
  children: ReactNode;
  store: EnhancedStore;
}

export const ReduxWrapper: React.FC<WrapperProps> = ({ children, store }) => {
  return <Provider store={store}>{children}</Provider>;
};
