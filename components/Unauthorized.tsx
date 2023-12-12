import { Button } from "@nextui-org/button";
import Link from "next/link";


const Unauthorized = () => {
    return (
        <>
            <main className="h-screen w-full flex flex-col justify-center items-center ">
                <h1 className="text-9xl font-extrabold  tracking-widest">
                    403
                </h1>
                <div className="bg-pink-600 px-2 text-sm rounded rotate-12 absolute">
                    You Dont have permission
                </div>
                <Button variant="solid" color="danger" className="mt-5">

                    <Link href={"/"}>Back to Home</Link>
                </Button>
            </main>
        </>
    );
};

export default Unauthorized;