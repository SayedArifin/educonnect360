import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { Session } from "next-auth";

interface UserInfo {
    session: Session | null;
    role: {
        role: string | null;
    } | null;
}

const userInfo = async (): Promise<UserInfo> => {
    const session = await getServerSession(authOptions);
    const role = await db.user.findFirst({
        where: { email: session?.user?.email as string },
        select: { role: true },
    });

    return { session, role };
};

export default userInfo;
