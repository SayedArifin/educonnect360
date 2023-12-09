"use client"

import { Button } from "@nextui-org/button";

import { useFormStatus } from "react-dom";


interface SubmitButtonProps {
    text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
    const { pending } = useFormStatus();




    return <div><Button isLoading={pending} type="submit" variant="ghost" color="danger" className="w-fit">{text}</Button></div>;
};

export default SubmitButton;