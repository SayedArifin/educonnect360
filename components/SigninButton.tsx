
"use client"
import { CgProfile } from "react-icons/cg";
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";

interface SigninButtonProps {
}

const SigninButton: React.FC<SigninButtonProps> = () => {
    const { status } = useSession();
    return status === "authenticated" ? (
        <Button color="danger" variant="shadow" className="w-full ">
            <Link href={"/profile"} className="flex justify-center items-center"><span className="mr-2"><CgProfile /></span>Profile</Link>
        </Button>
    ) : <Button isLoading={status === "loading"
    } onClick={() => signIn("google")} color="danger" variant="shadow" className="w-full " >
        <div className="flex justify-center items-center"><span className="mr-2"><AiOutlineGoogle /></span>Signin with Google</div>
    </Button >;
};

export default SigninButton;

