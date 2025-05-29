
import { useState } from "react"
import { toast as sonnerToast } from "sonner"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: React.ReactNode
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = "default", duration }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title, {
        description,
        duration
      })
    } else {
      sonnerToast.success(title, {
        description,
        duration
      })
    }
  }

  return { toast, toasts }
}

export { sonnerToast as toast }
