
import * as React from "react"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
  action?: React.ReactNode
}

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = React.useCallback((props: ToastProps) => {
    const id = props.id || Math.random().toString(36).substring(7)
    const toastWithId = { ...props, id }
    setToasts((prev) => [...prev, toastWithId])
    
    // Auto-dismiss after duration or 3 seconds
    const duration = props.duration || 3000
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  return {
    toast,
    toasts,
    dismiss: (id?: string) => {
      if (id) {
        setToasts((prev) => prev.filter(t => t.id !== id))
      } else {
        setToasts([])
      }
    }
  }
}

export { useToast as toast }
