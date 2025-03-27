// components/Navigation.tsx
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

type NavigationProps = {
  user?: {
    name: string;
    email: string;
    role: string;
  };
  isTimeIn: boolean;
  isActive: (path: string) => boolean;
  logout: (e: React.FormEvent) => void;
};

export default function Navigation({ user, isTimeIn, isActive, logout }: NavigationProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
          {/* Other navigation links */}
        </div>
      </div>

      {/* Enhanced user profile section with theme toggle button */}
      <div className="flex items-center space-x-3">
        {/* Theme toggle button */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <div className="text-indigo-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                <circle cx="17" cy="8" r="1" fill="currentColor" />
                <circle cx="19" cy="10" r="0.5" fill="currentColor" />
                <circle cx="14" cy="7" r="0.5" fill="currentColor" />
              </svg>
            </div>
          ) : (
            <div className="text-amber-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
        </button>

        {/* User profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* The rest of your user dropdown code */}
        </div>

        {/* Mobile menu button */}
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
    </>
  );
}