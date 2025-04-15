"use client";

import { useToastContext } from "@/context/toast-context";
import type { Toast } from "@/types/toast";

export function useToast() {
  const { addToast, removeAllToasts, toasts } = useToastContext();

  const toast = (props: Omit<Toast, "id">) => {
    addToast(props);
  };

  toast.success = (props: Omit<Omit<Toast, "id">, "type"> | string) => {
    if (typeof props === "string") {
      addToast({ title: props, type: "success" });
    } else {
      addToast({ ...props, type: "success" });
    }
  }

  toast.error = (props: Omit<Omit<Toast, "id">, "type"> | string) => {
    if (typeof props === "string") {
        addToast({ title: props, type: "error" });
    } else {
        addToast({ ...props, type: "error" });
    }
  }

  toast.warning = (props: Omit<Omit<Toast, "id">, "type"> | string) => {
    if (typeof props === "string") {
        addToast({ title: props, type: "warning" });
    } else {
        addToast({ ...props, type: "warning" });
    }
  }

  toast.info = (props: Omit<Omit<Toast, "id">, "type"> | string) => {
    if (typeof props === "string") {
        addToast({ title: props, type: "info" });
    } else {
        addToast({ ...props, type: "info" });
    }
  }

  toast.dismissAll = () => {
    removeAllToasts
  }

  return {
    toast,
    toasts,
    dismissAll: removeAllToasts,
  }
}
