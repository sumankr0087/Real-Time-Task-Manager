import React from 'react';
import { TaskStatus } from '../types/task';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: TaskStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    pending: {
      icon: Clock,
      text: 'Pending',
      className: 'bg-yellow-100 text-yellow-800',
    },
    in_progress: {
      icon: AlertCircle,
      text: 'In Progress',
      className: 'bg-blue-100 text-blue-800',
    },
    completed: {
      icon: CheckCircle2,
      text: 'Completed',
      className: 'bg-green-100 text-green-800',
    },
  };

  const { icon: Icon, text, className } = config[status];

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        className
      )}
    >
      <Icon size={14} className="mr-1.5" />
      {text}
    </span>
  );
};