"use client"

import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";
interface SubmitButtonProps {
    text: string;
    className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, className }) => {
    const { pending } = useFormStatus();

    return <div><Button isLoading={pending} type="submit" variant="ghost" color="danger" className={className ? className : "w-fit"}>{text}</Button></div>;
};

export default SubmitButton;