
"use client"
import { useState } from 'react';
import { ThemeSwitch } from "@/components/theme-switch";
import Link from 'next/link';
import { FaBloggerB, FaHome, FaMonument, FaPaperclip, FaSurprise, FaUser } from 'react-icons/fa';


interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarItems = [
        { icon: <FaHome />, text: "Dashboard", href: "/admin_dashboard" },
        {
            icon: <FaPaperclip />,
            text: "Applications",
            href: "/admin_dashboard/Applications",
        },

    ];

    return (
        <>
            <nav className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'shadow-lg' : ''}`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <p className="font-bold text-inherit text-2xl">
                                EduConnect<span className="text-pink-500">360</span>°<span className="text-sm">admin</span>
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
                                <Link href={item.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    {item.icon}
                                    <span className="ms-3 flex-1 whitespace-nowrap">{item.text}</span>

                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className={`p-4 sm:ml-64 ${isSidebarOpen ? 'ml-64' : ''}`}>
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {children}
                    </div>
                </div>
            </div>


        </>
    );
};

export default Sidebar;
