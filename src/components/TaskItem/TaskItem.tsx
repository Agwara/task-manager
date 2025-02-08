import React from 'react';
import { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onClick, onEdit, onDelete }) => {
  return (
    <div  onClick={onClick}>
      <div>
        <h3 >{task.title}</h3>
        <span>
          {task.priority}
        </span>
      </div>
      <p>{task.description}</p>
      <div>
        <span>Due: {new Date(task.dueDate).toDateString()}</span>
        <span>
          {task.status}
        </span>
      </div>
      <div>
        <button  onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          Edit
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
