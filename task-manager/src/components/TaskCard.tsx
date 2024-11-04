import React from 'react';
import { format } from 'date-fns';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import { Task } from '../types/task';
import { StatusBadge } from './StatusBadge';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{task.description}</p>
      
      <div className="flex flex-wrap gap-4">
        <StatusBadge status={task.status} />
        <div className="flex items-center text-gray-500">
          <Clock size={16} className="mr-2" />
          <span className="text-sm">
            Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Assigned to: <span className="font-medium">{task.assignedTo}</span>
        </p>
      </div>
    </div>
  );
};