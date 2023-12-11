import { Button } from "@nextui-org/button";

interface InProgressProps {
    id: string;
}

const InProgress: React.FC<InProgressProps> = ({ id }) => {
    return <div>
        <Button className="md:w-fit" variant="ghost" color="danger">Details</Button>
    </div>;
};

export default InProgress;