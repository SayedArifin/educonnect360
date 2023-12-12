



"use client"
import { useState, useEffect } from 'react';
import { ThemeSwitch } from "@/components/theme-switch";
import Link from 'next/link';
import { FaHome, FaPaperclip } from 'react-icons/fa';
import { BiMenuAltLeft } from "react-icons/bi";
import { MdPublishedWithChanges } from "react-icons/md";
import { GetUniversityName } from '@/action/action';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    children: React.ReactNode;
    email: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, email }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [u_name, setName] = useState("");
    const pathname = usePathname();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await GetUniversityName(email)
            setName(res?.university_name || "")

        }
        fetchData();
    }, [email])

    const sidebarItems = [
        { icon: <FaHome />, text: "Dashboard", href: "/university_dashboard" },
        { icon: <MdPublishedWithChanges />, text: "Modify University", href: "/university_dashboard/modify" },


    ];

    return (
        <>
            <nav className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'shadow-lg' : ''}`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <BiMenuAltLeft size={25} className='mr-2' />
                            </button>
                            <p className="font-bold text-inherit text-2xl">
                                EduConnect<span className="text-pink-500">360</span>°<span className="text-sm">{u_name}</span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <ThemeSwitch />
                                </div>

                            </div>
                        </div></div></div>
            </nav>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {sidebarItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${item.href === pathname && "bg-gray-200 dark:bg-gray-700"}`}>
                                    {item.icon}
                                    <span className="ms-3 flex-1 whitespace-nowrap">{item.text}</span>

                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className={`p-4 sm:ml-64 `}>
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>


        </>
    );
};

export default Sidebar;
