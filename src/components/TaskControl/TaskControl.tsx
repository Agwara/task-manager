import React from "react"
import styles from "./styles.module.css"

interface TaskControlProps {
  handleAddTask: () => void;
  search: string;
  setSearch: (search: string) => void; 
  setSortBy: (sortBy: string) => void;
  filterStatus: string;
  setFilterPriority: (priority: string) => void; 
  setFilterStatus: (status: string) => void;
  filterPriority: string;
  sortBy: string
}


const TaskControl:React.FC<TaskControlProps> = ({ handleAddTask,       search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  sortBy,
  setSortBy, }) => {

  return (
    <div className={styles.controls}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search tasks"
        className={styles.searchInput}
      />
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        aria-label="Filter by status"
        className={styles.select}
      >
        <option value="">All Statuses</option>
        <option value="to-do">To-Do</option>
        <option value="in-progress">In-Progress</option>
        <option value="done">Done</option>
      </select>
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        aria-label="Filter by priority"
        className={styles.select}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        aria-label="Sort tasks"
        className={styles.select}
      >
        <option value="">No Sort</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
      <button className={styles.addTaskButton} onClick={handleAddTask}>Add Task</button>
    </div>
  )
}

export default TaskControl