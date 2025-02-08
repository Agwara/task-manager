// src/App.tsx

import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskList from './components/TaskList/TaskList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className="app-container">
          <h1>Task Manager</h1>
          <TaskList />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
