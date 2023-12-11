import { Button } from "@nextui-org/button";

interface RejectedProps {
    id: string;
}

const Rejected: React.FC<RejectedProps> = ({ id }) => {
    return <div>
        <Button className="md:w-fit" variant="ghost" color="danger">Details</Button>
    </div>;
};

export default Rejected;