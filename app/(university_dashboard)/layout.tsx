import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

import clsx from "clsx";

import { Providers } from "@/app/providers";

import userInfo from "@/FetchFuction/UserRole";
import Unauthorized from "@/components/Unauthorized";
import Sidebar from "./_component/Sidebar";


export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;

}) {
    const { role, session } = await userInfo();
    if (role?.role === "1") {
        return (
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={clsx(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>

                        <div className="relative flex flex-col h-screen">

                            <Sidebar email={session?.user?.email || ""}>{children}</Sidebar>

                        </div>
                    </Providers>
                </body>
            </html>
        );

    } else {


        return (
            <Unauthorized />

        )
    }


}