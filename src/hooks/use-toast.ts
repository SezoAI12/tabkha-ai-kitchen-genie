
import * as React from "react"
import { toast } from "sonner"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: React.ReactNode
}

type Toast = ToastProps & {
  id: string
}

export const useToast = () => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((props: ToastProps) => {
    const id = props.id || Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { ...props, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Also use sonner for actual display
    if (props.variant === "destructive") {
      toast.error(props.title || "Error", {
        description: props.description
      });
    } else {
      toast.success(props.title || "Success", {
        description: props.description
      });
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)

    return id
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return {
    toast: addToast,
    toasts,
    removeToast
  }
}
