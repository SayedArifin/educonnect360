import { Button } from "@nextui-org/button";

interface ApprovedProps {
    id: string;
}

const Approved: React.FC<ApprovedProps> = ({ id }) => {
    return <div>
        <Button className="md:w-fit" variant="ghost" color="danger">Details</Button>
    </div>;
};

export default Approved;