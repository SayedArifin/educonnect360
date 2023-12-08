import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import userInfo from "@/FetchFuction/UserRole";
import RegisterUniversityForm from "../_component/RegisterUniversityForm";

export default async function page() {
    const { role, session } = await userInfo();

    return (
        <Card>
            {role && role.role === "0" ? (
                <CardBody className="m-0 md:m-12">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-pink-400"> Apply to Become a </span>
                        University Representative
                    </h1>
                    <RegisterUniversityForm email={session?.user?.email || ""} />

                </CardBody>) : (
                <div className="p-8">
                    <h1 className=" mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-pink-400">Representatives or Editors cannot apply for the </span>
                        University Representative role
                    </h1>
                    <Button className="w-full font-bold" variant="light">Back to Home</Button></div>
            )}
        </Card>
    );
}