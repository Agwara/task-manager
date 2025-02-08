import React, { useState } from 'react';
import { Task, Priority, Status } from '../../types/Task';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';


interface AddEditTaskFormProps {
  task?: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [priority, setPriority] = useState(task?.priority || 'low');
  const [status, setStatus] = useState(task?.status || 'to-do');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    const newTask: Task = {
      id: task ? task.id : uuidv4(),
      title,
      description,
      dueDate,
      priority,
      status,
    };
    onSave(newTask);
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent}>
        <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
        <form className={styles.taskForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="task-title">Title:</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="task-description">Description:</label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textArea}
            
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="task-dueDate">Due Date:</label>
            <input
              id="task-dueDate"
              type="date"
              value={dueDate}
              className={styles.inputField}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="task-priority">Priority:</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className={styles.selectField}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="task-status">Status:</label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className={styles.selectField}
            >
              <option value="to-do">To-Do</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {task ? 'Update Task' : 'Add Task'}
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTaskForm;
