import tasksReducer, { addTask, updateTask, deleteTask } from "../src/redux/tasksSlice";
import { Task } from "../src/types/Task";
import { v4 as uuidv4 } from "uuid";

// Mock localStorage globally
beforeEach(() => {
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
});

describe("tasksSlice reducer", () => {
  const emptyInitialState: Task[] = []; // Explicitly define empty state for testing

  test("should return the initial state", () => {
    expect(tasksReducer(emptyInitialState, { type: undefined })).toEqual(emptyInitialState);
  });

  test("should handle addTask", () => {
    const task1: Task = {
      id: uuidv4(),
      title: "Task 1",
      description: "This is task 1",
      dueDate: new Date().toISOString(),
      priority: "low",
      status: "to-do",
    };

    const state = tasksReducer(emptyInitialState, addTask(task1));
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual(task1);
    expect(localStorage.setItem).toHaveBeenCalledWith("tasks", JSON.stringify([task1]));
  });

  test("should handle updateTask", () => {
    const task1: Task = {
      id: uuidv4(),
      title: "Task 1",
      description: "This is task 1",
      dueDate: new Date().toISOString(),
      priority: "low",
      status: "to-do",
    };

    const updatedTask: Task = { ...task1, title: "Updated Task 1" };
    const state = tasksReducer([task1], updateTask(updatedTask));
    expect(state).toHaveLength(1);
    expect(state[0].title).toBe("Updated Task 1");
    expect(localStorage.setItem).toHaveBeenCalledWith("tasks", JSON.stringify([updatedTask]));
  });

  test("should handle deleteTask", () => {
    const task1: Task = {
      id: uuidv4(),
      title: "Task 1",
      description: "This is task 1",
      dueDate: new Date().toISOString(),
      priority: "low",
      status: "to-do",
    };

    const state = tasksReducer([task1], deleteTask(task1.id));
    expect(state).toHaveLength(0);
    expect(localStorage.setItem).toHaveBeenCalledWith("tasks", JSON.stringify([]));
  });
});
