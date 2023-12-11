import { Card, CardBody } from "@nextui-org/react";
import { Application } from "./AccordionCard";
import Panding from "./StatusModal/Panding";
import InProgress from "./StatusModal/InProgress";
import Approved from "./StatusModal/Approved";
import Rejected from "./StatusModal/Rejected";

interface StatusListProps {
    data: Application
}

const StatusList: React.FC<StatusListProps> = ({ data }) => {
    return <Card isBlurred className="m-2" >
        <CardBody className="flex flex-col md:flex-row md:justify-between  w-full gap-2">
            <h1 className="text-2xl font-extrabold capitalize fomt-bold text-pink-600">{data.university_name}</h1>
            {data.application_status === 0 && <Panding id={data.id} />}
            {data.application_status === 1 && <InProgress id={data.id} />}
            {data.application_status === 2 && <Approved id={data.id} />}
            {data.application_status === 3 && <Rejected id={data.id} />}
        </CardBody>

    </Card>;
};

export default StatusList;