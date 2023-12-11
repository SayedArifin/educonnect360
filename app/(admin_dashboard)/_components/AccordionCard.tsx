"use client"
import { FetchApplications } from "@/action/action";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import StatusList from "./StatusList";
export interface Application {
    id: string;
    university_name: string;
    application_status: number;
}
const AccordionCard = () => {
    const [panding, setPanding] = useState<Array<Application>>([])
    const [inProgress, setInProgress] = useState<Array<Application>>([])
    const [approved, setApproved] = useState<Array<Application>>([])
    const [rejected, setRejected] = useState<Array<Application>>([])
    useEffect(() => {
        const fetchData = async () => {
            const applications = await FetchApplications();
            // Filter applications based on application_status
            const pandingApplications = applications.filter(app => app.application_status === 0);
            const inProgressApplications = applications.filter(app => app.application_status === 1);
            const approvedApplications = applications.filter(app => app.application_status === 2);
            const rejectedApplications = applications.filter(app => app.application_status === 3);

            // Update state variables
            setPanding(pandingApplications);
            setInProgress(inProgressApplications);
            setApproved(approvedApplications);
            setRejected(rejectedApplications);
        };

        fetchData();
    }, []);

    return (
        <Accordion defaultExpandedKeys={"1"}>
            <AccordionItem key="1" aria-label={"Pending Request"} title={<div className="flex gap-3"><p className="font-bold ">Pending Requests</p><Chip>{panding.length}</Chip></div>}>
                {panding.length > 0 ? (
                    <>
                        {panding.map((req) => (
                            <StatusList key={req.id} data={req} />
                        ))}
                    </>
                ) : (
                    <p className="font-bold text-3xl">No Request Pending Now</p>
                )}
            </AccordionItem>
            <AccordionItem key="2" aria-label={"In Progress Request"} title={<div className="flex gap-3"><p className="font-bold ">In Progress Request</p><Chip>{inProgress.length}</Chip></div>}>
                {inProgress.length > 0 ? (
                    <>
                        {inProgress.map((req) => (
                            <StatusList key={req.id} data={req} />
                        ))}
                    </>
                ) : (
                    <p className="font-bold text-3xl">No Request In Progress Now</p>
                )}
            </AccordionItem>
            <AccordionItem key="3" aria-label={"Approved Request"} title={<div className="flex gap-3"><p className="font-bold ">Approved Request</p><Chip>{approved.length}</Chip></div>}>
                {approved.length > 0 ? (
                    <>
                        {approved.map((req) => (
                            <StatusList key={req.id} data={req} />
                        ))}
                    </>
                ) : (
                    <p className="font-bold text-3xl">No Approved Requests</p>
                )}
            </AccordionItem>
            <AccordionItem key="4" aria-label={"Rejected Request"} title={<div className="flex gap-3"><p className="font-bold ">Rejected Request</p><Chip>{rejected.length}</Chip></div>}>
                {rejected.length > 0 ? (
                    <>
                        {rejected.map((req) => (
                            <StatusList key={req.id} data={req} />
                        ))}
                    </>
                ) : (
                    <p className="font-bold text-3xl">No Rejected Requests</p>
                )}
            </AccordionItem>
        </Accordion>
    );
};
export default AccordionCard;