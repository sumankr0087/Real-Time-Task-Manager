import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';

interface TaskStore {
  tasks: Task[];
  filter: TaskStatus | 'all';
  sortBy: 'dueDate' | 'createdAt';
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  setFilter: (filter: TaskStatus | 'all') => void;
  setSortBy: (sortBy: 'dueDate' | 'createdAt') => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  filter: 'all',
  sortBy: 'dueDate',
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
}));