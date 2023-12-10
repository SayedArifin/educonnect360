
import FeaturedUniversityShowCard from "../../_components/featuredUniversityShowCard";
import { db } from "@/lib/db";
const page = async () => {
    const featuredUniversity = await db.featuredUniversity.findMany()
    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modify Featured University</h1>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {featuredUniversity.map((university) => (
                    <FeaturedUniversityShowCard key={university.id} data={university} />
                ))}
            </div>
        </>
    );
};

export default page;