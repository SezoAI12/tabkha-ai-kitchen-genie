
import * as React from "react"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
  action?: React.ReactNode
}

const toastQueue: ToastProps[] = []
const listeners: Array<(toasts: ToastProps[]) => void> = []

const addToast = (toast: ToastProps) => {
  const id = toast.id || Math.random().toString(36).substring(7)
  const toastWithId = { ...toast, id }
  toastQueue.push(toastWithId)
  
  // Notify all listeners
  listeners.forEach(listener => listener([...toastQueue]))
  
  // Auto-dismiss after duration or 3 seconds
  const duration = toast.duration || 3000
  setTimeout(() => {
    const index = toastQueue.findIndex(t => t.id === id)
    if (index > -1) {
      toastQueue.splice(index, 1)
      listeners.forEach(listener => listener([...toastQueue]))
    }
  }, duration)
}

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  React.useEffect(() => {
    listeners.push(setToasts)
    setToasts([...toastQueue])
    
    return () => {
      const index = listeners.indexOf(setToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const toast = React.useCallback((props: ToastProps | string) => {
    if (typeof props === 'string') {
      addToast({ description: props })
    } else {
      addToast(props)
    }
  }, [])

  return {
    toast,
    toasts,
    dismiss: (id?: string) => {
      if (id) {
        const index = toastQueue.findIndex(t => t.id === id)
        if (index > -1) {
          toastQueue.splice(index, 1)
          listeners.forEach(listener => listener([...toastQueue]))
        }
      } else {
        toastQueue.length = 0
        listeners.forEach(listener => listener([]))
      }
    }
  }
}

export { useToast as toast }
