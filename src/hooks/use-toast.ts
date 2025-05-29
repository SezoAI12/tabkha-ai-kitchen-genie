
import { useState } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
}

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const toasts: Toast[] = [];

export const useToast = () => {
  const [, setUpdate] = useState(0);

  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, title, description, variant };
    
    toasts.push(newToast);
    setUpdate(prev => prev + 1);

    // Auto remove after 5 seconds
    setTimeout(() => {
      const index = toasts.findIndex(t => t.id === id);
      if (index > -1) {
        toasts.splice(index, 1);
        setUpdate(prev => prev + 1);
      }
    }, 5000);

    return { id };
  };

  const dismiss = (toastId: string) => {
    const index = toasts.findIndex(t => t.id === toastId);
    if (index > -1) {
      toasts.splice(index, 1);
      setUpdate(prev => prev + 1);
    }
  };

  return {
    toast,
    dismiss,
    toasts
  };
};
