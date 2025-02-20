'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="#">
                                <span className="block h-9 mt-3 w-auto fill-current text-lg text-gray-800 dark:text-gray-200">

                              Bading App
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="relative">
                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-lg leading-4 font-medium rounded-md text-gray-500  dark:text-gray-200 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-opacity duration-300 hover:opacity-40">
                                <span>Transaction</span>
                            </button>
                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-lg leading-4 font-medium rounded-md text-gray-500 dark:text-gray-200 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-opacity duration-300 hover:opacity-40">
                                <span>Transaction List</span>
                            </button>
                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-lg leading-4 font-medium rounded-md text-gray-500 dark:text-gray-200 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-opacity duration-300 hover:opacity-40">
                                <span>Product</span>
                            </button>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="relative">
                        <Link href="#">
                                <span className="block h-9 mt-3 w-auto fill-current text-lg text-gray-800 dark:text-gray-200">

                              Logout
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="-me-2 flex items-center sm:hidden">
                        <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={open ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={open ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={open ? 'block sm:hidden' : 'hidden sm:hidden'}>
                <div className="pt-2 pb-3 ml-4 space-y-1">
                    <Link href="/Dashboard" className="text-gray-800 dark:text-gray-200">
                      Transaction
                    </Link>
                </div>
                <div className="pt-2 pb-3 ml-4 space-y-1">
                    <Link href="/Dashboard" className="text-gray-800 dark:text-gray-200">
                      Transaction List
                    </Link>
                </div>
                <div className="pt-2 pb-3 ml-4 space-y-1">
                    <Link href="/Dashboard" className="text-gray-800 dark:text-gray-200">
                      Products
                    </Link>
                </div>
                <div className="pt-2 pb-3 ml-4 space-y-1">
                    <Link href="/Dashboard" className="text-gray-800 dark:text-gray-200">
                      Logout
                    </Link>
                </div>
              
            </div>
        </nav>
    );
}
