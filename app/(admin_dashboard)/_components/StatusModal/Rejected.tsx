"use client"
import { Time } from "@/FetchFuction/LocalTime";
import { ApproveApplicationById, FetchApplicationById, MakeRepById, RejectApplicationById } from "@/action/action";
import LabelData from "@/components/LabelData";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RejectedProps {
    id: string;
}

const Rejected: React.FC<RejectedProps> = ({ id }) => {
    const [r_name, setName] = useState("")
    const [r_email, setEmail] = useState("")
    const [r_number, setNumber] = useState("")
    const [university_name, setUniversity_name] = useState("")
    const [university_website, setUniversity_website] = useState("")
    const { onOpenChange } = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setDisabled] = useState(false);

    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchApplicationById(id);
            setName(data?.r_name || "");
            setEmail(data?.r_email || "");
            setNumber(data?.r_number || "");
            setUniversity_name(data?.university_name || "");
            setUniversity_website(data?.university_website || "");


        }
        fetchData();
    }, [id]);

    const OnApprove = async () => {
        setDisabled(true)
        try {
            await MakeRepById(id)
            toast.success("You Made user as Representive")
            router.refresh()
            setDisabled(false)
            setIsOpen(false)
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
            setDisabled(false)

        }



    }

    return (
        <>
            <Button onPress={() => setIsOpen(true)} color="danger" variant="ghost">Details</Button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="bottom-center"
                onClose={() => setIsOpen(false)}
            >
                <ModalContent >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Rejected Application Request</ModalHeader>
                            <ModalBody>
                                <LabelData data={r_name} label="Full Name" />
                                <LabelData data={r_email} label="Email Address" />
                                <LabelData data={r_number} label="Phone Number" />
                                <LabelData data={university_name} label="University Name" />
                                <LabelData content={<Link target="_blank" href={university_website}>Visit Website</Link>} label="Full Name" />



                            </ModalBody>
                            <ModalFooter>

                                <Button className="w-full" onClick={() => { OnApprove() }} variant="ghost" color="danger" isLoading={isDisabled} >Add University</Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );

};

export default Rejected;