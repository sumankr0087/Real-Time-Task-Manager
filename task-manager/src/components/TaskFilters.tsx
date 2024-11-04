import React from 'react';
import { TaskStatus } from '../types/task';
// import { SortAsc, Calendar } from 'lucide-react';
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
  // sortBy,
  // onSortChange,
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

      {/* <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <button
          onClick={() => onSortChange('dueDate')}
          className={clsx(
            'flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors',
            sortBy === 'dueDate'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          )}
        >
          <Calendar size={16} />
          Due Date
        </button>
        <button
          onClick={() => onSortChange('createdAt')}
          className={clsx(
            'flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors',
            sortBy === 'createdAt'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          )}
        >
          <SortAsc size={16} />
          Created
        </button>
      </div> */}
    </div>
  );
};