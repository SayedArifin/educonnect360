"use client"
import { Button, Progress } from "@nextui-org/react";
import { useState } from "react";
interface ProgressbarProps {
}

const Progressbar: React.FC<ProgressbarProps> = () => {
    const [value, setValue] = useState(70);
    return <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold dark:text-white">Provide 100% information to publish </h2>
        <Progress
            label={"You Have completed"}
            size="md"
            value={value}
            color="danger"
            showValueLabel={true}
            className=""
        />
        <Button color="danger" className="w-full">Publish</Button></div>;

};

export default Progressbar;