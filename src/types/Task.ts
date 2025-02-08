// src/types/Task.ts

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'to-do' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  priority: Priority;
  status: Status;
}
