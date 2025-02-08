// src/components/TaskItem.tsx

import React from 'react';
import { Task } from '../../types/Task';
import styles from "./styles.module.css"

interface TaskItemProps {
  task: Task;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onClick, onEdit, onDelete }) => {
  return (
    <div className={styles.taskItem} onClick={onClick}>
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <span className={`${styles.priority} ${styles[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className={styles.taskDescription}>{task.description}</p>
      <div className={styles.taskMeta}>
        <span className={styles.dueDate}>Due: {new Date(task.dueDate).toDateString()}</span>
        <span className={`${styles.status} ${styles[task.status]}`}>
          {task.status}
        </span>
      </div>
      <div className={styles.taskActions}>
        <button className={styles.editButton} onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
