

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Progressbar from "../../_component/Progressbar";
import UniversityInfo from "../../_component/UniversityInfo";
import { getDepartment } from "@/action/action";
import userInfo from "@/FetchFuction/UserRole";
import { db } from "@/lib/db";
const page = async () => {
    const department = await getDepartment();
    const { session } = await userInfo();
    const res = await db.applyUniversity.findFirst({
        where: { r_email: session?.user?.email || "null" }, select: { id: true }
    })
    const university = await db.university.findUnique({
        where: { applicationId: res?.id },
    })
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
                        <UniversityInfo department={department} university={university} />
                    </CardBody>
                </Card>
            </CardBody>

        </Card>
    </div>;
};

export default page;