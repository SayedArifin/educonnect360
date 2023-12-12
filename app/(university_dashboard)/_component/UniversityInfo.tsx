"use client"

import { Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Divider, Input } from "@nextui-org/react";
import { useState } from "react";

interface UniversityInfoProps {
}

const UniversityInfo: React.FC<UniversityInfoProps> = () => {
    const [isEditable, setIsEditable] = useState(false);
    return <div>
        <div className="flex justify-between ">
            <h2 className="text-4xl font-bold dark:text-white">{isEditable ? "Edit University Information" : "View University Information"}</h2>
            <Button color="danger" onClick={() => setIsEditable(!isEditable)}>{isEditable ? "Cancel" : "Edit"}</Button>

        </div>
        <Divider className="my-4" />
        <h5 className="text-xl font-bold dark:text-white">Genaral Information</h5>
        <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Year of Establishment:" color="danger" />
        <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Vice Chancellor Name:" color="danger" />
        <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Registrar Name:" color="danger" />
        <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Official Website:" color="danger" />
        <CheckboxGroup isReadOnly={!isEditable} color="danger" defaultValue={["bachelor"]} orientation="horizontal" label={" Available Degree:"}>
            <Checkbox value={"bachelor"}>Bachelor</Checkbox>
            <Checkbox value={"masters"}>Masters</Checkbox>

        </CheckboxGroup>

        <h5 className="text-xl font-bold dark:text-white">Contect Information</h5>
        <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Email Address:" color="danger" />
        <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Telephone / Mobile Number:" color="danger" />
        <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Fax Number:" color="danger" />
        <h5 className="text-xl font-bold dark:text-white">Branch Information</h5>
        <Card>
            <CardHeader>
                <h6 className="text-md font-bold dark:text-white">Branch Name</h6>
            </CardHeader>
            <CardBody >
                <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Email Address:" color="danger" />
                <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Telephone / Mobile Number:" color="danger" />
                <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Fax Number:" color="danger" />
            </CardBody>
        </Card>



    </div >;
};

export default UniversityInfo;