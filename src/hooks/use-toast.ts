
import * as React from "react"
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

type ToastType = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastType[]>([])

  const toast = React.useCallback(({ title, description, variant = "default", duration }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title || "Error", {
        description,
        duration,
      })
    } else {
      sonnerToast.success(title || "Success", {
        description,
        duration,
      })
    }
  }, [])

  return { toast, toasts }
}

export { sonnerToast as toast }
