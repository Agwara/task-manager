import React, { useState, useCallback, useEffect } from 'react';
import { useTasks } from '../../hooks/useTask';
import TaskItem from '../TaskItem/TaskItem';
import TaskDetailModal from '../TaskDetailModal/TaskDetailModal';
import AddEditTaskForm from '../AddEditTaskForm/AddEditTaskForm';
import TaskControl from '../TaskControl/TaskControl';
import styles from "./styles.module.css"

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
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task.id)}
            onEdit={() => handleEditTask(task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>

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
