'use client';

import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const { user, globalFunction } = useAppContext()
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isTimeIn, setIsTimeIn] = useState(true);
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

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        globalFunction()
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isActive = (path) => {
        return pathname === path;
    }
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-40 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Animated Sidebar */}
            <div
                className={`bg-white text-black w-80 fixed h-full shadow-xl transition-all duration-300 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header with logo and close button */}
                <div className="p-4 border-b border-gray-400 flex items-center justify-between">
                    <div className="flex items-center">
                        <Image
                            src="/images/logo.png"
                            width={40}
                            height={40}
                            className="flex-shrink-0"
                            alt="MoneyCache Logo"
                        />
                        <span className="text-xl ml-3 font-semibold">MoneyCache</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-full text-black hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors duration-200"
                        aria-label="Close sidebar"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation links with hover animations */}
                <nav className="mt-6">
                    <ul className="space-y-1 px-3">
                        <li>
                            <Link
                                href="/dashboard"
                                className={`flex items-center p-3 rounded-md transition-all duration-200 
                            ${isActive('/dashboard')
                                        ? 'bg-green-200 border-l-4 border-green-600 pl-2'
                                        : 'hover:bg-green-200 hover:translate-x-1'}`}
                            >
                                <span className="font-medium">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/transaction"
                                className={`flex items-center p-3 rounded-md transition-all duration-200 
                            ${isActive('/transaction')
                                        ? 'bg-green-200 border-l-4 border-green-600 pl-2'
                                        : 'hover:bg-green-200 hover:translate-x-1'}`}
                            >
                                <span className="font-medium">Transactions</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/transactionlist"
                                className={`flex items-center p-3 rounded-md transition-all duration-200
                            ${isActive('/transactionlist')
                                        ? 'bg-green-200 border-l-4 border-green-600 pl-2'
                                        : 'hover:bg-green-200 hover:translate-x-1'
                                    }`}
                            >
                                <span className={`font-medium ${isActive('/transactionlist') ? 'text-green-800' : ''}`}>Transaction List</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/user"
                                className={`flex items-center p-3 rounded-md transition-all duration-200 
                            ${isActive('/user')
                                        ? 'bg-green-200 border-l-4 border-green-600 pl-2'
                                        : 'hover:bg-green-200 hover:translate-x-1'}`}
                            >
                                <span className={`font-medium ${isActive('/user') ? 'text-green-800' : ''}`}>Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/logs"
                                className={`flex items-center p-3 rounded-md transition-all duration-200 
                            ${isActive('/logs')
                                        ? 'bg-green-200 border-l-4 border-green-600 pl-2'
                                        : 'hover:bg-green-200 hover:translate-x-1'}`}
                            >
                                <span className={`font-medium ${isActive('/logs') ? 'text-green-800' : ''}`}>Logs</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Logout button with animation */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-400">
                    <form onSubmit={logout}>
                        <button
                            type="submit"
                            className="w-full p-3 text-white bg-gray-700 rounded-md hover:bg-green-600 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                        >
                            <span className="font-normal">Logout</span>
                        </button>
                    </form>
                </div>
            </div>

            {user && (<nav className="dark:bg-gray-800 bg-gradient-to-r py-3 from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-black border-b  shadow-md sticky top-0 z-50 top-0 w-full">
                <div className="mx-auto sm:px-6 lg:px-1 max-w-7xl">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and sidebar toggle */}
                        <div className="flex items-center space-x-4">
                            {/* Sidebar toggle button with improved animation */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md hidden sm:flex sm:items-center text-black dark:text-gray-200 hover:bg-green-300 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 transform hover:scale-105"
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

                            {/* Logo with subtle hover effect */}
                            <div className="flex items-center group">
                                <div className="relative overflow-hidden rounded-full transition-all duration-300 transform group-hover:scale-110">
                                    <Image
                                        src="/images/logo.png"
                                        width={30}
                                        height={30}
                                        alt="MoneyCache Logo"
                                        className="flex-shrink-0"
                                    />
                                </div>
                                <Link href="/dashboard" className="ml-2">
                                    <span className="text-lg text-black dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 font-bold transition-colors duration-200">
                                        Moneycache
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Desktop navigation with enhanced styling */}
                        <div className="hidden md:flex md:items-center lg:justify-center md:mr-8 md:justify-center flex-1 px-2">
                            <div className="flex space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg shadow-inner">
                                <Link href="/dashboard">
                                    <button
                                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isActive('/dashboard')
                                                ? 'bg-green-100 text-green-800 shadow-md'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-20'
                                            }`}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                                    >
                                        <span>Dashboard</span>
                                    </button>
                                </Link>
                                <Link href="/transaction">
                                    <button
                                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isActive('/transaction')
                                                ? 'bg-green-100 text-green-800 shadow-md'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-20'
                                            }`}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                                    >
                                        <span>Transaction</span>
                                    </button>
                                </Link>
                                <Link href="/transactionlist">
                                    <button
                                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isActive('/transactionlist')
                                                ? 'bg-green-100 text-green-800 shadow-md'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-20'
                                            }`}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                                    >
                                        <span>Transaction List</span>
                                    </button>
                                </Link>
                                {user ? (user.role == 'admin' ?
                                    <Link href="/user">
                                        <button
                                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isActive('/user')
                                                    ? 'bg-green-100 text-green-800 shadow-md'
                                                    : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-20'
                                                }`}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                                        >
                                            <span>Users</span>
                                        </button>
                                    </Link> : ""
                                ) : ""}

                                {user ? (user.role == 'admin' ?
                                    <Link href="/logs">
                                        <button
                                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isActive('/logs')
                                                    ? 'bg-green-100 text-green-800 shadow-md'
                                                    : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-20'
                                                }`}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                                        >
                                            <span>Logs</span>
                                        </button>
                                    </Link> : ""
                                ) : ""}
                            </div>
                        </div>

                        {/* Enhanced user profile section */}
                        <div className="flex items-center">
                            <div className="relative" ref={dropdownRef}>
                                {/* Avatar button with improved animation */}
                                <div className="flex items-center justify-center relative">
                                    {/* Wrapper for the avatar and indicator */}
                                    <div className="relative p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
                                        <UserCircle
                                            id="avatarButton"
                                            onClick={toggleDropdown}
                                            className="w-8 h-8 text-gray-700 dark:text-gray-300 cursor-pointer transition-all duration-300"
                                        />
                                        {/* Enhanced status indicator */}
                                        <div
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${isTimeIn ? 'bg-green-500' : 'bg-red-500'
                                                } transition-all duration-300 ${isTimeIn ? '' : ''}`}
                                        ></div>
                                    </div>
                                </div>

                                {/* Enhanced dropdown menu with improved animation */}
                                <div
                                    id="userDropdown"
                                    className={`absolute transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                        } 
                                    transition-all duration-300 ease-in-out 
                                    right-0 md:right-1/2 md:translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700`}
                                >
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200 text-center">
                                        <div className="flex justify-center">
                                            <h1 className="font-medium">{user ? user.name + ` (${user.role})` : ""}</h1>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400">{user ? user.email : ""}</p>
                                    </div>
                                    <hr className="border-gray-200 dark:border-gray-700" />
                                    <div className="py-1">
                                        <Link href="/attendance">
                                            <button
                                                type='submit'
                                                className="block w-full text-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-white transition-colors duration-200 hover:bg-blue-600 dark:hover:bg-blue-700"
                                            >
                                                Attendance
                                            </button>
                                        </Link>
                                    </div>
                                    {/* Time out Section with improved design */}
                                    <hr className="border-gray-200 dark:border-gray-700" />


                                    {/* Logout Section with improved button */}
                                    <hr className="border-gray-200 dark:border-gray-700" />
                                    <div className="py-1 px-2">
                                        <form onSubmit={logout}>
                                            <button
                                                type='submit'
                                                className="block w-full text-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-200 hover:bg-red-600 dark:hover:bg-red-700 rounded-md"
                                            >
                                                Logout
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile menu button with improved animation */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="inline-flex md:hidden items-center justify-center p-2 ml-3 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-600 dark:focus:text-gray-300 transition-all duration-200 transform hover:scale-105"
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

                {/* Mobile menu with improved styling */}
                <div className={`${open ? 'block' : 'hidden'} md:hidden transition-all duration-300 ease-in-out`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-b-lg shadow-lg">
                        {user ? (user.role == 'admin' ?
                            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700 transition-all duration-200">
                                Dashboard
                            </Link>
                            : "") : ""}

                        <Link href="/transactionlist" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700 transition-all duration-200">
                            Transaction
                        </Link>

                        <Link href="/transaction" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700 transition-all duration-200">
                            Transaction List
                        </Link>
                        {user ? (user.role == 'admin' ?
                            <Link href="/user" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700 transition-all duration-200">
                                Users
                            </Link>
                            : "") : ""}

                        {user ? (user.role == 'admin' ?
                            <Link href="/Product" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700 transition-all duration-200">
                                Sheets
                            </Link>
                            : "") : ""}

                        {user ? (user.role == 'admin' ?
                            <Link href="/logs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700 transition-all duration-200">
                                Logs
                            </Link>
                            : "") : ""}

                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <form onSubmit={logout}>
                            <button type="submit" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 dark:text-gray-200 dark:hover:text-red-400 dark:hover:bg-gray-700 transition-all duration-200">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>)}

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