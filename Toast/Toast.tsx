"use client"
import { toast } from "sonner";

interface ToastProps {
    type: "success" | "error" | "warning",
    text: string
}

const Toast: React.FC<ToastProps> = ({ type, text }) => {
    switch (type) {
        case "success":
            toast.success(text);
            break;
        case "error":
            toast.error(text);
            break;
        case "warning":
            toast.warning(text);
            break;
        default:
            toast.error("Unknown error")
            break;
    }

    return <></>;
};

export default Toast;
