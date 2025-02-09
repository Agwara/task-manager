import { useState, useCallback, useEffect } from 'react';
import { useTasks } from '../../hooks/useTask';
import DraggableTaskItem from '../DraggableTaskItem/DraggableTaskItem';
// import TaskItem from '../TaskItem/TaskItem';
import TaskDetailModal from '../TaskDetailModal/TaskDetailModal';
import AddEditTaskForm from '../AddEditTaskForm/AddEditTaskForm';
import TaskControl from '../TaskControl/TaskControl';
import styles from "./styles.module.css"
import React from "react";

const TaskList: React.FC = () => {
  const {
    filteredTasks,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  // Track selected task for detail view and add/edit mode
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);


  // Local state to maintain the order for drag-and-drop.
  const [orderedTasks, setOrderedTasks] = useState(filteredTasks);

  // Function to update task order.
  const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
    const updatedTasks = Array.from(orderedTasks);
    const [removed] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, removed);
    setOrderedTasks(updatedTasks);
  }, [orderedTasks]);

  // When filteredTasks changes (e.g., through filtering or sorting), update local order.
  useEffect(() => {
    setOrderedTasks(filteredTasks);
  }, [filteredTasks]);

  
  // Open detail modal when a task is clicked
  const handleTaskClick = useCallback((taskId: string) => {
    setSelectedTask(taskId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsAddEditOpen(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsAddEditOpen(true);
  };

  const handleCloseAddEdit = () => {
    setIsAddEditOpen(false);
    setEditingTask(null);
  };


  return (
    <div>
      <TaskControl 
        handleAddTask={handleAddTask}
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <ul className={styles.taskList}>
        {orderedTasks.map((task, index) => (
          <DraggableTaskItem
            key={task.id}
            task={task}
            index={index}
            moveTask={moveTask}
            onClick={() => handleTaskClick(task.id)}
            onEdit={() => handleEditTask(task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>

{/* <ul className={styles.taskList}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task.id)}
            onEdit={() => handleEditTask(task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul> */}
      

      {isModalOpen && selectedTask && (
        <TaskDetailModal taskId={selectedTask} onClose={handleCloseModal} />
      )}
      {isAddEditOpen && (
        <AddEditTaskForm
          task={editingTask}
          onClose={handleCloseAddEdit}
          onSave={(task) => {
            if (editingTask) {
              updateTask(task);
            } else {
              addTask(task);
            }
            handleCloseAddEdit();
          }}
        />
      )}
    </div>
  );
};

export default React.memo(TaskList);
