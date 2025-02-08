// src/components/TaskDetailModal.tsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateTask } from '../../redux/tasksSlice';
import { Task, Status, Priority } from '../../types/Task';


interface TaskDetailModalProps {
  taskId: string;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ taskId, onClose }) => {
  const task = useSelector((state: RootState) =>
    state.tasks.find((t) => t.id === taskId)
  );
  const dispatch: AppDispatch = useDispatch();

  const [status, setStatus] = useState(task?.status || 'to-do');
  const [priority, setPriority] = useState(task?.priority || 'low');

  if (!task) return null;

  const handleSave = () => {
    const updatedTask: Task = { ...task, status, priority };
    dispatch(updateTask(updatedTask));
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true">
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div>
        <label htmlFor="status-select">Status:</label>
        <select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="to-do">To-Do</option>
          <option value="in-progress">In-Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority-select" >Priority:</label>
        <select
          id="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
  );
};

export default React.memo(TaskDetailModal);
