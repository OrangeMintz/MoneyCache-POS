'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logout = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                console.error("No access token found.");
                router.push('/');
                return;
            }

            const response = await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            console.log(response.data);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('selected_date');

            router.push('/');
        } catch (error) {
            console.error("Error logging out: ", error);
            router.push('/');
        }
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`bg-blue-500  text-black w-80 fixed h-full transition-all duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-80'}`}>
                {/* Close icon inside the sidebar */}
                <div className="p-4 border-b  border-gray-700 flex justify-between items-center">
                    <span className="text-xl md:mt-6 font-semibold">MoneyCache</span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-md text-gray-200 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label="Close sidebar"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="mt-5">
                    <ul className="space-y-2 px-4">
                        <li>
                            <Link href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-green-200 transition-colors">
                                <span><b>Transactions</b></span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/transactionlist" className="flex items-center p-2 rounded-md hover:bg-green-200 transition-colors">
                                <span><b>Transaction List</b></span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Product" className="flex items-center p-2 rounded-md hover:bg-green-300 transition-colors">
                                <span><b>Sheets</b></span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
                    <form onSubmit={logout}>
                        <button type="submit" className="w-full p-2 bg-gray-700 rounded-md hover:bg-green-300 transition-colors">
                            <b>Logout</b>
                        </button>
                    </form>
                </div>
            </div>

            {/* Top navigation */}
            <nav className=" dark:bg-gray-800 bg-gray-200 text-black border-b-2 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center ">
                            {/* Sidebar toggle button */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md hidden sm:flex sm:items-center sm:ms-6 text-black hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                                aria-label="Toggle sidebar"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {sidebarOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                            <Image
                                src="/images/logo.png"
                                width={30}
                                height={30}
                                alt="Picture of the author"
                            />
                            <div className="ml-4 shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    <span className="block  w-auto text-lg text-black dark:text-gray-200 hover:text-green-300">
                                        <b>MoneyCache</b>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative">
                                <Link href="/dashboard">
                                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-md leading-4 font-medium rounded-md text-black dark:bg-gray-800 hover:text-gray-500 focus:outline-none ">
                                        <span>Transaction</span>
                                    </button>
                                </Link>
                                <Link href="/transactionlist">
                                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-md leading-4 font-medium rounded-md text-black dark:bg-gray-800 hover:text-gray-500 focus:outline-none ">
                                        <span>Transaction List</span>
                                    </button>
                                </Link>
                                <Link href="/Product">
                                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-md leading-4 font-medium rounded-md text-black dark:bg-gray-800 hover:text-gray-500 focus:outline-none ">
                                        <span>Sheets</span>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Desktop logout */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative">
                                <form onSubmit={logout}>
                                    <button type='submit' className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black dark:bg-gray-800 hover:text-gray-500 focus:outline-none ">
                                        <span className="block h-9 mt-3 w-auto fill-current text-sm text-black hover:text-gray-500">
                                            Logout
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setOpen(!open)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                aria-label="Toggle mobile menu"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={open ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={open ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={open ? 'block sm:hidden' : 'hidden sm:hidden'}>
                    <div className="pt-2 p-4 ml-4 space-y-1">
                        <Link href="/dashboard" className="block py-2  text-black hover:text-green-300 dark:text-gray-200">
                            <b>Transaction</b>
                        </Link>
                        <Link href="/transactionlist" className="block py-2  text-black hover:text-green-300 dark:text-gray-200">
                            <b>Transaction List</b>
                        </Link>
                        <Link href="/Product" className="block py-2  text-black hover:text-green-300 dark:text-gray-200">
                            <b>Sheets</b>
                        </Link>
                        <form onSubmit={logout}>
                            <button type="submit" className="block w-full  text-left py-2 hover:text-green-300 text-black dark:text-gray-200">
                                <b>Logout</b>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile to close sidebar when clicked outside */}
            {sidebarOpen && (
                <div
                    className="fixed hidden inset-0 z-10 bg-black bg-opacity-50 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
}