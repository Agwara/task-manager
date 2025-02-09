import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

/**
 * Loads tasks from local storage.
 * If no tasks are found, generate 5 default tasks, save them to local storage, and return them.
 */
const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const tasksStr = localStorage.getItem('tasks');
    if (tasksStr) {
      // Parse and return existing tasks
      return JSON.parse(tasksStr);
    } else {
      // Generate 5 default tasks
      const initialTasks: Task[] = [
        {
          id: uuidv4(),
          title: 'Task 1',
          description: 'This is the first default task.',
          dueDate: new Date().toISOString(),
          priority: 'low',
          status: 'to-do',
        },
        {
          id: uuidv4(),
          title: 'Task 2',
          description: 'This is the second default task.',
          dueDate: new Date().toISOString(),
          priority: 'medium',
          status: 'in-progress',
        },
        {
          id: uuidv4(),
          title: 'Task 3',
          description: 'This is the third default task.',
          dueDate: new Date().toISOString(),
          priority: 'high',
          status: 'to-do',
        },
        {
          id: uuidv4(),
          title: 'Task 4',
          description: 'This is the fourth default task.',
          dueDate: new Date().toISOString(),
          priority: 'low',
          status: 'done',
        },
        {
          id: uuidv4(),
          title: 'Task 5',
          description: 'This is the fifth default task.',
          dueDate: new Date().toISOString(),
          priority: 'medium',
          status: 'in-progress',
        },
      ];

      // Save the generated tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
      return initialTasks;
    }
  } catch (error) {
    console.error('Error loading tasks from local storage:', error);
    return [];
  }
};

const initialState: Task[] = loadTasksFromLocalStorage();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const newState = state.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    },

  }
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
