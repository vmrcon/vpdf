import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type NotificationType = 'info' | 'success' | 'error' | 'warning';

interface NotificationProps {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  onClose: () => void;
}

export default function Notification({ message, type, isVisible, onClose }: NotificationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!show && !isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-white border-gray-200 text-brand-dark';
    }
  };

  return (
    <div id="notification-container" className="fixed top-4 right-4 z-[100] w-full max-w-sm">
      <div 
        className={cn(
          "shadow-lg rounded-lg border p-4 text-center transition-all duration-300 transform",
          getStyles(),
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <p className="font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
        >
          <i className="fa-solid fa-times"></i>
        </button>
      </div>
    </div>
  );
}
