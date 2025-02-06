import { Slide, toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide
};

export const showToast = {
    message: (message: string | React.ReactNode, options: ToastOptions = {}) => {   // 매개변수 타입에 줄바꿈 형태인 JSX 도 받을 수 있도록 React.ReactNode 추가
        toast(message, { ...defaultOptions, ...options });
    },
    success: (message: string | React.ReactNode, options: ToastOptions = {}) => {
        toast.success(message, { ...defaultOptions, ...options });
    },
    error: (message: string | React.ReactNode, options: ToastOptions = {}) => {
        toast.error(message, { ...defaultOptions, ...options });
    },
    info: (message: string | React.ReactNode, options: ToastOptions = {}) => {
        toast.info(message, { ...defaultOptions, ...options });
    },
    warning: (message: string | React.ReactNode, options: ToastOptions = {}) => {
        toast.warning(message, { ...defaultOptions, ...options });
    },
};
