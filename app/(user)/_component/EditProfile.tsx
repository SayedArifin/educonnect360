"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { User } from "@prisma/client";
import { useState } from "react";


interface EditProfileProps {
    data: User
}

const EditProfile: React.FC<EditProfileProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(data.name);
    const [image, setImage] = useState(data.image);
    return (
        <>
            <div className="">

                <Button
                    variant="ghost"
                    color="danger"
                    onPress={() => setIsOpen(true)}
                    className="capitalize"
                >
                    Edit Profile
                </Button>
            </div>
            <Modal placement="bottom-center" backdrop={"blur"} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Profile </ModalHeader>
                            <ModalBody>
                                <Input variant="underlined" label="Your Name" value={name} required />
                                <Input variant="flat" label="Email Address" value={data.email} isReadOnly />
                                <Input variant="faded" label="Your Name" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );;
};

export default EditProfile;