import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/Task';

// Helper to load tasks from local storage
const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks from local storage', error);
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
