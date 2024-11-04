import React from 'react';
import { TaskStatus } from '../types/task';
import clsx from 'clsx';

interface TaskFiltersProps {
  currentFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
  sortBy: 'dueDate' | 'createdAt';
  onSortChange: (sort: 'dueDate' | 'createdAt') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const filters: Array<{ value: TaskStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={clsx(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              currentFilter === value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};