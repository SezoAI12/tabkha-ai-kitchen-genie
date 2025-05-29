
import * as React from "react"
import { toast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export const useToast = () => {
  return {
    toast: (props: ToastProps) => {
      if (props.variant === "destructive") {
        toast.error(props.title || "Error", {
          description: props.description
        });
      } else {
        toast.success(props.title || "Success", {
          description: props.description
        });
      }
    }
  }
}
