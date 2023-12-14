

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Progressbar from "../../_component/Progressbar";
import UniversityInfo from "../../_component/UniversityInfo";
import { getDepartment } from "@/action/action";

interface pageProps {
}

const page: React.FC<pageProps> = async () => {
    const department = await getDepartment();


    return <div>
        <Card className="mt-5 md:mt-0">
            <CardHeader> <h1 className=" text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modify & View University</h1></CardHeader>
            <CardBody className="flex flex-col gap-5">
                <Card>
                    <CardBody>
                        <Progressbar />
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <UniversityInfo department={department} />
                    </CardBody>
                </Card>
            </CardBody>

        </Card>
    </div>;
};

export default page;