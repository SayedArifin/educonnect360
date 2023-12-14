"use client"
"use client";
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

interface UniversityInfoProps {
    department: { id: string; dpt_name: string; dpt_shortName: string; }[];
}

interface Branch {
    name: string;
    address: string;
    helpline: string;
    faculties: string[];
}

const UniversityInfo: React.FC<UniversityInfoProps> = ({ department }) => {
    const [isEditable, setIsEditable] = useState(false);

    const [yearOfEstablishment, setYearOfEstablishment] = useState("");
    const [viceChancellorName, setViceChancellorName] = useState("");
    const [registrarName, setRegistrarName] = useState("");
    const [officialWebsite, setOfficialWebsite] = useState("");
    const [availableDegrees, setAvailableDegrees] = useState(["becelor"]);
    const [allFaculties, setAllFaculties] = useState<string[]>([]);
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [faxNumber, setFaxNumber] = useState("");
    const [branches, setBranches] = useState<Branch[]>([{ name: "", address: "", helpline: "", faculties: [] }]);
    const [markdownContent, setMarkdownContent] = useState("");
    const [facultyInfo, setFacultyInfo] = useState<{ totalCost: string; minimumCredits: string; id: string }[]>([]);
    const getShortNameById = (id: string): string | null => {
        const dpt = department.find((dept) => dept.id === id);
        return dpt ? dpt.dpt_shortName : null;
    };
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
    console.log(facultyInfo)
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
            <CheckboxGroup
                isReadOnly={!isEditable}
                orientation="horizontal"
                label="Select available Degree(s)"
                color="danger"
                value={availableDegrees}
                onValueChange={setAvailableDegrees}
            >
                <Checkbox value="becelor">Bachelors</Checkbox>
                <Checkbox value="masters">Masters</Checkbox>
            </CheckboxGroup>
            <Select
                isDisabled={!isEditable}
                color="danger"
                selectionMode="multiple"
                label="Select available Faculties"
                variant="underlined"
                placeholder="Select available Faculties here"
                value={allFaculties}
                onSelectionChange={(selectedOptions) => {
                    const selectedValues = Array.from(
                        selectedOptions || [],
                        (option) => option.valueOf()
                    ).map((value) => String(value));

                    setAllFaculties(selectedValues);
                }}
            >
                {department.map((dpt) => (
                    <SelectItem key={dpt.id} >{dpt.dpt_shortName}</SelectItem>
                ))}
            </Select>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Dpt Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Cost
                            </th>
                            <th scope="col" className="px-6 py-3">
                                minimum Credits
                            </th>

                        </tr>
                    </thead>
                    <tbody>



                        {allFaculties.map((id, index) => (
                            <tr key={id} className=" border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {getShortNameById(id)}
                                </th>
                                <td className="px-6 py-4">
                                    <Input
                                        endContent="BDT"
                                        variant="underlined"
                                        color="danger"
                                        value={facultyInfo[index]?.totalCost || ""}
                                        onChange={(e) => setFacultyInfo((prevInfo) => [
                                            ...prevInfo.slice(0, index),
                                            { ...prevInfo[index], totalCost: e.target.value, id, minimumCredits: prevInfo[index]?.minimumCredits || "" },
                                            ...prevInfo.slice(index + 1),
                                        ])}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        variant="underlined"
                                        color="danger"
                                        value={facultyInfo[index]?.minimumCredits || ""}
                                        onChange={(e) => setFacultyInfo((prevInfo) => [
                                            ...prevInfo.slice(0, index),
                                            { ...prevInfo[index], minimumCredits: e.target.value, id, totalCost: prevInfo[index]?.totalCost || "" },
                                            ...prevInfo.slice(index + 1),
                                        ])}
                                    />
                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>
            </div>

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
                                ).map((value) => String(value));

                                handleFacultyChange(index, selectedValues);
                            }}
                        >
                            {allFaculties.map((id) => (
                                <SelectItem key={id} >{getShortNameById(id)}</SelectItem>
                            ))}
                        </Select>
                    </CardBody>
                </Card>
            ))}
            {isEditable && (
                <Button color="success" onClick={addBranch}>
                    <AiFillPlusCircle size={25} /> Add Branch
                </Button>
            )}
            <h5 className="text-xl font-bold dark:text-white">Details</h5>
            <div className="flex flex-col gap-2">
                <div>
                    <Textarea
                        variant="underlined"
                        placeholder="Enter Markdown Content"
                        isReadOnly={!isEditable}
                        color="danger"
                        value={markdownContent}
                        onChange={(e) => setMarkdownContent(e.target.value)}
                    />
                </div>
                <div>
                    <Card className="dark:bg-gray-400 w-full">
                        <CardHeader>
                            <h6 className="text-lg font-bold dark:text-black">Live Preview</h6>
                        </CardHeader>
                        <CardBody className="prose ">
                            <ReactMarkdown>{markdownContent}</ReactMarkdown>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UniversityInfo;
