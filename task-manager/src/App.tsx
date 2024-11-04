import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { Notification } from './components/Notification';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { addTask, updateTask as updateTaskAction, deleteTask as deleteTaskAction, setFilter, setSortBy } from './store/taskSlice';
import { Task } from './types/task';
import { socket, connectSocket } from './services/socket';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [notification, setNotification] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const filter = useAppSelector(state => state.tasks.filter);
  const sortBy = useAppSelector(state => state.tasks.sortBy);

  useEffect(() => {
    connectSocket();

    socket.on('taskUpdated', (task: Task) => {
      dispatch(updateTaskAction({ id: task.id, updates: task }));
      setNotification(`Task "${task.title}" has been updated`);
    });

    socket.on('taskDeleted', (taskId: string) => {
      dispatch(deleteTaskAction(taskId));
      setNotification('A task has been deleted');
    });

    return () => {
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, [dispatch]);

  const handleCreateTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title!,
      description: taskData.description!,
      status: taskData.status!,
      dueDate: new Date(taskData.dueDate!).toISOString(),
      assignedTo: taskData.assignedTo!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch(addTask(newTask));
    socket.emit('createTask', newTask);
    setNotification(`Task "${newTask.title}" has been created`);
  };

  const handleUpdateTask = (taskData: Partial<Task>) => {
    if (!editingTask) return;
    
    const updatedTask = {
      ...editingTask,
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    
    dispatch(updateTaskAction({ id: editingTask.id, updates: updatedTask }));
    socket.emit('updateTask', updatedTask);
    setEditingTask(undefined);
    setNotification(`Task "${updatedTask.title}" has been updated`);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTaskAction(taskId));
    socket.emit('deleteTask', taskId);
    setNotification('Task has been deleted');
  };

  const filteredTasks = tasks
    .filter((task) => filter === 'all' || task.status === filter)
    .sort((a, b) => {
      const dateA = new Date(sortBy === 'dueDate' ? a.dueDate : a.createdAt);
      const dateB = new Date(sortBy === 'dueDate' ? b.dueDate : b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            New Task
          </button>
        </div>

        <TaskFilters
          currentFilter={filter}
          onFilterChange={(newFilter) => dispatch(setFilter(newFilter))}
          sortBy={sortBy}
          onSortChange={(newSort) => dispatch(setSortBy(newSort))}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(task) => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {(filteredTasks.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No tasks found. Create a new task to get started!
            </p>
          </div>
        )}

        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onClose={() => {
              setShowForm(false);
              setEditingTask(undefined);
            }}
          />
        )}

        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;