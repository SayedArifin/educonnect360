import { Input } from "@nextui-org/react";
interface RegisterUniversityFormProps {
    email: string | undefined;
}

const RegisterUniversityForm: React.FC<RegisterUniversityFormProps> = ({ email = "" }) => {
    return <div className="w-full ">
        <Input
            isReadOnly
            type="email"
            label="Email Address"
            variant="bordered"
            defaultValue={email}
            className="max-w-lg "
        />

        <Input type="text" variant="underlined" label="Enter University Name" className="max-w-lg " />

    </div>;
};

export default RegisterUniversityForm;