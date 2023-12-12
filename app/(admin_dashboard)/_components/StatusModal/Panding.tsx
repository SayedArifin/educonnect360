"use client"
import { ApproveApplicationById, FetchApplicationById, RejectApplicationById } from "@/action/action";
import LabelData from "@/components/LabelData";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Link } from "@nextui-org/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface PandingProps {
    id: string;
}

const Panding: React.FC<PandingProps> = ({ id }) => {
    const [r_name, setName] = useState("")
    const [r_email, setEmail] = useState("")
    const [r_number, setNumber] = useState("")
    const [university_name, setUniversity_name] = useState("")
    const [university_website, setUniversity_website] = useState("")
    const { onOpenChange } = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [kyc_date, setKYC_date] = useState<string | undefined>();
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
    const RejectApplication = async () => {
        try {
            await RejectApplicationById(id);
            toast.success("Application was successfully rejected")
            router.refresh()
            setIsOpen(false);
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")


        }

        setIsOpen(false);


    }
    const OnApprove = async () => {
        setDisabled(true)
        try {
            await ApproveApplicationById(id, kyc_date)
            toast.success("Application is in Progress now")
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
                onClose={() => setIsOpen(false)}
                onOpenChange={onOpenChange}
                placement="bottom-center"
            >
                <ModalContent >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Panding Application Request</ModalHeader>
                            <ModalBody >
                                <LabelData data={r_name} label="Full Name" />
                                <LabelData data={r_email} label="Email Address" />
                                <LabelData data={r_number} label="Phone Number" />
                                <LabelData data={university_name} label="University Name" />
                                <LabelData content={<Link target="_blank" href={university_website}>Visit Website</Link>} label="Full Name" />
                                <LabelData label="Give a Date for KYC" />
                                <div className="flex flex-col gap-2">
                                    <Input type="datetime-local" onChange={e => setKYC_date(e.target.value)} value={kyc_date} variant="underlined" />
                                </div>
                                <Button onClick={() => { OnApprove() }} variant="ghost" color="danger" isDisabled={!kyc_date && true} isLoading={isDisabled} >Approve</Button>

                            </ModalBody>
                            <ModalFooter>

                                <Button className="w-full" color="danger" onPress={() => { RejectApplication() }}>
                                    Reject Application
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Panding;