import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 2300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
};

export const showToast = {
    message: (message: string, options: ToastOptions = {}) => {
        toast(message, { ...defaultOptions, ...options });
    },
    success: (message: string, options: ToastOptions = {}) => {
        toast.success(message, { ...defaultOptions, ...options });
    },
    error: (message: string, options: ToastOptions = {}) => {
        toast.error(message, { ...defaultOptions, ...options });
    },
    info: (message: string, options: ToastOptions = {}) => {
        toast.info(message, { ...defaultOptions, ...options });
    },
    warning: (message: string, options: ToastOptions = {}) => {
        toast.warning(message, { ...defaultOptions, ...options });
    },
};
