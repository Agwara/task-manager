// src/App.tsx

import React from "react";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskList from './components/TaskList/TaskList';
import appStyles from "./appStyles.module.css"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className={appStyles.appContainer}>
          <h1 className={appStyles.taskManagerTitle}>Task Manager</h1>
          <TaskList />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
