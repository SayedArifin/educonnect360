import { db } from "@/lib/db";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account.provider === "google") {
                const { name, email, image } = user;
                try {

                    const userExists = await db.user.findFirst({
                        where: {
                            email
                        }
                    });

                    if (!userExists) {
                        const res = await db.user.create({
                            data: {
                                name, email, image
                            }
                        })

                        if (res) {
                            return user;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            return user;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };