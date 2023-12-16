import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/app/option";
import { User } from "@prisma/client";

interface UserInfo {
    details: User | null;
}

const userDetail = async (): Promise<UserInfo> => {
    let details = null;

    const session = await getServerSession(authOptions);
    if (session) {
        details = await db.user.findFirst({
            where: { email: session?.user?.email as string },

        });
    }

    return { details };
};

export default userDetail;

