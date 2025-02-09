// The jest.mock call replaces the real DraggableTaskItem with our dummy component. 
// Because we return an object with a default export (and set __esModule: true), 
// the import in TaskList will work as expected

// I used this approach because Jest is not transforming the ES module syntax in 
// react-dnd (and its dependency dnd-core) located in node_modules. 


jest.mock('../src/components/DraggableTaskItem/DraggableTaskItem', () => ({
  __esModule: true,
  default: function DummyDraggableTaskItem(props: {
    task: any;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
    index: number;
    moveTask: (dragIndex: number, hoverIndex: number) => void;
  }) {
    return (
      <li data-testid="draggable-task-item" onClick={props.onClick}>
        {props.task.title}
      </li>
    );
  },
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from '../src/components/TaskList/TaskList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../src/redux/tasksSlice';
import '@testing-library/jest-dom'; // Ensure custom matchers are available
import React from "react";

// Preload some tasks for testing.
const preloadedState = {
  tasks: [
    {
      id: '1',
      title: 'Task One',
      description: 'Description One',
      dueDate: '2025-01-01',
      priority: 'low',
      status: 'to-do',
    },
    {
      id: '2',
      title: 'Task Two',
      description: 'Description Two',
      dueDate: '2025-01-02',
      priority: 'medium',
      status: 'in-progress',
    },
  ],
};

// Create a Redux test store with preloaded state.
const store = configureStore({
  reducer: { tasks: tasksReducer },
  preloadedState,
});

// Helper render function that includes the Redux Provider.
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('TaskList Component', () => {
  test('renders TaskControl and draggable task items', () => {
    renderWithProvider(<TaskList />);
    // Verify that the "Add Task" button is rendered from TaskControl.
    expect(screen.getByText(/add task/i)).toBeInTheDocument();
    // Verify that the preloaded tasks are rendered.
    expect(screen.getByText(/Task One/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Two/i)).toBeInTheDocument();
  });

  test('opens TaskDetailModal when a task is clicked', async () => {
    renderWithProvider(<TaskList />);
    // Simulate clicking on the task titled "Task One".
    fireEvent.click(screen.getByText(/Task One/i));
    // Wait for the modal to appear.
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    // Optionally verify that the modal displays the correct task title.
    expect(screen.getByRole('heading', { name: /Task One/i })).toBeInTheDocument();
  });

  test('opens AddEditTaskForm when "Add Task" button is clicked', async () => {
    renderWithProvider(<TaskList />);
    // Find the "Add Task" button and simulate a click.
    const addButton = screen.getByText(/^add task$/i);
    fireEvent.click(addButton);
    // Wait for the AddEditTaskForm to appear. For example, check for a label "Title:".
    await waitFor(() => {
      expect(screen.getByLabelText(/title:/i)).toBeInTheDocument();
    });
  });
});
