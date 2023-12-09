import { AiOutlineWarning } from "react-icons/ai";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
interface RegisterUniversityFormProps {
    email: string | undefined;
}

const RegisterUniversityForm: React.FC<RegisterUniversityFormProps> = ({ email = "" }) => {

    const onApply = async (formData: FormData) => {
        "use server"
        const r_email = formData.get("r_email")
        const university_name = formData.get("university_name")
        const university_website = formData.get("university_website")
        const r_name = formData.get("r_name")
        const r_number = formData.get("r_number")

        if (r_email === "" || r_name === "" || r_number === "" || university_name === "" || university_website === "") {
            return;

        } else {

        }




    }
    return <div >

        <form action={onApply} className="w-full flex flex-col gap-2">
            <Input
                isReadOnly={email !== ""}
                type="email"
                label="Email Address"
                variant="underlined"
                defaultValue={email}
                className="max-w-lg "
                name="r_email"
                isRequired

            />

            <Input type="text" variant="underlined" label="Enter University Name" className="max-w-lg " name="university_name" isRequired />
            <Input type="url" variant="underlined" label="Website URL" className="max-w-lg " name="university_website" isRequired />
            <Input type="text" variant="underlined" label="Representative Full Name(According to NID)" className="max-w-lg " name="r_name" isRequired />
            <Input type="text" variant="underlined" label="Representative Mobile Number" className="max-w-lg " name="r_number" isRequired />

            <SubmitButton text="Apply Now" />
        </form>
        <Chip className="my-5" startContent={<AiOutlineWarning size={18} />}
            variant="faded"
            color="default">All the feilds are required
        </Chip>
    </div>;
};

export default RegisterUniversityForm;