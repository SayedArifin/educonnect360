import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import userInfo from "@/FetchFuction/UserRole";
import RegisterUniversityForm from "../_component/RegisterUniversityForm";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function page() {
    const { role, session } = await userInfo();
    const isApplied = await db.applyUniversity.findFirst({
        where: {
            r_email: session?.user?.email || ""
        }, select: {
            application_status: true, kyc_date: true
        }
    })

    if (isApplied && isApplied?.application_status === 0) {

        return (
            <Card>
                <CardBody className="m-0 md:m-12">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-pink-400"> You have a painding application for </span>
                        University Representative
                    </h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">We are processing your Application. It can take upto 2 working days</p>
                    <Button className="w-full font-bold" variant="light"><Link href={"/"}>Back to Home</Link></Button>
                </CardBody>
            </Card>

        )
    } else if (isApplied && isApplied?.application_status === 1) {
        return (
            <Card>
                <CardBody className="m-0 md:m-12">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-pink-400"> We apporved your request.  </span>
                        For kyc verification check you email
                    </h1>

                    <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white"> <span className="text-pink-600 dark:text-pink-500">Day fixed for your KYC: </span> {isApplied.kyc_date}</h1>
                    <div className="flex w-fit p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div className="">
                            <span className="font-medium">Make sure that you have those document while KYC:</span>
                            <ul className="mt-1.5 list-disc list-inside">
                                <li>NID Card</li>
                                <li>Appointment Letter from University</li>
                                <li>UGC certificate</li>
                                <li>All the document needed to verify university</li>
                            </ul>
                        </div>
                    </div>
                    <Button className="w-full font-bold" variant="light"><Link href={"/"}>Back to Home</Link></Button>
                </CardBody>
            </Card>

        )
    } else if (isApplied && isApplied?.application_status === 2) {

        return (
            <Card>
                <CardBody className="m-0 md:m-12">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-pink-400"> You are already </span>
                        University Representative
                    </h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">No need to apply again</p>
                    <Button className="w-full font-bold" variant="light"><Link href={"/"}>Back to Home</Link></Button>

                </CardBody>
            </Card>

        )
    }


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
                    <Button className="w-full font-bold" variant="light"><Link href={"/"}>Back to Home</Link></Button></div>
            )}
        </Card>
    );


}


