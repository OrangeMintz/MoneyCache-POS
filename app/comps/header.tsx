'use client';

import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
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
            {/* Sidebar */}
            {/* Overlay that blurs the background when sidebar is open */}
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
                                <span className="font-medium">Transactions</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/transactionlist"
                                className={`flex items-center p-3 rounded-md transition-all duration-200
                                    ${isActive('/transactionlist')
                                        ? 'bg-green-200 border-1-4 border-green-600 pl-2'
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
                                href="/Product"
                                className={`flex items-center p-3 rounded-md transition-all duration-200 
                                    ${isActive('/Product') 
                                        ? 'bg-green-200 border-l-4 border-green-600 pl-2' 
                                        : 'hover:bg-green-200 hover:translate-x-1'}`}
                            >
                                <span className={`font-medium ${isActive('/Product') ? 'text-green-800' : ''}`}>Sheets</span>
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

            {user && (<nav className="dark:bg-gray-800 bg-gray-200 text-black border-b-2 sticky top-0 z-20 w-full">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and sidebar toggle */}
                        <div className="flex items-center space-x-4">
                            {/* Sidebar toggle button */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md hidden sm:flex sm:items-center text-black hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-300"
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

                            <div className="flex items-center">
                                <Image
                                    src="/images/logo.png"
                                    width={30}
                                    height={30}
                                    alt="MoneyCache Logo"
                                    className="flex-shrink-0"
                                />
                                <Link href="/dashboard" className="ml-2">
                                    <span className="text-lg text-black dark:text-gray-200 hover:text-green-300 font-bold">
                                        Moneycache
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex md:items-center md:justify-center flex-1 px-2">
                            <div className="flex space-x-1">
                                <Link href="/dashboard">
                                    <button className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none ${
                                        isActive('/dashboard') 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'text-black dark:text-gray-200 hover:text-green-300'
                                    }`}>
                                        <span>Transaction</span>
                                    </button>
                                </Link>
                                <Link href="/transactionlist">
                                    <button className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none ${
                                        isActive('/transactionlist') 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'text-black dark:text-gray-200 hover:text-green-300'
                                    }`}>
                                        <span>Transaction List</span>
                                    </button>
                                </Link>
                                {user ? (user.role == 'admin' ?
                                    <Link href="/user">
                                        <button className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none ${
                                        isActive('/user') 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'text-black dark:text-gray-200 hover:text-green-300'
                                    }`}>
                                            <span>Users</span>
                                        </button>
                                    </Link> : ""
                                ) : ""}

                                {user ? (user.role == 'admin' ?
                                    <Link href="/Product">
                                        <button className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none ${
                                        isActive('/Product') 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'text-black dark:text-gray-200 hover:text-green-300'
                                    }`}>
                                            <span>Sheets</span>
                                        </button>
                                    </Link> : ""
                                ) : ""}


                            </div>
                        </div>

                        {/* User dropdown */}
                        <div className="flex items-center">
                            <div className="relative" ref={dropdownRef}>
                                {/* Avatar button that triggers dropdown */}
                                <div className="flex items-center justify-center">
                                    <UserCircle
                                        id="avatarButton"
                                        onClick={toggleDropdown}
                                        className="w-7 h-7 text-black cursor-pointer transition-all duration-300"
                                    />
                                </div>

                                {/* Dropdown menu with animation */}
                                <div
                                    id="userDropdown"
                                    className={`absolute transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} 
                   transition-all duration-300 ease-in-out 
                   right-0 md:right-1/2 md:translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50`}
                                >
                                    <div className="px-4 py-3 text-sm text-gray-900 text-center">
                                        <h1 className="font-medium">{user ? user.name + ` (${user.role})` : ""}</h1>
                                        <p className="text-gray-500">{user ? user.email : ""}</p>
                                    </div>
                                    <hr className="border-gray-200" />
                                    <div className="py-1">
                                        <form onSubmit={logout}>
                                            <button
                                                type='submit'
                                                className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                Logout
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="inline-flex md:hidden items-center justify-center p-2 ml-3 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
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
                <div className={open ? 'block md:hidden' : 'hidden md:hidden'}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-300 dark:text-gray-200">
                            Transaction
                        </Link>
                        <Link href="/transactionlist" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-300 dark:text-gray-200">
                            Transaction List
                        </Link>
                        <Link href="/user" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-300 dark:text-gray-200">
                            Users
                        </Link>
                        <Link href="/Product" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-300 dark:text-gray-200">
                            Sheets
                        </Link>
                        <form onSubmit={logout}>
                            <button type="submit" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-300 dark:text-gray-200">
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