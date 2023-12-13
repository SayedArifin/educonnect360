"use client"
import { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    CheckboxGroup,
    Divider,
    Input,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoIosRemoveCircle } from "react-icons/io";
import ReactMarkdown from 'react-markdown';
interface UniversityInfoProps { }

interface Branch {
    name: string;
    address: string;
    helpline: string;
    faculties: string[];
}

const UniversityInfo: React.FC<UniversityInfoProps> = () => {
    const [isEditable, setIsEditable] = useState(false);

    // General Information
    const [yearOfEstablishment, setYearOfEstablishment] = useState("");
    const [viceChancellorName, setViceChancellorName] = useState("");
    const [registrarName, setRegistrarName] = useState("");
    const [officialWebsite, setOfficialWebsite] = useState("");
    const [availableDegrees, setAvailableDegrees] = useState<string[]>(["bachelor"]);

    // Contact Information
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [faxNumber, setFaxNumber] = useState("");

    // Branch Information
    const [branches, setBranches] = useState<Branch[]>([{ name: "", address: "", helpline: "", faculties: [] }]);
    //details
    const [markdownContent, setMarkdownContent] = useState("");
    const addBranch = () => {
        setBranches((prevBranches) => [...prevBranches, { name: "", address: "", helpline: "", faculties: [] }]);
    };

    const removeBranch = (index: number) => {
        setBranches((prevBranches) => prevBranches.filter((_, i) => i !== index));
    };

    const handleBranchChange = (index: number, field: string, value: string) => {
        setBranches((prevBranches) =>
            prevBranches.map((branch, i) =>
                i === index ? { ...branch, [field]: value } : branch
            )
        );
    };

    const handleFacultyChange = (index: number, selectedFaculties: string[]) => {
        setBranches((prevBranches) =>
            prevBranches.map((branch, i) =>
                i === index ? { ...branch, faculties: selectedFaculties } : branch
            )
        );
    };

    return (
        <div>
            <div className="flex justify-between ">
                <h2 className="text-4xl font-bold dark:text-white">{isEditable ? "Edit University Information" : "View University Information"}</h2>
                <Button color="danger" onClick={() => setIsEditable(!isEditable)}>{isEditable ? "Cancel" : "Edit"}</Button>
            </div>
            <Divider className="my-4" />
            <h5 className="text-xl font-bold dark:text-white">General Information</h5>
            <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Year of Establishment:" color="danger" value={yearOfEstablishment} onChange={(e) => setYearOfEstablishment(e.target.value)} />
            <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Vice Chancellor Name:" color="danger" value={viceChancellorName} onChange={(e) => setViceChancellorName(e.target.value)} />
            <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Registrar Name:" color="danger" value={registrarName} onChange={(e) => setRegistrarName(e.target.value)} />
            <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Official Website:" color="danger" value={officialWebsite} onChange={(e) => setOfficialWebsite(e.target.value)} />
            <CheckboxGroup isReadOnly={!isEditable} color="danger" defaultValue={availableDegrees} orientation="horizontal" label={" Available Degree:"}>
                <Checkbox value={"bachelor"} onChange={() => setAvailableDegrees((prev) => ["bachelor"])}>Bachelor</Checkbox>
                <Checkbox value={"masters"} onChange={() => setAvailableDegrees((prev) => ["masters"])}>Masters</Checkbox>
            </CheckboxGroup>

            <h5 className="text-xl font-bold dark:text-white">Contact Information</h5>
            <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Email Address:" color="danger" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
            <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Telephone / Mobile Number:" color="danger" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <Input type="text" isReadOnly={!isEditable} variant="underlined" label="Fax Number:" color="danger" value={faxNumber} onChange={(e) => setFaxNumber(e.target.value)} />

            <h5 className="text-xl font-bold dark:text-white">Branch Information</h5>
            {branches.map((branch, index) => (
                <Card key={index} className="mb-4">
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <h6 className="text-lg font-bold">{`Branch ${index + 1}`}</h6>
                            {isEditable && index > 0 && (
                                <Button
                                    color="warning"
                                    variant="flat"
                                    isIconOnly
                                    onClick={() => removeBranch(index)}
                                >
                                    <IoIosRemoveCircle size={25} />
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Input
                            type="text"
                            isReadOnly={!isEditable}
                            variant="underlined"
                            label="Branch Name:"
                            color="danger"
                            value={branch.name}
                            onChange={(e) => handleBranchChange(index, "name", e.target.value)}
                        />
                        <Input
                            type="text"
                            isReadOnly={!isEditable}
                            variant="underlined"
                            label="Branch Address:"
                            color="danger"
                            value={branch.address}
                            onChange={(e) => handleBranchChange(index, "address", e.target.value)}
                        />
                        <Input
                            type="text"
                            isReadOnly={!isEditable}
                            variant="underlined"
                            label="Branch Helpline:"
                            color="danger"
                            value={branch.helpline}
                            onChange={(e) => handleBranchChange(index, "helpline", e.target.value)}
                        />
                        <Select
                            label="Available Faculties"
                            selectionMode="multiple"
                            placeholder="Select faculties"
                            variant="underlined"
                            isDisabled={!isEditable}
                            color="danger"
                            value={branch.faculties || []}
                            onSelectionChange={(selectedOptions) => {
                                const selectedValues = Array.from(
                                    selectedOptions || [],
                                    (option) => option.valueOf()
                                ).map((value) => String(value)); // Convert each value to a string

                                handleFacultyChange(index, selectedValues);
                            }}
                        >
                            <SelectItem value={"2"} key={1}>Faculty 1</SelectItem>
                            <SelectItem value={"1"} key={2}>Faculty 2</SelectItem>
                        </Select>
                    </CardBody>
                </Card>
            ))}
            {isEditable && (
                <Button isIconOnly color="success" onClick={addBranch}>
                    <AiFillPlusCircle size={25} />
                </Button>
            )}
            <h5 className="text-xl font-bold dark:text-white">Details</h5>
            <div className="flex flex-col gap-2">
                <div>
                    <Textarea
                        placeholder="Enter Markdown Content"

                        value={markdownContent}
                        onChange={(e) => setMarkdownContent(e.target.value)}
                    />
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <h6 className="text-lg font-bold">Live Preview</h6>
                        </CardHeader>
                        <CardBody>
                            <ReactMarkdown>{markdownContent}</ReactMarkdown>
                        </CardBody>
                    </Card>
                </div>
            </div></div>

    )
};

export default UniversityInfo;
