import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '../types/task';

interface TaskState {
  tasks: Task[];
  filter: TaskStatus | 'all';
  sortBy: 'dueDate' | 'createdAt';
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  sortBy: 'dueDate',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TaskStatus | 'all'>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'dueDate' | 'createdAt'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, setFilter, setSortBy } = taskSlice.actions;
export default taskSlice.reducer;