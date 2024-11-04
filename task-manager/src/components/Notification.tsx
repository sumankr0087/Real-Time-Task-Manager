import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Bell className="h-6 w-6 text-blue-500" />
        </div>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};