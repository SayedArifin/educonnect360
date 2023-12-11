
import Loading from "@/app/loadingaaa";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Suspense } from "react";
import AccordionCard from "../../_components/AccordionCard";

export default async function App() {

    return (
        <Card>
            <CardHeader> <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">University Registation Application</h1> </CardHeader>
            <CardBody>
                <Suspense fallback={<Loading />}>
                    <AccordionCard />
                </Suspense>

            </CardBody>
        </Card>
    );
}
