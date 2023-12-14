import { BsFillTrashFill } from "react-icons/bs";
import SubmitButton from "@/components/SubmitButton";
import { db } from "@/lib/db";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { getDepartment } from "@/action/action";

interface pageProps {
}

const page: React.FC<pageProps> = async () => {
    const department = await getDepartment();

    const onDelete = async (formData: FormData) => {
        "use server"
        const id = formData.get("deleteId") as string;
        if (id) {
            const res = await db.department.delete({
                where: {
                    id
                }
            })
            revalidatePath("/admin_dashboard/departments")

        }
    }



    const onSubmit = async (formData: FormData) => {
        "use server"
        const dpt_name = formData.get("dpt_name") as string;
        const dpt_shortName = formData.get("dpt_shortName") as string;
        if (!dpt_name || !dpt_shortName) {
            return;
        } else {
            const res = await db.department.create({
                data: {
                    dpt_name, dpt_shortName
                }
            })
            if (res) {
                revalidatePath("/admin_dashboard/departments")
            }
        }

    }
    return <div>
        <Card>
            <CardHeader> <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Respective Departments</h1></CardHeader>
            <CardBody className="flex flex-col gap-5">
                <Card isBlurred>
                    <CardHeader><h5 className="text-xl font-bold dark:text-white">Add Department</h5></CardHeader>
                    <CardBody>
                        <form className="flex flex-col gap-2" action={onSubmit}>
                            <Input type="text" variant="underlined" placeholder="Computer Science Engineering" label="Department Name" color="danger" name="dpt_name" isRequired />
                            <Input type="text" variant="underlined" placeholder="CSE" label="Department Name in Short" color="danger" name="dpt_shortName" isRequired />
                            <SubmitButton text="Add Department" className="w-full" />
                        </form>
                    </CardBody>
                </Card>
                <Card isBlurred>
                    <CardHeader><h5 className="text-xl font-bold dark:text-white">All Department</h5></CardHeader>
                    <CardBody>


                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Sl No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Department
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {department.map((dpt, index) => (
                                        <tr key={dpt.id} className=" border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {dpt.dpt_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <form action={onDelete}>
                                                    <input type="hidden" name="deleteId" value={dpt.id} />
                                                    <Button type="submit" variant="ghost" color="danger" isIconOnly><BsFillTrashFill /></Button>
                                                </form>

                                            </td>
                                        </tr>
                                    ))}



                                </tbody>
                            </table>
                        </div>



                    </CardBody>
                </Card>
            </CardBody>
        </Card>
    </div>;
};

export default page;