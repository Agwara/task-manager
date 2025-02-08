import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTask, updateTask, deleteTask } from '../redux/tasksSlice';
import { Task } from '../types/Task';
import { useMemo, useState } from 'react';

interface UseTasksResult {
  tasks: Task[];
  filteredTasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  search: string;
  setSearch: (search: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export const useTasks = (): UseTasksResult => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch: AppDispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortBy, setSortBy] = useState(''); // options: '' | 'dueDate' | 'priority'

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (search) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }
    if (filterPriority) {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }
    if (sortBy === 'dueDate') {
      filtered = filtered.slice().sort(
        (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else if (sortBy === 'priority') {
      // Custom priority order: high > medium > low
      const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
      filtered = filtered.slice().sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }
    return filtered;
  }, [tasks, search, filterStatus, filterPriority, sortBy]);

  return {
    tasks,
    filteredTasks,
    addTask: (task: Task) => dispatch(addTask(task)),
    updateTask: (task: Task) => dispatch(updateTask(task)),
    deleteTask: (id: string) => dispatch(deleteTask(id)),
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy
  };
};
