import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { Session } from "next-auth";
import { authOptions } from "@/app/option";

interface UserInfo {
    session: Session | null;
    role: {
        role: string | null;
    } | null;
}

const userInfo = async (): Promise<UserInfo> => {
    let role = null;

    const session = await getServerSession(authOptions);
    if (session) {
        role = await db.user.findFirst({
            where: { email: session?.user?.email as string },
            select: { role: true },
        });
    }

    return { session, role };
};

export default userInfo;

