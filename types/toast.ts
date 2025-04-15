export type ToasType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: string;
    type: ToasType;
    title: string;
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    },
}

export interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
    removeAllToasts: () => void;
}